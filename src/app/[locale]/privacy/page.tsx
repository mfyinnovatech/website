import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/privacy";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: getDict(locale).legal.privacyTitle,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const L = getDict(locale).legal;
  const p = L.privacy;
  return (
    <>
      <PageHeader eyebrow={L.eyebrow} title={L.privacyTitle} lead={L.lastUpdated} />
      <Prose>
        <p>{p.intro(site.legalName, site.url)}</p>
        <h2>{p.collectH}</h2>
        <ul>
          {p.collect.map((item) => (
            <li key={item.slice(0, 20)}>{item}</li>
          ))}
        </ul>
        <h2>{p.useH}</h2>
        <p>{p.use}</p>
        <h2>{p.thirdH}</h2>
        <p>{p.third}</p>
        <h2>{p.retentionH}</h2>
        <p>{p.retention(site.email)}</p>
      </Prose>
    </>
  );
}
