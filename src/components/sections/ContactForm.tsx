"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { Stage } from "@/components/ui/Stage";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Status = "idle" | "sending" | "sent" | "error" | "fallback";

export function ContactForm() {
  const { d, c, locale } = useLocale();
  const t = d.contact;
  const { site, services } = c;
  const budgets = t.budgets;
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
      locale,
    };
    const subject = `${t.subject} — ${data.company || data.name}`;
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
    <Stage id="contact-form">
      <div className="grid gap-14 lg:grid-cols-12">
        {/* Direct channels */}
        <div className="lg:col-span-5">
          <p className="eyebrow text-blue">{t.direct}</p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-ink lg:text-4xl">{t.skip}</h2>
          <p className="mt-5 max-w-md text-ink-2">{t.skipText}</p>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-line bg-cloud p-2 ps-4 font-mono text-sm text-ink" dir="ltr">
            <span className="text-blue">❯</span>
            <a href={`mailto:${site.email}`} className="truncate hover:text-blue">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label={t.copyEmail}
              className="ms-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-white text-ink transition-colors hover:border-blue hover:text-blue"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            <Row label={t.rowLinkedIn}>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-blue">
                {c.team[0].name} <ArrowUpRight size={14} className="rtl:-scale-x-100" />
              </a>
            </Row>
            <Row label={t.rowBased}>{site.location}</Row>
            <Row label={t.rowResponse}>{t.responseValue}</Row>
          </dl>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-cloud p-6 sm:p-8 lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t.name} name="name" required autoComplete="name" />
            <Field label={t.email} name="email" type="email" required autoComplete="email" />
            <Field label={t.company} name="company" autoComplete="organization" />
            <Select label={t.service} name="service" options={services.map((s) => s.title)} placeholder={t.select} />
            <Select label={t.budget} name="budget" options={budgets} className="sm:col-span-2" placeholder={t.select} />
            {/* Honeypot — hidden from people, filled by bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="sm:col-span-2">
              <label className="mono-label block text-ink-3" htmlFor="message">
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder={t.placeholder}
                className="mt-2 w-full resize-y rounded-xl border border-line-2 bg-white px-4 py-3 text-ink placeholder:text-ink-4 focus:border-blue focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-3" aria-live="polite">
              {status === "sent" && (
                <span className="font-semibold text-ink">{t.sent}</span>
              )}
              {status === "error" && (
                <span className="text-ink">
                  {t.errorA}{" "}
                  <a href={`mailto:${site.email}`} className="font-semibold text-blue">
                    {site.email}
                  </a>
                  .
                </span>
              )}
              {status === "fallback" && mailto && (
                <span className="text-ink">
                  {t.fallbackA}{" "}
                  <a href={mailto} className="font-semibold text-blue">
                    {t.fallbackLink}
                  </a>{" "}
                  {t.fallbackB}
                </span>
              )}
              {(status === "idle" || status === "sending") && t.idle}
            </p>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  {t.sending} <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  {t.send} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Stage>
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
  placeholder = "Select…",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
  placeholder?: string;
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
          {placeholder}
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
