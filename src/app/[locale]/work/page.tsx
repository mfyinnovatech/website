import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/work";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  return {
    title: d.nav.work,
    description: locale === "ar"
      ? "رسوم ثلاثية الأبعاد واقعية للمعدات الطبية والمنتجات الاستهلاكية والعبوات. أعمال مختارة من MFY Innovatech."
      : "Photoreal 3D product animations for medical equipment, consumer products and packaging. Selected work by MFY Innovatech.",
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).work.page;
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
      <WorkGallery locale={locale} />
      <VideoStories num="" />
      <Quotes num="" />
    </>
  );
}
