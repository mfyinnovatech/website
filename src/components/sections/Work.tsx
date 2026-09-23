import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { TechGrid } from "@/components/brand/TechGrid";
import { caseStudies, videos } from "@/lib/content";

export function Work() {
  const featured = videos.filter((v) => v.featured).slice(0, 3);
  return (
    <section id="work" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          num="04"
          eyebrow="Selected work"
          title={
            <>
              Products you can watch. <span className="text-ink-3">Systems you can run.</span>
            </>
          }
          text="Photoreal 3D productions for launches and e-commerce, alongside the software and ERP engagements behind them."
          action={
            <Link href="/work" className="link-arrow">
              View all work <ArrowRight size={16} />
            </Link>
          }
        />

        {/* 3D films */}
        <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:items-start">
          {featured.map((v, i) => (
            <StaggerItem
              key={v.id}
              className={i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <VideoCard video={v} size={i === 0 ? "lg" : "md"} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Software case studies */}
        <Stagger className="mt-20 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <StaggerItem key={c.slug}>
              <CaseCard {...c} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function CaseCard({
  title,
  sector,
  services,
  summary,
  result,
  accent,
}: (typeof caseStudies)[number]) {
  const dark = accent === "navy";
  const blue = accent === "blue";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
        dark
          ? "border-navy bg-navy text-white"
          : blue
            ? "border-blue bg-blue text-white"
            : "border-line bg-cloud text-ink"
      }`}
    >
      {(dark || blue) && <TechGrid dark diagonal={false} fade="radial" className="opacity-60" />}
      <div className="relative">
        <p className={`eyebrow ${dark || blue ? "text-white/60" : "text-blue"}`}>{sector}</p>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{title}</h3>
        <p className={`mt-4 text-[0.95rem] ${dark || blue ? "text-white/70" : "text-ink-2"}`}>{summary}</p>
      </div>
      <div className="relative mt-8 flex items-end justify-between border-t pt-6" style={{ borderColor: dark || blue ? "rgba(255,255,255,.14)" : "var(--color-line)" }}>
        <div>
          <p className="font-display text-3xl font-semibold">{result.value}</p>
          <p className={`mono-label mt-1 ${dark || blue ? "text-white/60" : "text-ink-3"}`}>{result.label}</p>
        </div>
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            dark || blue ? "border-white/25 group-hover:bg-white group-hover:text-navy" : "border-line-2 group-hover:bg-blue group-hover:text-white group-hover:border-blue"
          }`}
        >
          <ArrowUpRight size={16} />
        </span>
      </div>
      <p className="relative mt-4 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">
        {services.join(" · ")}
      </p>
    </article>
  );
}

export { Reveal };
