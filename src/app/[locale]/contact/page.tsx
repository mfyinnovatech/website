import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/contact";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).contact;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).contact;
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
      />
      <ContactForm />
      <FAQ num="" />
    </>
  );
}
