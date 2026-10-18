import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getAllPosts, hasTranslation } from "@/lib/blog";
import { languageAlternates, localeHref, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["/", "/services", "/work", "/about", "/blog", "/contact", "/privacy", "/terms"];
  const pages = paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}${localeHref(l, p)}`,
      lastModified: now,
      changeFrequency: (p === "/" || p === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: p === "/" ? 1 : p === "/blog" ? 0.8 : 0.7,
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
      }))
  );
  return [...pages, ...posts];
}
