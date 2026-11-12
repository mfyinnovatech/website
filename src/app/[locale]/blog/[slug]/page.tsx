import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Markdown } from "@/components/blog/Markdown";
import { TechGrid } from "@/components/brand/TechGrid";
import { Stage } from "@/components/ui/Stage";
import { formatDate, getAllPosts, getPost, getRelatedPosts, hasTranslation } from "@/lib/blog";
import { serviceForPost, servicePath } from "@/lib/service-pages";
import { site } from "@/lib/content";
import { getContent, getDict, isLocale, localeHref, locales, type Locale } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import { DirectContact } from "@/components/sections/DirectContact";
import { AUTHOR_PATH } from "@/lib/author";
import { breadcrumbs, FOUNDER_ID, ORG_ID, WEBSITE_ID, ogImages, pageUrl } from "@/lib/seo";

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
  /* Keep the whole title visible in results: drop the brand suffix when it would push past ~60 chars */
  const withBrand = `${title} · ${site.name}`;
  return {
    title: withBrand.length > 60 ? { absolute: title } : title,
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
      images: ogImages(locale, `/blog/${post.slug}`, post.title),
    },
    twitter: { card: "summary_large_image", title, description: post.description, images: ogImages(locale, `/blog/${post.slug}`, post.title) },
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
  const url = pageUrl(locale, `/blog/${post.slug}`);
  const related = getRelatedPosts(post.slug, locale, 3);
  const svcSlug = serviceForPost(post.slug);
  const svc = svcSlug ? getContent(locale).services.find((s) => s.slug === svcSlug) : undefined;

  const founder = getContent(locale).team[0];
  const authorIsFounder = post.author === founder.name || post.author === getContent("en").team[0].name;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      ...(post.summary ? { abstract: post.summary } : {}),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: authorIsFounder ? { "@id": FOUNDER_ID } : { "@type": "Person", name: post.author, worksFor: { "@id": ORG_ID } },
      publisher: { "@id": ORG_ID },
      image: `${site.url}/og-default.png`,
      mainEntityOfPage: url,
      isPartOf: { "@id": WEBSITE_ID },
      articleSection: post.category,
      keywords: post.tags.join(", "),
      wordCount: post.content.trim().split(/\s+/).length,
      inLanguage: post.locale,
    },
    breadcrumbs(locale, [
      { name: d.breadcrumb, path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: post.locale,
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />

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
                {d.by}{" "}
                {authorIsFounder ? (
                  <Link href={L(AUTHOR_PATH)} rel="author" className="font-semibold text-ink underline decoration-line underline-offset-4 hover:text-blue">
                    {post.author}
                  </Link>
                ) : (
                  <span className="font-semibold text-ink">{post.author}</span>
                )}
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
            {post.summary && (
              <aside aria-label={d.summaryLabel} className="mb-10 rounded-2xl border border-line bg-cloud p-6 sm:p-7">
                <p className="eyebrow text-blue">{d.summaryLabel}</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{post.summary}</p>
              </aside>
            )}
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

            {/* Related service and guides (internal links from this article) */}
            {svc && svcSlug && (
              <Link
                href={L(servicePath(svcSlug))}
                className="group mt-14 flex items-center justify-between gap-4 rounded-2xl border border-line bg-cloud p-6 transition-colors hover:bg-mist"
              >
                <span>
                  <span className="eyebrow text-blue">{d.serviceLabel}</span>
                  <span className="mt-2 block font-display text-lg font-semibold text-navy group-hover:text-blue">{svc.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-ink-2">{svc.short}</span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-navy rtl:-scale-x-100" />
              </Link>
            )}

            {related.length > 0 && (
              <section className="mt-14" aria-labelledby="related-heading">
                <p className="eyebrow text-blue">{d.relatedLabel}</p>
                <h2 id="related-heading" className="mt-2 font-display text-2xl font-semibold text-ink">
                  {d.relatedTitle}
                </h2>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={L(`/blog/${r.slug}`)} className="group flex items-start justify-between gap-4 py-5">
                        <span>
                          <span className="block font-display text-lg font-medium text-ink group-hover:text-blue">{r.title}</span>
                          <span className="mt-1 block text-[0.95rem] text-ink-2">{r.description}</span>
                        </span>
                        <ArrowRight size={16} className="mt-1.5 shrink-0 text-ink-3 rtl:-scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Direct contact: WhatsApp (pre-filled with this article), phones, email */}
            <DirectContact locale={locale} topic={post.title} className="mt-14" />

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
