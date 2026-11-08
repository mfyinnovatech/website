import { site } from "@/lib/content";
import { getContent, getDict, localeHref, type Locale } from "@/lib/i18n";
import { servicePath } from "@/lib/service-pages";

/* ─────────────────────────────────────────────
   Structured data (schema.org JSON-LD) shared across pages.
   Search engines use it for rich results; answer engines and AI assistants
   use it to understand who MFY is, what it offers and how pages relate.
   Every entity has a stable @id so pages reference one another instead of
   repeating facts. Only facts already stated on the site are used.
   ───────────────────────────────────────────── */

export const ORG_ID = `${site.url}/#org`;
export const WEBSITE_ID = `${site.url}/#website`;
export const FOUNDER_ID = `${site.url}/#founder`;

export function pageUrl(locale: Locale, path: string) {
  const p = localeHref(locale, path);
  return p === "/" ? site.url : `${site.url}${p}`;
}

/* Client countries named on the site (presence section and FAQ) */
const AREA_SERVED = ["US", "CA", "DE", "GR", "RO", "AE", "SA", "QA", "KW", "AU"];

export function organizationGraph(locale: Locale) {
  const c = getContent(locale);
  const founder = c.team[0];
  const real = (u: string) => !!u && u !== "#";
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-blue.png`, width: 1600, height: 902 },
      image: `${site.url}/og-default.png`,
      email: site.email,
      description: c.site.description,
      founder: { "@id": FOUNDER_ID },
      sameAs: [site.linkedinCompany, site.instagram, site.facebook, site.youtube],
      areaServed: AREA_SERVED.map((code) => ({ "@type": "Country", name: code })),
      knowsLanguage: ["en", "ar"],
      knowsAbout: [
        "Odoo ERP implementation",
        "Odoo customization",
        "ERP accounting and multi-currency",
        "Custom web and SaaS development",
        "iOS and Android app development",
        "AI model training and data annotation",
        "Business intelligence dashboards",
        "3D product animation",
        "Workflow automation",
        "Finance operations",
      ],
      telephone: site.phones[0].tel,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["English", "Arabic"] },
        ...site.phones.map((ph) => ({
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: ph.tel,
          areaServed: ph.country,
          availableLanguage: ph.country === "KW" ? ["English", "Arabic"] : ["English", "Urdu"],
        })),
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: getDict(locale).servicesPage.metaTitle,
        itemListElement: c.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${pageUrl(locale, servicePath(s.slug))}#service`,
            name: s.title,
            description: s.short,
            url: pageUrl(locale, servicePath(s.slug)),
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: founder.name,
      jobTitle: founder.role,
      description: founder.bio,
      image: founder.photo ? `${site.url}${founder.photo}` : undefined,
      worksFor: { "@id": ORG_ID },
      sameAs: [founder.linkedin, founder.instagram].filter(real),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: site.url,
      name: site.name,
      publisher: { "@id": ORG_ID },
      inLanguage: ["en", "ar"],
    },
  ];
}

/* Service entities, referenced from the offer catalogue and the services page */
export function serviceNodes(locale: Locale) {
  const c = getContent(locale);
  return c.services.map((s) => ({
    "@type": "Service",
    "@id": `${pageUrl(locale, servicePath(s.slug))}#service`,
    name: s.title,
    description: s.description,
    serviceType: s.title,
    category: getDict(locale).servicesPage.groups[s.group],
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
    url: pageUrl(locale, servicePath(s.slug)),
    inLanguage: locale,
  }));
}

/* MFY's brand video, with its YouTube chapters as Clips (Google "key moments") */
export function brandVideoNode(locale: Locale) {
  const v = getContent(locale).brandVideo;
  const watch = `https://www.youtube.com/watch?v=${v.id}`;
  return {
    "@type": "VideoObject",
    "@id": `${site.url}/#brand-video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: [`${site.url}${v.thumbnail}`, `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`],
    uploadDate: v.uploaded,
    duration: v.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: watch,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
    creator: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
    hasPart: v.chapters.map((ch, i) => ({
      "@type": "Clip",
      name: ch.label,
      startOffset: ch.t,
      endOffset: v.chapters[i + 1]?.t ?? v.seconds,
      url: `${watch}&t=${ch.t}s`,
    })),
  };
}

export function breadcrumbs(locale: Locale, trail: { name: string; path: string }[]) {
  const home = getDict(locale).nav.home;
  const all = [{ name: home, path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: all.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: pageUrl(locale, t.path) })),
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";

/* A page node plus its breadcrumb, wrapped as a graph ready for a <script> tag */
export function pageGraph(
  locale: Locale,
  opts: { type: PageType; path: string; name: string; description: string; trail?: { name: string; path: string }[]; mainEntity?: unknown; extra?: unknown[] }
) {
  const url = pageUrl(locale, opts.path);
  const crumbs = opts.trail ? breadcrumbs(locale, opts.trail) : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": opts.type,
        "@id": `${url}#webpage`,
        url,
        name: opts.name,
        description: opts.description,
        inLanguage: locale,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        ...(crumbs ? { breadcrumb: crumbs } : {}),
        ...(opts.mainEntity ? { mainEntity: opts.mainEntity } : {}),
      },
      ...(opts.extra ?? []),
    ],
  };
}
