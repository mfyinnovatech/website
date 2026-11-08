import { getPost } from "@/lib/blog";
import { isLocale } from "@/lib/i18n";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MFY Innovatech article";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const post = getPost(slug, locale);
  return ogCard({ eyebrow: post?.category ?? "Blog", title: post?.title ?? "MFY Innovatech", locale });
}
