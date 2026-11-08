import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getAllPosts, hasTranslation } from "@/lib/blog";
import { languageAlternates, localeHref, locales } from "@/lib/i18n";
import { SERVICE_PATHS } from "@/lib/service-pages";
import { LANDING_SLUGS } from "@/lib/landing-pages";

/* Last real change to the static pages. Bump this when page copy changes, so
   search engines can trust lastmod (a value that changes on every deploy is ignored). */
const PAGES_UPDATED = new Date("2026-11-08");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = PAGES_UPDATED;
  const paths = [
    "/",
    "/services",
    ...Object.values(SERVICE_PATHS).map((s) => `/services/${s}`),
    ...LANDING_SLUGS.map((s) => `/${s}`),
    "/work",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const pages = paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}${localeHref(l, p)}`,
      lastModified: now,
      changeFrequency: (p === "/" || p === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "/" ? 1 : p === "/blog" || p.startsWith("/services/") || LANDING_SLUGS.includes(p.slice(1)) ? 0.8 : 0.7,
      alternates: { languages: languageAlternates(site.url, p) },
    }))
  );
  const posts = getAllPosts().flatMap((p) =>
    locales
      .filter((l) => hasTranslation(p.slug, l))
      .map((l) => ({
        url: `${site.url}${localeHref(l, `/blog/${p.slug}`)}`,
        lastModified: new Date(p.updated ?? p.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: languageAlternates(site.url, `/blog/${p.slug}`) },
      }))
  );
  return [...pages, ...posts];
}
