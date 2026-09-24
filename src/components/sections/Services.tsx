"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";
import { OdooPanel } from "@/components/brand/OdooPanel";

const ease = [0.16, 1, 0.3, 1] as const;

/* Services — white rounded stage: pill, two-tone headline and a render on the
   left; a stacked accordion on the right where the open service is a Navy card
   with description and tag chips, the rest collapse to title + index. */
export function Services({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  const [open, setOpen] = useState(list[0].slug);

  return (
    <section id="services" className="px-4 pt-4">
      <div className="mx-auto max-w-[1408px] rounded-[40px] bg-white px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <Reveal className="flex flex-col lg:col-span-5">
            <span className="inline-flex w-fit items-center rounded-lg bg-cloud px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-blue ring-1 ring-navy/[0.06]">
              01 · Services
            </span>
            <h2 className="mt-8 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[4rem]">
              <span className="block text-ink-3">Everything it takes</span>
              <span className="block text-navy">to ship, under one roof.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-2">
              Engineering, intelligence, operations and growth, delivered by one accountable team
              that will still be answering your emails a year later.
            </p>
            <div className="mt-10 hidden max-w-[420px] lg:block">
              <OdooPanel />
            </div>
            {limit && (
              <Link href="/services" className="link-arrow mt-8 w-fit">
                All eight services <ArrowUpRight size={16} />
              </Link>
            )}
          </Reveal>

          {/* Right: stacked accordion */}
          <ul className="flex flex-col gap-4 lg:col-span-7">
            {list.map((s) => {
              const on = open === s.slug;
              return (
                <motion.li
                  key={s.slug}
                  id={s.slug}
                  layout
                  transition={{ layout: { duration: 0.5, ease } }}
                  className={`scroll-mt-32 overflow-hidden rounded-[32px] ${
                    on
                      ? "bg-navy text-white shadow-[0_30px_60px_-30px_rgba(6,16,48,0.6)]"
                      : "bg-cloud text-navy ring-1 ring-navy/[0.05] hover:bg-mist"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(s.slug)}
                    aria-expanded={on}
                    className="flex w-full items-start justify-between gap-6 p-7 text-left sm:p-8"
                  >
                    <span
                      className={`font-display font-semibold leading-tight tracking-[-0.02em] ${
                        on ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className={`shrink-0 font-mono text-sm ${on ? "text-white/60" : "text-ink-3"}`}>
                      ({s.num})
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <div className="px-7 pb-8 sm:px-8">
                          <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/70">{s.description}</p>
                          <ul className="mt-8 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <li
                                key={t}
                                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-white/10"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
