import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph } from "@/lib/seo";

type Params = { locale: string };
const path = "/terms";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: getDict(locale).legal.termsTitle,
    description: getDict(locale).legal.termsDescription,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function TermsPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const L = getDict(locale).legal;
  const t = L.terms;
  const ld = pageGraph(locale, {
    type: "WebPage",
    path,
    name: L.termsTitle,
    description: L.termsDescription,
    trail: [{ name: L.termsTitle, path }],
  });
  return (
    <>
      <JsonLd data={ld} />
      <PageHeader eyebrow={L.eyebrow} title={L.termsTitle} lead={L.lastUpdated} />
      <Prose>
        <p>{t.intro(site.url, site.legalName)}</p>
        <h2>{t.useH}</h2>
        <p>{t.use}</p>
        <h2>{t.portfolioH}</h2>
        <p>{t.portfolio}</p>
        <h2>{t.engagementsH}</h2>
        <p>{t.engagements}</p>
        <h2>{t.liabilityH}</h2>
        <p>{t.liability}</p>
        <h2>{t.contactH}</h2>
        <p>{t.contact(site.email)}</p>
      </Prose>
    </>
  );
}
