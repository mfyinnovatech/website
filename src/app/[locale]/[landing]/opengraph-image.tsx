import { isLocale } from "@/lib/i18n";
import { getLanding } from "@/lib/landing-pages";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MFY Innovatech";

export default async function Image({ params }: { params: Promise<{ locale: string; landing: string }> }) {
  const { locale: raw, landing } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const page = getLanding(locale, landing);
  return ogCard({ eyebrow: page?.eyebrow ?? "MFY Innovatech", title: page?.h1 ?? "MFY Innovatech", locale });
}
