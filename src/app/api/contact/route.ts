import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkBotId } from "botid/server";
import { site } from "@/lib/content";

/* POST /api/contact — delivers the inquiry by email.
   1. If SMTP is configured (SMTP_HOST/USER/PASS, see .env.example), it sends directly.
   2. Otherwise, after all spam checks pass, it tells the browser to deliver the
      message through FormSubmit (formsubmit.co), which needs no password. The first
      message triggers an "Activate Form" email to CONTACT_TO; once that link is
      clicked every inquiry is forwarded to the inbox. Until then FormSubmit declines
      and the form offers the visitor a mailto fallback. */

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO ?? "maryam56mehboob@gmail.com";
const FROM = process.env.CONTACT_FROM ?? process.env.SMTP_USER ?? "";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  website?: string; // honeypot — must stay empty
  startedAt?: number; // when the form was shown (ms), for the time trap
};

/* ── Spam protection, in order ──────────────────────────────────
   1. Origin check: only the site's own pages may post here.
   2. Vercel BotID: invisible browser check; failing visitors get the mailto
      fallback (503) so a real person is never silently lost.
   3. Size cap and per-IP / per-email rate limits.
   4. Honeypot field, time trap (submitted < 3 s after the form appeared) and
      link-spam heuristics: silently accepted and dropped, so bots learn nothing.
   5. Duplicate suppression: the same message twice within 10 minutes.
   6. Header-injection guard: line breaks stripped from header fields.
   The rate-limit and duplicate memory lives in the serverless instance, so it is
   best-effort; BotID and the origin check are the hard gates. */

const ALLOWED_HOSTS = new Set(["www.mfyinnova.tech", "mfyinnova.tech", "localhost:3000", "127.0.0.1:3000"]);
function sameSite(req: Request) {
  const src = req.headers.get("origin") ?? req.headers.get("referer");
  if (!src) return false;
  try {
    const host = new URL(src).host;
    return ALLOWED_HOSTS.has(host) || /^mfyinnovatech[-a-z0-9]*\.vercel\.app$/.test(host);
  } catch {
    return false;
  }
}

const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/[<>"]/g, "").trim();
const linkCount = (s: string) => (s.match(/(https?:\/\/|www\.)/gi) ?? []).length;

const recent = new Map<string, number>(); // message fingerprint → time
function duplicate(key: string) {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > 10 * 60 * 1000) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}

const perEmail = new Map<string, { n: number; t: number }>();
function emailLimited(email: string) {
  const now = Date.now();
  const h = perEmail.get(email);
  if (!h || now - h.t > 60 * 60 * 1000) {
    perEmail.set(email, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 3;
}

const drop = () => NextResponse.json({ ok: true }); // looks like success to a bot

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 3;
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function POST(req: Request) {
  const smtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!sameSite(req)) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const verdict = await checkBotId();
  if (verdict.isBot) {
    console.warn("[contact] blocked by BotID");
    return NextResponse.json({ ok: false, error: "verification" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const raw = await req.text();
  if (raw.length > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  if (body.website) return drop(); // honeypot filled
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (!body.startedAt || elapsed < 3000) return drop(); // filled faster than a person can type

  const name = oneLine(body.name ?? "").slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const company = oneLine(body.company ?? "").slice(0, 160);
  const service = oneLine(body.service ?? "").slice(0, 120);
  const budget = oneLine(body.budget ?? "").slice(0, 60);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (linkCount(name) > 0 || linkCount(company) > 0 || linkCount(message) > 3) {
    console.warn("[contact] dropped as link spam");
    return drop();
  }
  if (emailLimited(email.toLowerCase())) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  if (duplicate(`${email.toLowerCase()}|${message.slice(0, 500)}`)) return drop();

  const subject = `New inquiry — ${company || name}${service ? ` · ${service}` : ""}`;

  if (!smtp) return relayViaFormSubmit({ name, email, company, service, budget, message, subject });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Service: ${service || "-"}`,
    `Budget: ${budget || "-"}`,
    "",
    message,
    "",
    `— sent from ${site.url}/contact`,
  ].join("\n");
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#061030">
      <p style="font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6B7699">New inquiry · ${esc(site.name)}</p>
      <table style="border-collapse:collapse;margin-top:8px">
        <tr><td style="padding:4px 16px 4px 0;color:#6B7699">Name</td><td>${esc(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6B7699">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6B7699">Company</td><td>${esc(company || "-")}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6B7699">Service</td><td>${esc(service || "-")}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#6B7699">Budget</td><td>${esc(budget || "-")}</td></tr>
      </table>
      <p style="margin-top:16px;white-space:pre-wrap;border-left:2px solid #0030E8;padding-left:12px">${esc(message)}</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"${site.name} website" <${FROM}>`,
      to: TO,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}

/* FormSubmit refuses requests from server/datacenter IPs (403), so delivery
   happens from the visitor's browser, which is how FormSubmit is meant to be used.
   The server only hands out the delivery endpoint after every check above has
   passed, so the inbox address never appears in the site's code.
   Set FORMSUBMIT_ALIAS to the random alias FormSubmit gives after activation to
   avoid exposing the address even in that response. */
function relayViaFormSubmit(f: {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  subject: string;
}) {
  const target = process.env.FORMSUBMIT_ALIAS || TO;
  return NextResponse.json({
    ok: true,
    deliver: {
      url: `https://formsubmit.co/ajax/${encodeURIComponent(target)}`,
      fields: {
        _subject: f.subject,
        _replyto: f.email,
        _template: "table",
        _captcha: "false",
        Name: f.name,
        Email: f.email,
        Company: f.company || "-",
        Service: f.service || "-",
        Budget: f.budget || "-",
        Message: f.message,
        Source: `${site.url}/contact`,
      },
    },
  });
}
