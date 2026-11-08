import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stage } from "@/components/ui/Stage";
import { DirectContact } from "@/components/sections/DirectContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import { formatDate, getAllPosts } from "@/lib/blog";
import { getContent, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { FOUNDER_ID, ORG_ID, pageGraph, pageUrl } from "@/lib/seo";
import { AUTHOR_FACTS, AUTHOR_PATH, getAuthor } from "@/lib/author";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const a = getAuthor(locale);
  const founder = getContent("en").team[0];
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: pageUrl(locale, AUTHOR_PATH), languages: languageAlternates(site.url, AUTHOR_PATH) },
    openGraph: {
      type: "profile",
      title: a.metaTitle,
      description: a.metaDescription,
      url: pageUrl(locale, AUTHOR_PATH),
      images: [{ url: `${site.url}${founder.photo}`, alt: a.name }],
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const a = getAuthor(locale);
  const founder = getContent(locale).team[0];
  const L = (p: string) => localeHref(locale, p);
  const names = new Set([getContent("en").team[0].name, founder.name]);
  const articles = getAllPosts(locale).filter((p) => names.has(p.author));

  const ld = pageGraph(locale, {
    type: "ProfilePage",
    path: AUTHOR_PATH,
    name: a.metaTitle,
    description: a.metaDescription,
    trail: [
      { name: a.breadcrumb, path: "/about" },
      { name: a.name, path: AUTHOR_PATH },
    ],
    mainEntity: { "@id": FOUNDER_ID },
    extra: [
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: getContent("en").team[0].name,
        alternateName: locale === "ar" ? a.name : undefined,
        url: pageUrl("en", AUTHOR_PATH),
        image: `${site.url}${founder.photo}`,
        jobTitle: a.role,
        description: a.answer,
        worksFor: { "@id": ORG_ID },
        alumniOf: { "@type": "CollegeOrUniversity", name: AUTHOR_FACTS.alumniOf },
        knowsAbout: AUTHOR_FACTS.knowsAbout,
        knowsLanguage: ["en", "ar", "ur"],
        sameAs: [founder.linkedin, founder.instagram].filter((u) => !!u && u !== "#"),
      },
    ],
  });

  return (
    <>
      <JsonLd data={ld} />
      <PageHeader
        eyebrow={a.eyebrow}
        title={a.name}
        lead={a.lead}
        aside={
          <>
            <a href={founder.linkedin} target="_blank" rel="noreferrer" className="btn btn-navy">
              {a.linkedin} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </a>
            <Link href={L("/contact")} className="btn btn-ghost">
              {a.contact} <ArrowRight size={16} className="rtl:-scale-x-100" />
            </Link>
          </>
        }
      />

      <Stage>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Portrait + facts */}
          <aside className="lg:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] bg-cloud">
              <Image src={founder.photo!} alt={a.name} fill sizes="(min-width: 1024px) 384px, 90vw" className="object-cover" priority />
            </div>
            <p className="mt-6 font-display text-xl font-semibold text-ink">{a.name}</p>
            <p className="mt-1 text-ink-2">{a.role}</p>

            <h2 className="mono-label mt-10 text-ink-3">{a.credentialsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {a.credentials.map((c) => (
                <li key={c} className="flex gap-3 text-[0.98rem] text-ink-2">
                  <Check size={18} className="mt-0.5 shrink-0 text-blue" />
                  {c}
                </li>
              ))}
            </ul>

            <h2 className="mono-label mt-10 text-ink-3">{a.industriesTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {a.industries.map((i) => (
                <span key={i} className="rounded-full border border-line bg-cloud px-3 py-1 text-sm text-ink-2">
                  {i}
                </span>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-line bg-cloud p-6 sm:p-7">
              <p className="eyebrow text-blue">{a.answerLabel}</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{a.answer}</p>
            </div>

            <h2 className="mt-14 font-display text-2xl font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">{a.expertiseTitle}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {a.expertise.map((e) => (
                <div key={e.title} className="rounded-2xl border border-line bg-white p-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{e.title}</h3>
                  <p className="mt-2 text-[0.98rem] text-ink-2">{e.text}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-14 font-display text-2xl font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">{a.resultTitle}</h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink-2">{a.resultIntro}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {a.result.map((r) => (
                <li key={r} className="rounded-xl bg-navy p-5 text-[0.98rem] font-medium text-white">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-3">{a.resultNote}</p>

            <h2 className="mt-14 font-display text-2xl font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">{a.principlesTitle}</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {a.principles.map((p) => (
                <div key={p.title} className="py-5">
                  <dt className="font-display text-lg font-semibold text-ink">{p.title}</dt>
                  <dd className="mt-2 text-ink-2">{p.text}</dd>
                </div>
              ))}
            </dl>

            <figure className="mt-14 border-s-2 border-blue ps-6">
              <p className="mono-label text-ink-3">{a.quoteTitle}</p>
              <blockquote className="mt-3 font-display text-xl font-medium leading-snug text-ink" lang="en" dir="ltr">
                “{a.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink-3">{a.quoteBy}</figcaption>
            </figure>

            {articles.length > 0 && (
              <>
                <h2 className="mt-14 font-display text-2xl font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]">{a.articlesTitle}</h2>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {articles.map((p) => (
                    <li key={p.slug} className="py-4">
                      <Link href={L(`/blog/${p.slug}`)} className="group flex items-start justify-between gap-4">
                        <span>
                          <span className="font-display text-lg font-semibold text-ink group-hover:text-blue">{p.title}</span>
                          <span className="mt-1 block text-sm text-ink-3">
                            {p.category} · {formatDate(p.date, locale)}
                          </span>
                        </span>
                        <ArrowRight size={18} className="mt-1.5 shrink-0 text-ink-3 group-hover:text-blue rtl:-scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <DirectContact locale={locale} topic={a.name} className="mt-14" />
          </div>
        </div>
      </Stage>
    </>
  );
}
