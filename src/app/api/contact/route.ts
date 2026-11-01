import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/content";

/* POST /api/contact — delivers the inquiry by email.
   1. If SMTP is configured (SMTP_HOST/USER/PASS, see .env.example), it sends directly.
   2. Otherwise it relays through FormSubmit (formsubmit.co), which needs no password:
      the first message triggers an "Activate Form" email to CONTACT_TO, and once that
      link is clicked every inquiry is forwarded to the inbox. Until then the API
      answers 503 and the form offers the visitor a mailto fallback. */

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
};

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 5;
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function POST(req: Request) {
  const smtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // bot filled the honeypot; pretend success

  const name = (body.name ?? "").trim().slice(0, 120);
  const email = (body.email ?? "").trim().slice(0, 200);
  const company = (body.company ?? "").trim().slice(0, 160);
  const service = (body.service ?? "").trim().slice(0, 120);
  const budget = (body.budget ?? "").trim().slice(0, 60);
  const message = (body.message ?? "").trim().slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

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

/* FormSubmit relay (no credentials). Sent server-side so the visitor's browser never
   talks to a third party directly; Origin/Referer identify the site for activation. */
async function relayViaFormSubmit(f: {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  subject: string;
}) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: site.url,
        Referer: `${site.url}/contact`,
      },
      body: JSON.stringify({
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
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (res.ok && String(data.success) === "true") return NextResponse.json({ ok: true });
    // Not yet activated, or refused: let the visitor fall back to their own mail app
    console.error("[contact] formsubmit did not accept:", res.status, data.message);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  } catch (err) {
    console.error("[contact] formsubmit relay failed:", err);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
}
