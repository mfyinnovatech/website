import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Stage } from "@/components/ui/Stage";
import { formatDate, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/content";
import { getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";

type Params = { locale: string };
const path = "/blog";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).blog;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `${site.url}${localeHref(locale, path)}`,
      languages: languageAlternates(site.url, path),
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: { images: [{ url: "/og-default.png", width: 1200, height: 630, alt: d.ogAlt }] },
  };
}

export default async function BlogIndex({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale).blog;
  const posts = getAllPosts(locale);
  const [featured, ...rest] = posts;
  const L = (p: string) => localeHref(locale, p);

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

      <Stage id="posts">
        <div>
          {featured && (
            <Link
              href={L(`/blog/${featured.slug}`)}
              className="group grid gap-6 rounded-2xl border border-line bg-cloud p-7 transition-colors hover:border-blue lg:grid-cols-12 lg:gap-10 lg:p-10"
            >
              <div className="lg:col-span-8">
                <p className="eyebrow text-blue">{featured.category} · {d.latest}</p>
                <h2 className="mt-4 max-w-[24ch] font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-ink group-hover:text-blue lg:text-4xl">{featured.title}</h2>
                <p className="mt-4 max-w-2xl text-lg text-ink-2">{featured.description}</p>
              </div>
              <div className="flex flex-col justify-between gap-6 lg:col-span-4 lg:items-end lg:text-end">
                <p className="mono-label text-ink-3">
                  {formatDate(featured.date, locale)} · {featured.readingMinutes} {d.minRead}
                </p>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-ink transition-colors group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  <ArrowUpRight size={18} className="rtl:-scale-x-100" />
                </span>
              </div>
            </Link>
          )}

          <Stagger as="ul" className="mt-6 border-t border-line">
            {rest.map((p) => (
              <StaggerItem as="li" key={p.slug} className="border-b border-line">
                <Link href={L(`/blog/${p.slug}`)} className="group grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                  <p className="mono-label text-ink-3 md:col-span-3">
                    {formatDate(p.date, locale)}
                    <span className="block text-blue">{p.category}</span>
                  </p>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-blue lg:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-ink-2">{p.description}</p>
                    <p className="mono-label mt-3 text-ink-4">{p.readingMinutes} {d.minRead}</p>
                  </div>
                  <span className="hidden justify-self-end text-ink-3 transition-colors group-hover:text-blue md:col-span-1 md:block">
                    <ArrowUpRight size={18} className="rtl:-scale-x-100" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Stage>
    </>
  );
}
