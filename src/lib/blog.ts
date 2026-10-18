import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/config";

/* ─────────────────────────────────────────────
   Blog — file-based. English posts live in /content/blog, Arabic
   translations in /content/blog/ar with the SAME file name (slug).
   A post without an Arabic file falls back to the English text so the
   Arabic site never shows a hole; the sitemap only lists real translations.
   ───────────────────────────────────────────── */

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string; // ISO
  updated?: string; // ISO
  author: string;
  tags: string[];
  category: string;
  readingMinutes: number;
  faqs?: { q: string; a: string }[];
  draft?: boolean;
  locale: Locale; // language of the text actually returned
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function dirFor(locale: Locale) {
  return locale === "en" ? BLOG_DIR : path.join(BLOG_DIR, locale);
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function toMeta(slug: string, data: Record<string, unknown>, content: string, locale: Locale): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author ?? "MFY Innovatech"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category ?? "Insights"),
    readingMinutes: readingTime(content),
    faqs: Array.isArray(data.faqs) ? (data.faqs as { q: string; a: string }[]) : undefined,
    draft: Boolean(data.draft),
    locale,
  };
}

function readFile(slug: string, locale: Locale) {
  for (const ext of ["md", "mdx"]) {
    const file = path.join(dirFor(locale), `${slug}.${ext}`);
    if (fs.existsSync(file)) return matter(fs.readFileSync(file, "utf8"));
  }
  return null;
}

/* English files define the set of posts; other locales translate them. */
function slugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function hasTranslation(slug: string, locale: Locale) {
  return locale === "en" || readFile(slug, locale) !== null;
}

export function getAllPosts(locale: Locale = "en"): PostMeta[] {
  return slugs()
    .map((slug) => {
      const own = readFile(slug, locale);
      const src = own ?? readFile(slug, "en");
      if (!src) return null;
      return toMeta(slug, src.data, src.content, own ? locale : "en");
    })
    .filter((p): p is PostMeta => !!p)
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: Locale = "en"): Post | null {
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  const own = readFile(slug, locale);
  const src = own ?? readFile(slug, "en");
  if (!src) return null;
  return { ...toMeta(slug, src.data, src.content, own ? locale : "en"), content: src.content };
}

export function formatDate(iso: string, locale: Locale = "en") {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  /* Latin digits in both languages; Arabic month names for the Arabic site */
  return d.toLocaleDateString(locale === "ar" ? "ar-KW-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
