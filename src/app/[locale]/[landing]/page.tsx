import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stage } from "@/components/ui/Stage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Process } from "@/components/sections/Process";
import { Quotes } from "@/components/sections/Quotes";
import { FAQ } from "@/components/sections/FAQ";
import { OdooPanel } from "@/components/brand/OdooPanel";
import { DirectContact, WhatsAppGlyph, whatsappHref } from "@/components/sections/DirectContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import { getPost } from "@/lib/blog";
import { getContent, getDict, isLocale, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { ORG_ID, pageGraph, pageUrl } from "@/lib/seo";
import { servicePath } from "@/lib/service-pages";
import { LANDINGS, LANDING_SLUGS, getLanding } from "@/lib/landing-pages";

type Params = { locale: string; landing: string };

export const dynamicParams = false;

export function generateStaticParams(): { landing: string }[] {
  return LANDING_SLUGS.map((landing) => ({ landing }));
}

function resolve(raw: Params) {
  const locale: Locale = isLocale(raw.locale) ? raw.locale : "en";
  return { locale, slug: raw.landing, page: getLanding(locale, raw.landing) };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug, page } = resolve(await params);
  if (!page) return {};
  const path = `/${slug}`;
  const long = `${page.seoTitle} · ${site.name}`.length > 60;
  return {
    title: long ? { absolute: page.seoTitle } : page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: pageUrl(locale, path), languages: languageAlternates(site.url, path) },
    openGraph: { title: page.seoTitle, description: page.metaDescription, url: pageUrl(locale, path), type: "website" },
  };
}

export default async function LandingPage({ params }: { params: Promise<Params> }) {
  const { locale, slug, page } = resolve(await params);
  if (!page) notFound();
  const cfg = LANDINGS[slug];
  const d = getDict(locale);
  const t = d.landing;
  const { services, clients, site: s } = getContent(locale);
  const path = `/${slug}`;
  const url = pageUrl(locale, path);
  const L = (h: string) => localeHref(locale, h);
  const posts = cfg.posts.map((p) => getPost(p, locale)).filter((p): p is NonNullable<typeof p> => !!p);
  const marketName = cfg.market === "KW" ? "Kuwait" : "United States";

  const ld = pageGraph(locale, {
    type: "WebPage",
    path,
    name: page.seoTitle,
    description: page.metaDescription,
    trail: [{ name: page.eyebrow, path }],
    mainEntity: { "@id": `${url}#service` },
    extra: [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.seoTitle,
        description: page.answer,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: marketName },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          servicePhone: cfg.market === "KW" ? s.phones[0].tel : undefined,
          availableLanguage: cfg.market === "KW" ? ["English", "Arabic"] : ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.servicesTitle.replace(/\.$/, ""),
          itemListElement: cfg.services.map((sl) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${pageUrl(locale, servicePath(sl))}#service` },
          })),
        },
        inLanguage: locale,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  });

  const wa = whatsappHref(s.whatsapp, d.direct.prefill(page.seoTitle));

  return (
    <>
      <JsonLd data={ld} />

      <PageHeader
        eyebrow={page.eyebrow}
        title={page.h1}
        lead={page.lead}
        aside={
          <>
            <a href={wa} target="_blank" rel="noopener" className="btn bg-[#25D366] text-navy hover:bg-navy hover:text-white">
              <WhatsAppGlyph /> {d.direct.whatsapp}
            </a>
            <Link href={L("/contact")} className="btn btn-navy">
              {d.nav.cta} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </Link>
          </>
        }
      />

      {/* Short answer + market-specific points */}
      <Stage id="overview">
        <Reveal>
          <div className="rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] sm:p-9">
            <p className="eyebrow text-blue">{d.servicePage.shortAnswer}</p>
            <p className="mt-4 max-w-4xl font-display text-xl font-medium leading-relaxed text-navy sm:text-2xl">{page.answer}</p>
          </div>
        </Reveal>
        <SectionHeader className="mt-16" eyebrow={page.pointsLabel} title={page.pointsTitle} />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2">
          {page.points.map((x, i) => (
            <StaggerItem as="li" key={x.title} className="rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04]">
              <span className="section-num text-blue">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">{x.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{x.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        {cfg.odooApps && (
          <Reveal delay={0.1} className="mt-12 max-w-[460px]">
            <OdooPanel />
          </Reveal>
        )}
      </Stage>

      {/* Services that fit this market */}
      <Stage id="services">
        <SectionHeader eyebrow={t.servicesLabel} title={page.servicesTitle} />
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cfg.services.map((sl) => {
            const sv = services.find((x) => x.slug === sl)!;
            return (
              <StaggerItem as="li" key={sl}>
                <Link
                  href={L(servicePath(sl))}
                  className="group flex h-full flex-col rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] transition-colors hover:bg-mist"
                >
                  <h3 className="font-display text-xl font-semibold text-navy group-hover:text-blue">{sv.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] text-ink-2">{sv.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy group-hover:text-blue">
                    {t.learnMore} <ArrowRight size={15} className="rtl:-scale-x-100" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Stage>

      {/* US clients from the trust strip */}
      {cfg.clients && (
        <Stage id="clients">
          <SectionHeader eyebrow={t.clientsLabel} title={t.clientsTitle} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {cfg.clients.map((k) => {
              const cl = clients.find((x) => x.key === k)!;
              return (
                <li key={k}>
                  <a
                    href={cl.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full items-center gap-6 rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] hover:bg-mist"
                  >
                    <Image src={cl.logo} alt={cl.name} width={cl.width} height={cl.height} style={{ width: cl.width, height: "auto", maxWidth: "40%" }} />
                    <span>
                      <span className="block font-display text-lg font-semibold text-navy">{cl.name}</span>
                      <span className="mono-label mt-1 block text-ink-3">{cl.sector}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Stage>
      )}

      <Process locale={locale} />
      <Quotes num="" />
      <FAQ num="" items={page.faqs} eyebrow={d.servicePage.faqLabel} title={d.servicePage.faqTitle} text={d.servicePage.faqText} />

      {/* Further reading */}
      {posts.length > 0 && (
        <Stage id="reading">
          <SectionHeader eyebrow={t.readingLabel} title={t.readingTitle} />
          <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2">
            {posts.map((p) => (
              <StaggerItem as="li" key={p.slug}>
                <Link href={L(`/blog/${p.slug}`)} className="group flex h-full flex-col rounded-[28px] bg-cloud p-7 ring-1 ring-navy/[0.04] hover:bg-mist">
                  <p className="mono-label text-blue">{p.category}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy group-hover:text-blue">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] text-ink-2">{p.description}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Stage>
      )}

      <section className="px-4 pt-4">
        <div className="mx-auto max-w-[1408px]">
          <DirectContact locale={locale} topic={page.seoTitle} />
        </div>
      </section>
    </>
  );
}
