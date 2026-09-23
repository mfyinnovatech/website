"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { services, site } from "@/lib/content";

const budgets = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

export function ContactForm() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  /* Sends through /api/contact (SMTP). If the server isn't configured yet,
     falls back to a pre-filled email in the visitor's mail client. */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const subject = `Project inquiry — ${data.company || data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Service: ${data.service}`,
      `Budget: ${data.budget}`,
      "",
      data.message,
    ].join("\n");
    const fallback = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 503) {
        setMailto(fallback);
        setStatus("fallback");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        {/* Direct channels */}
        <div className="lg:col-span-5">
          <p className="eyebrow text-blue">Direct</p>
          <h2 className="text-h2 mt-5 text-ink">Or skip the form.</h2>
          <p className="mt-5 max-w-md text-ink-2">
            Email is the channel. You will hear back within one business day, usually with a few
            questions so the first call is useful.
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-line bg-cloud p-2 pl-4 font-mono text-sm text-ink">
            <span className="text-blue">❯</span>
            <a href={`mailto:${site.email}`} className="truncate hover:text-blue">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-white text-ink transition-colors hover:border-blue hover:text-blue"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            <Row label="LinkedIn">
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-blue">
                Maryam Mehboob <ArrowUpRight size={14} />
              </a>
            </Row>
            <Row label="Based">{site.location}</Row>
            <Row label="Response">Within one business day</Row>
          </dl>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-cloud p-6 sm:p-8 lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" required autoComplete="name" />
            <Field label="Work email" name="email" type="email" required autoComplete="email" />
            <Field label="Company" name="company" autoComplete="organization" />
            <Select label="What do you need?" name="service" options={services.map((s) => s.title)} />
            <Select label="Budget range" name="budget" options={budgets} className="sm:col-span-2" />
            {/* Honeypot — hidden from people, filled by bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="sm:col-span-2">
              <label className="mono-label block text-ink-3" htmlFor="message">
                Tell us about the project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="What are you trying to ship, by when, and what exists today?"
                className="mt-2 w-full resize-y rounded-xl border border-line-2 bg-white px-4 py-3 text-ink placeholder:text-ink-4 focus:border-blue focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-3" aria-live="polite">
              {status === "sent" && (
                <span className="font-semibold text-ink">Sent. We will reply within one business day.</span>
              )}
              {status === "error" && (
                <span className="text-ink">
                  Something went wrong. Email us directly at{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold text-blue">
                    {site.email}
                  </a>
                  .
                </span>
              )}
              {status === "fallback" && mailto && (
                <span className="text-ink">
                  Email sending is not set up on this server yet.{" "}
                  <a href={mailto} className="font-semibold text-blue">
                    Open the message in your mail app
                  </a>{" "}
                  instead.
                </span>
              )}
              {(status === "idle" || status === "sending") && "Your details go straight to our inbox and nowhere else."}
            </p>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  Sending <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Send inquiry <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
      <dt className="mono-label pt-0.5 text-ink-3">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mono-label block text-ink-3" htmlFor={name}>
        {label}
        {required && <span className="text-blue"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-xl border border-line-2 bg-white px-4 text-ink focus:border-blue focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mono-label block text-ink-3" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 h-12 w-full appearance-none rounded-xl border border-line-2 bg-white px-4 text-ink focus:border-blue focus:outline-none"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
