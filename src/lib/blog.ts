import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* ─────────────────────────────────────────────
   Blog — file-based. Drop a Markdown file into /content/blog,
   fill the frontmatter, and the post, its SEO tags, the sitemap
   and the RSS feed are generated at build time.
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
};

export type Post = PostMeta & { content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
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
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
      const { data, content } = matter(raw);
      return toMeta(f.replace(/\.mdx?$/, ""), data, content);
    })
    .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  for (const c of candidates) {
    const file = path.join(BLOG_DIR, c);
    if (fs.existsSync(file)) {
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      return { ...toMeta(slug, data, content), content };
    }
  }
  return null;
}

export function formatDate(iso: string) {
  return new Date(iso + (iso.length === 10 ? "T00:00:00Z" : "")).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
