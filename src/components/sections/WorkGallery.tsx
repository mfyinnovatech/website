"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { VideoCard } from "@/components/ui/VideoCard";
import { TechGrid } from "@/components/brand/TechGrid";
import { caseStudies, videos } from "@/lib/content";

type Filter = "all" | "3d" | "software";

const filters: { key: Filter; label: string; count: number }[] = [
  { key: "all", label: "All", count: videos.length + caseStudies.length },
  { key: "3d", label: "3D animation", count: videos.length },
  { key: "software", label: "Software & ERP", count: caseStudies.length },
];

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const show3d = filter !== "software";
  const showSoft = filter !== "3d";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6" role="tablist" aria-label="Filter work">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 font-display text-sm font-medium transition-colors ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line-2 text-ink hover:border-ink"
                }`}
              >
                {f.label}
                <span className={`font-mono text-[11px] ${active ? "text-white/60" : "text-ink-3"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {show3d && (
              <div className="pt-14">
                <div className="flex items-baseline justify-between">
                  <h2 className="eyebrow text-blue">3D product animation</h2>
                  <span className="mono-label text-ink-3">{videos.length} productions</span>
                </div>
                <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {videos.map((v, i) => (
                    <li key={v.id}>
                      <VideoCard video={v} priority={i < 3} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showSoft && (
              <div className="pt-16">
                <div className="flex items-baseline justify-between">
                  <h2 className="eyebrow text-blue">Software & ERP engagements</h2>
                  <span className="mono-label text-ink-3">Representative · client details on request</span>
                </div>
                <ul className="mt-8 grid gap-4 lg:grid-cols-3">
                  {caseStudies.map((c) => {
                    const dark = c.accent !== "ice";
                    return (
                      <li key={c.slug}>
                        <article
                          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 ${
                            c.accent === "navy"
                              ? "border-navy bg-navy text-white"
                              : c.accent === "blue"
                                ? "border-blue bg-blue text-white"
                                : "border-line bg-cloud text-ink"
                          }`}
                        >
                          {dark && <TechGrid dark diagonal={false} fade="radial" className="opacity-60" />}
                          <div className="relative">
                            <p className={`eyebrow ${dark ? "text-white/60" : "text-blue"}`}>{c.sector}</p>
                            <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{c.title}</h3>
                            <p className={`mt-4 text-[0.95rem] ${dark ? "text-white/70" : "text-ink-2"}`}>{c.summary}</p>
                          </div>
                          <div className="relative mt-8 flex items-end justify-between border-t pt-6" style={{ borderColor: dark ? "rgba(255,255,255,.14)" : "var(--color-line)" }}>
                            <div>
                              <p className="font-display text-3xl font-semibold">{c.result.value}</p>
                              <p className={`mono-label mt-1 ${dark ? "text-white/60" : "text-ink-3"}`}>{c.result.label}</p>
                            </div>
                            <ArrowUpRight size={18} className="opacity-60" />
                          </div>
                          <p className="relative mt-4 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">
                            {c.services.join(" · ")}
                          </p>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
