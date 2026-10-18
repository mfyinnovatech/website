import * as enContent from "@/lib/content";
import * as arContent from "./content.ar";
import { en } from "./dict.en";
import { ar } from "./dict.ar";
import type { Locale } from "./config";

export * from "./config";
export type { Dict } from "./dict.en";

const dicts = { en, ar } as const;

/* Translated copy for a locale. Shape matches src/lib/content.ts. */
export function getContent(locale: Locale) {
  const c = locale === "ar" ? arContent : enContent;
  return {
    site: c.site,
    services: c.services,
    videos: c.videos,
    process: c.process,
    stats: c.stats,
    videoTestimonials: c.videoTestimonials,
    testimonials: c.testimonials,
    team: c.team,
    faqs: c.faqs,
    presence: c.presence,
    clients: c.clients,
    tools: c.tools,
    featuredTools: c.featuredTools,
  };
}

export function getDict(locale: Locale) {
  return dicts[locale];
}

/* Primary navigation, built from the dictionary so labels translate */
export function getNav(locale: Locale) {
  const d = dicts[locale].nav;
  return [
    { label: d.home, href: "/" },
    { label: d.services, href: "/services" },
    { label: d.work, href: "/work" },
    { label: d.about, href: "/about" },
    { label: d.blog, href: "/blog" },
    { label: d.contact, href: "/contact" },
  ];
}
