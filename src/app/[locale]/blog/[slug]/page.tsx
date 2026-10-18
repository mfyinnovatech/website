import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Markdown } from "@/components/blog/Markdown";
import { TechGrid } from "@/components/brand/TechGrid";
import { Stage } from "@/components/ui/Stage";
import { formatDate, getAllPosts, getPost, hasTranslation } from "@/lib/blog";
import { site } from "@/lib/content";
import { getDict, isLocale, localeHref, locales, type Locale } from "@/lib/i18n";

type Params = { slug: string; locale: string };

export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const post = getPost(slug, locale);
  if (!post) return {};
  const url = `${site.url}${localeHref(locale, `/blog/${post.slug}`)}`;
  const title = post.seoTitle ?? post.title;
  const languages: Record<string, string> = {};
  for (const l of locales) if (hasTranslation(slug, l)) languages[l] = `${site.url}${localeHref(l, `/blog/${slug}`)}`;
  languages["x-default"] = `${site.url}/blog/${slug}`;
  return {
    title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: site.name,
      locale: locale === "ar" ? "ar_KW" : "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description: post.description, images: ["/og-default.png"] },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const post = getPost(slug, locale);
  if (!post) notFound();
  const d = getDict(locale).blog;
  const L = (p: string) => localeHref(locale, p);

  const all = getAllPosts(locale);
  const idx = all.findIndex((p) => p.slug === post.slug);
  const next = all[(idx + 1) % all.length];
  const url = `${site.url}${L(`/blog/${post.slug}`)}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@type": "Person", name: post.author, worksFor: { "@type": "Organization", name: site.legalName } },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
      inLanguage: post.locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: d.home, item: `${site.url}${L("/")}` },
        { "@type": "ListItem", position: 2, name: d.breadcrumb, item: `${site.url}${L("/blog")}` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Article header */}
      <section className="relative overflow-hidden bg-cloud pt-[var(--nav-offset)]">
        <div className="container-page relative">
          <TechGrid fade="b" className="h-[80%]" />
          <div className="relative mx-auto max-w-3xl px-0 pb-12 pt-14 sm:pt-20">
            <nav aria-label="Breadcrumb" className="mono-label flex items-center gap-2 text-ink-3">
              <Link href={L("/blog")} className="hover:text-blue">
                {d.breadcrumb}
              </Link>
              <span aria-hidden>/</span>
              <span className="text-blue">{post.category}</span>
            </nav>
            <h1 className="text-h1 mt-6 text-ink" lang={post.locale}>{post.title}</h1>
            <p className="text-lead mt-6">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-ink-3">
              <span>
                {d.by} <span className="font-semibold text-ink">{post.author}</span>
              </span>
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span>{post.readingMinutes} {d.minRead}</span>
            </div>
          </div>
        </div>
        <div className="h-8 sm:h-12" />
      </section>

      {/* Body */}
      <Stage>
        <article lang={post.locale} dir={post.locale === "ar" ? "rtl" : "ltr"}>
          <div className="mx-auto max-w-3xl">
            <Markdown content={post.content} />

            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-16 border-t border-line pt-10" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="font-display text-2xl font-semibold text-ink">
                  {d.faqHeading}
                </h2>
                <dl className="mt-6 divide-y divide-line border-y border-line">
                  {post.faqs.map((f) => (
                    <div key={f.q} className="py-5">
                      <dt className="font-display text-lg font-medium text-ink">{f.q}</dt>
                      <dd className="mt-2 text-ink-2">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-cloud px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-2xl bg-navy p-8 text-white lg:p-10">
              <p className="eyebrow text-blue-soft">{d.talk}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold lg:text-3xl">{d.haveProject}</h2>
              <p className="mt-3 max-w-xl text-white/70">{d.projectText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={L("/contact")} className="btn btn-white">
                  {d.start} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                </Link>
                <Link href={L("/services#erp-odoo")} className="btn btn-ghost-dark">
                  {d.odooServices}
                </Link>
              </div>
            </div>

            {/* Prev / next */}
            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link href={L("/blog")} className="link-arrow">
                <ArrowLeft size={16} className="rtl:-scale-x-100" /> {d.allPosts}
              </Link>
              {next && next.slug !== post.slug && (
                <Link href={L(`/blog/${next.slug}`)} className="link-arrow text-end">
                  {next.title} <ArrowRight size={16} className="rtl:-scale-x-100" />
                </Link>
              )}
            </div>
          </div>
        </article>
      </Stage>
    </>
  );
}
