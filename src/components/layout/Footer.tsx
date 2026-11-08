import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";
import { getContent, getDict, localeHref, type Locale } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/i18n/LanguageSwitch";

/* Footer — light ground, faded lockup behind a centred mark tile, "Get connected"
   heading, four white social pills, hairline, then quick links · copyright · back to top. */

export function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale).footer;
  const { site } = getContent(locale);
  const year = new Date().getFullYear();
  const quickLinks = [
    { label: d.links.services, href: "/services" },
    { label: d.links.work, href: "/work" },
    { label: d.links.about, href: "/about" },
    { label: d.links.blog, href: "/blog" },
    { label: d.links.privacy, href: "/privacy" },
    { label: d.links.terms, href: "/terms" },
  ];
  const pills = [
    { label: d.linkedin, href: site.linkedinCompany, icon: <LinkedInGlyph /> },
    { label: d.founderLinkedin, href: site.linkedin, icon: <LinkedInGlyph /> },
    { label: d.instagram, href: site.instagram, icon: <InstagramGlyph /> },
    { label: d.facebook, href: site.facebook, icon: <FacebookGlyph /> },
    { label: d.youtube, href: site.youtube, icon: <YouTubeGlyph /> },
    { label: d.odoo, href: null as string | null, icon: <OdooGlyph /> },
    { label: d.email, href: `mailto:${site.email}`, icon: <Mail size={15} strokeWidth={2.2} /> },
  ];

  return (
    <footer className="relative overflow-hidden bg-cloud">
      <div className="container-page relative">
        {/* Faded lockup behind the header block */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 flex justify-center opacity-[0.045] mask-radial">
          <Logo variant="navy" width={1100} className="w-[min(92vw,1100px)]" />
        </div>

        <div className="relative flex flex-col items-center pt-14 text-center sm:pt-20">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-navy shadow-[0_20px_40px_-20px_rgba(6,16,48,0.5)]">
            <Logo kind="mark" variant="white" width={44} />
          </span>
          <p className="mt-8 max-w-[18ch] font-display text-2xl font-semibold leading-snug text-navy">
            {d.heading}
          </p>
          <p className="mt-3 text-ink-2">{d.sub}</p>

          <ul className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center">
            {pills.map((p, i) => {
              /* An odd pill out on the two-column tablet grid spans the full row */
              const span = pills.length % 2 === 1 && i === pills.length - 1 ? "sm:col-span-2 lg:col-span-1" : "";
              const base =
                "flex h-[72px] items-center justify-between gap-6 rounded-3xl bg-white px-6 shadow-[0_14px_34px_-22px_rgba(6,16,48,0.35)] ring-1 ring-navy/[0.05] lg:min-w-[210px] lg:px-10";
              const inner = (
                <>
                  <span className="font-display text-lg font-semibold text-navy">{p.label}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white transition-colors group-hover:bg-blue">
                    {p.icon}
                  </span>
                </>
              );
              if (!p.href) {
                /* Badge only — shown, not linked */
                return (
                  <li key={p.label} className={span}>
                    <div className={base}>{inner}</div>
                  </li>
                );
              }
              const external = p.href.startsWith("http");
              const pending = p.href === "#";
              return (
                <li key={p.label} className={span}>
                  <a
                    href={p.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={`group ${base} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,48,232,0.35)] ${pending ? "opacity-60" : ""}`}
                  >
                    {inner}
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] text-ink-2">
            <span className="mono-label text-ink-3">{d.call}</span>
            {site.phones.map((ph) => (
              <a key={ph.tel} href={`tel:${ph.tel}`} className="inline-flex items-center gap-2 font-display font-semibold text-navy hover:text-blue">
                <span className="font-normal text-ink-3">{getDict(locale).contact.phoneLabels[ph.country]}</span>
                <span dir="ltr">{ph.display}</span>
              </a>
            ))}
          </p>
        </div>

        {/* Bottom row */}
        <div className="relative mt-16 border-t border-line pb-10 pt-8 sm:mt-24">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={localeHref(locale, l.href)}
                  className="border-b border-navy pb-px font-display text-[15px] font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-[15px] text-ink-3 lg:text-center">
              © {year} {site.legalName}. {d.rights}
            </p>
            <div className="flex items-center gap-6 lg:justify-self-end">
              <LanguageSwitch className="text-navy hover:text-blue" />
              <BackToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkedInGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function YouTubeGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.77l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.8 22.8 0 0 0 14.31 4C11.85 4 10.17 5.5 10.17 8.25v2.36H7.4v3.2h2.77V22h3.33z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function OdooGlyph() {
  /* Odoo's four-circle wordmark reduced to a single ring glyph */
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

