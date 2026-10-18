import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { formatDate, getAllPosts } from "@/lib/blog";
import { Stage } from "@/components/ui/Stage";
import { getDict, localeHref, type Locale } from "@/lib/i18n";

export function Insights({ locale, num = "08" }: { locale: Locale; num?: string }) {
  const d = getDict(locale).insights;
  const posts = getAllPosts(locale).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Stage id="insights" tone="white">
      <div>
        <SectionHeader
          num={num}
          eyebrow={d.label}
          title={
            <>
              {d.h2a} <span className="text-ink-3">{d.h2b}</span>
            </>
          }
          text={d.text}
          action={
            <Link href={localeHref(locale, "/blog")} className="link-arrow">
              {d.all} <ArrowRight size={16} className="rtl:-scale-x-100" />
            </Link>
          }
        />
        <Stagger as="ul" className="mt-14 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <StaggerItem as="li" key={p.slug} className="rounded-[28px] bg-cloud ring-1 ring-navy/[0.04]">
              <Link href={localeHref(locale, `/blog/${p.slug}`)} className="group flex h-full flex-col p-7">
                <p className="mono-label text-blue">{p.category}</p>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-blue">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] text-ink-2">{p.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="mono-label text-ink-3">
                    {formatDate(p.date, locale)} · {p.readingMinutes} {d.min}
                  </span>
                  <ArrowUpRight size={16} className="text-ink-3 transition-colors group-hover:text-blue rtl:-scale-x-100" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Stage>
  );
}
