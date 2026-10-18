import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Services } from "@/components/sections/Services";
import { OneSystem } from "@/components/sections/OneSystem";
import { Tools } from "@/components/sections/Tools";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Stage } from "@/components/ui/Stage";
import { site } from "@/lib/content";
import { getContent, getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/services";
const groups = ["Engineering", "Intelligence", "Operations", "Growth"] as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).servicesPage;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function ServicesPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).servicesPage;
  const { services } = getContent(locale);

  return (
    <>
      <PageHeader
        eyebrow={d.eyebrow}
        title={
          <>
            {d.h1a} <span className="text-ink-3">{d.h1b}</span>
          </>
        }
        lead={d.lead}
        aside={
          <Link href={localeHref(locale, "/contact")} className="btn btn-navy">
            {d.cta} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Link>
        }
      />

      {/* Group index */}
      <Stage id="disciplines" className="!py-6 lg:!py-8">
        <Stagger as="ul" className="grid md:grid-cols-4">
          {groups.map((g, i) => {
            const items = services.filter((s) => s.group === g);
            return (
              <StaggerItem
                as="li"
                key={g}
                className={`py-6 md:px-8 ${i > 0 ? "border-t border-line md:border-s md:border-t-0" : ""} ${i === 0 ? "md:ps-0" : ""}`}
              >
                <p className="eyebrow text-blue">{d.groups[g]}</p>
                <ul className="mt-4 space-y-1.5">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <a href={`#${s.slug}`} className="font-display font-medium text-ink hover:text-blue">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Stage>

      <Services />
      <OneSystem num="" />
      <Tools num="" />
      <Process locale={locale} />
      <FAQ num="" />
    </>
  );
}
