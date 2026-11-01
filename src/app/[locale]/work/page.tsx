import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { VideoStories } from "@/components/sections/VideoStories";
import { Quotes } from "@/components/sections/Quotes";
import { site } from "@/lib/content";
import { getContent, getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORG_ID, pageGraph } from "@/lib/seo";

type Params = { locale: string };
const path = "/work";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  return {
    title: d.nav.work,
    description: d.work.page.metaDescription,
    alternates: { canonical: `${site.url}${localeHref(locale, path)}`, languages: languageAlternates(site.url, path) },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).work.page;
  const { videos } = getContent(locale);
  const ld = pageGraph(locale, {
    type: "CollectionPage",
    path,
    name: getDict(locale).nav.work,
    description: d.metaDescription,
    trail: [{ name: getDict(locale).nav.work, path }],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: videos.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "VideoObject",
          name: v.title,
          description: `${v.category} · ${v.client}`,
          thumbnailUrl: `${site.url}/work/${v.id}.jpg`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
          contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
          creator: { "@id": ORG_ID },
          inLanguage: locale,
        },
      })),
    },
  });
  return (
    <>
      <JsonLd data={ld} />
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
