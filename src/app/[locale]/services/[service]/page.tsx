import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stage } from "@/components/ui/Stage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Quotes } from "@/components/sections/Quotes";
import { VideoStories } from "@/components/sections/VideoStories";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { OdooPanel } from "@/components/brand/OdooPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import { getContent, getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { ORG_ID, ogImages, pageGraph, pageUrl } from "@/lib/seo";
import { PROOF, RELATED, SERVICE_PATHS, getServicePage, servicePath, slugForPath } from "@/lib/service-pages";

type Params = { locale: string; service: string };

export const dynamicParams = false;

export function generateStaticParams(): { service: string }[] {
  return Object.values(SERVICE_PATHS).map((service) => ({ service }));
}

function resolve(raw: Params) {
  const locale: Locale = isLocale(raw.locale) ? raw.locale : "en";
  const slug = slugForPath(raw.service);
  return { locale, slug };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = resolve(await params);
  if (!slug) return {};
  const p = getServicePage(locale, slug);
  const path = servicePath(slug);
  return {
    title: p.seoTitle,
    description: p.metaDescription,
    alternates: { canonical: pageUrl(locale, path), languages: languageAlternates(site.url, path) },
    openGraph: { title: p.seoTitle, description: p.metaDescription, url: pageUrl(locale, path), type: "website", images: ogImages(locale, path, p.h1) },
    twitter: { card: "summary_large_image", title: p.seoTitle, description: p.metaDescription, images: ogImages(locale, path, p.h1) },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<Params> }) {
  const { locale, slug } = resolve(await params);
  if (!slug) notFound();
  const d = getDict(locale);
  const t = d.servicePage;
  const { services } = getContent(locale);
  const service = services.find((s) => s.slug === slug)!;
  const p = getServicePage(locale, slug);
  const path = servicePath(slug);
  const url = pageUrl(locale, path);
  const L = (h: string) => localeHref(locale, h);

  const ld = pageGraph(locale, {
    type: "WebPage",
    path,
    name: p.seoTitle,
    description: p.metaDescription,
    trail: [
      { name: t.services, path: "/services" },
      { name: service.title, path },
    ],
    mainEntity: { "@id": `${url}#service` },
    extra: [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: p.seoTitle,
        description: p.answer,
        category: d.servicesPage.groups[service.group],
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Place", name: "Worldwide" },
        url,
        inLanguage: locale,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.deliverTitle.replace(/\.$/, ""),
          itemListElement: p.deliverables.map((x) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: x.title, description: x.text },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  });

  const proof = PROOF[slug];

  return (
    <>
      <JsonLd data={ld} />

      <PageHeader
        eyebrow={`${t.services} · ${d.servicesPage.groups[service.group]}`}
        title={p.h1}
        lead={p.lead}
        aside={
          <>
            <Link href={L("/contact")} className="btn btn-navy">
              {t.cta} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </Link>
            <Link href={L("/services")} className="btn btn-ghost">
              {t.allServices} <ArrowRight size={16} className="rtl:-scale-x-100" />
            </Link>
          </>
        }
      />

      {/* Short answer + who it's for */}
      <Stage id="overview">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] sm:p-9">
              <p className="eyebrow text-blue">{t.shortAnswer}</p>
              <p className="mt-4 font-display text-xl font-medium leading-relaxed text-navy sm:text-2xl">{p.answer}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <h2 className="font-display text-2xl font-semibold text-navy">{t.forYou}</h2>
            <ul className="mt-6 space-y-4">
              {p.fit.map((f) => (
                <li key={f} className="flex gap-3 text-ink-2">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {slug === "erp-odoo" && (
              <div className="mt-10 max-w-[420px]">
                <OdooPanel />
              </div>
            )}
          </Reveal>
        </div>
      </Stage>

      {/* Deliverables + stack */}
      <Stage id="deliverables">
        <SectionHeader eyebrow={t.deliverLabel} title={t.deliverTitle} />
        <Stagger as="ul" className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.deliverables.map((x, i) => (
            <StaggerItem as="li" key={x.title} className="rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04]">
              <span className="section-num text-blue">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-xl font-semibold text-navy">{x.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{x.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1} className="mt-14 border-t border-line pt-8">
          <p className="mono-label text-ink-3">{t.stackLabel}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line bg-cloud px-3 py-1.5 text-sm font-medium text-ink">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </Stage>

      <Process locale={locale} />

      {proof === "videos" && <WorkGallery locale={locale} />}
      {proof === "stories" && <VideoStories num="" />}
      {proof === "quotes" && <Quotes num="" />}

      <FAQ num="" items={p.faqs} eyebrow={t.faqLabel} title={t.faqTitle} text={t.faqText} />

      {/* Related services */}
      <Stage id="related">
        <SectionHeader eyebrow={t.relatedLabel} title={t.relatedTitle} />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
          {RELATED[slug].map((rs) => {
            const r = services.find((s) => s.slug === rs)!;
            return (
              <StaggerItem as="li" key={rs}>
                <Link
                  href={L(servicePath(rs))}
                  className="group flex h-full flex-col rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] transition-colors hover:bg-mist"
                >
                  <p className="mono-label text-blue">{d.servicesPage.groups[r.group]}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold text-navy group-hover:text-blue">{r.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] text-ink-2">{r.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy group-hover:text-blue">
                    {d.servicesPage.learnMore} <ArrowRight size={15} className="rtl:-scale-x-100" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Stage>
    </>
  );
}
