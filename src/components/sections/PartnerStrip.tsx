import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clients, site } from "@/lib/content";

/* Trust strip — Odoo partner lockup as the anchor cell, client logos in
   hairline-divided cells. Logos render monochrome and take their colour on hover. */
export function PartnerStrip() {
  return (
    <section className="border-y border-line bg-white" aria-label="Partner and clients">
      <div className="container-page">
        <div className="flex items-center justify-between border-b border-line py-3.5">
          <p className="eyebrow text-ink-3">Trusted by</p>
          <Link href="/work" className="mono-label inline-flex items-center gap-1.5 text-ink-3 hover:text-blue">
            Selected work <ArrowRight size={13} />
          </Link>
        </div>

        <Stagger
          as="ul"
          className="grid grid-cols-2 divide-x divide-y divide-line md:grid-cols-3"
        >
          {/* Anchor cell: official Odoo partner */}
          <StaggerItem as="li" className="col-span-2 bg-cloud md:col-span-1">
            <a
              href={site.partner.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${site.partner.label} — odoo.com`}
              className="group flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-3 px-6 py-6 text-center"
            >
              <span className="flex items-center gap-3">
                <Logo kind="mark" variant="blue" width={46} />
                <span aria-hidden className="h-6 w-px bg-line-2" />
                <Image src="/partners/odoo_logo.svg" alt="Odoo" width={66} height={36} style={{ height: "auto" }} />
              </span>
              <span className="eyebrow text-blue">{site.partner.label}</span>
            </a>
          </StaggerItem>

          {clients.map((c) => (
            <StaggerItem as="li" key={c.key}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${c.name} — ${c.sector}`}
                className="group flex h-full min-h-[7.5rem] flex-col items-center justify-center gap-3 px-6 py-6"
              >
                <span className="flex h-14 items-center">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={c.width}
                    height={c.height}
                    style={{ width: c.width, height: c.height }}
                    className="opacity-70 grayscale transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </span>
                <span className="mono-label text-center text-[10px] text-ink-4 transition-colors group-hover:text-ink-2">
                  {c.sector}
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
