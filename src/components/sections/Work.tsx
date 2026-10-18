import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { Stage } from "@/components/ui/Stage";
import { getContent, getDict, localeHref, type Locale } from "@/lib/i18n";

export function Work({ locale, num = "04" }: { locale: Locale; num?: string }) {
  const d = getDict(locale).work;
  const featured = getContent(locale).videos.filter((v) => v.featured).slice(0, 3);
  return (
    <Stage id="work" tone="white">
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
            <Link href={localeHref(locale, "/work")} className="link-arrow">
              {d.viewAll} <ArrowRight size={16} className="rtl:-scale-x-100" />
            </Link>
          }
        />

        {/* 3D films */}
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:items-start">
          {featured.map((v, i) => (
            <StaggerItem key={v.id} className={i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              <VideoCard video={v} size={i === 0 ? "lg" : "md"} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Stage>
  );
}
