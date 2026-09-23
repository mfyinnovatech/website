import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BackToTop } from "./BackToTop";
import { site, team } from "@/lib/content";

/* Footer — light ground, faded lockup behind a centred mark tile, "Get connected"
   heading, four white social pills, hairline, then quick links · copyright · back to top. */

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const founder = team[0];
  const pills = [
    { label: "LinkedIn", href: site.linkedin, icon: <LinkedInGlyph /> },
    { label: "Instagram", href: founder.instagram, icon: <InstagramGlyph /> },
    { label: "Odoo partner", href: site.partner.url, icon: <OdooGlyph /> },
    { label: "Email us", href: `mailto:${site.email}`, icon: <Mail size={15} strokeWidth={2.2} /> },
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
            Get connected with MFY Innovatech
          </p>
          <p className="mt-3 text-ink-2">Odoo, AI and 3D notes, straight from the studio.</p>

          <ul className="mt-12 grid w-full gap-4 sm:grid-cols-2 lg:flex lg:w-auto lg:justify-center">
            {pills.map((p) => {
              const external = p.href.startsWith("http");
              const pending = p.href === "#";
              return (
                <li key={p.label}>
                  <a
                    href={p.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={`group flex h-[72px] items-center justify-between gap-6 rounded-3xl bg-white px-6 shadow-[0_14px_34px_-22px_rgba(6,16,48,0.35)] ring-1 ring-navy/[0.05] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,48,232,0.35)] lg:min-w-[210px] lg:px-10 ${
                      pending ? "opacity-60" : ""
                    }`}
                  >
                    <span className="font-display text-lg font-semibold text-navy">{p.label}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white transition-colors group-hover:bg-blue">
                      {p.icon}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom row */}
        <div className="relative mt-16 border-t border-line pb-10 pt-8 sm:mt-24">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border-b border-navy pb-px font-display text-[15px] font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-[15px] text-ink-3 lg:text-center">
              © {year} {site.legalName}. All rights reserved.
            </p>
            <div className="lg:justify-self-end">
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

