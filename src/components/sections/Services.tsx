"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Services({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  const [active, setActive] = useState<string | null>(list[0]?.slug ?? null);

  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          num="01"
          eyebrow="What we do"
          title={
            <>
              Eight disciplines. <span className="text-ink-3">One accountable team.</span>
            </>
          }
          text="Engineering, intelligence, operations and growth, delivered by the people who will still be answering your emails a year later."
          action={
            <Link href="/services" className="link-arrow">
              All services <ArrowRight size={16} />
            </Link>
          }
        />

        <ul className="mt-16 border-t border-line">
          {list.map((s) => {
            const open = active === s.slug;
            return (
              <li key={s.slug} id={s.slug} className="scroll-mt-28 border-b border-line">
                <button
                  type="button"
                  onClick={() => setActive(open ? null : s.slug)}
                  onMouseEnter={() => setActive(s.slug)}
                  aria-expanded={open}
                  className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[4rem_1fr_auto] lg:grid-cols-[6rem_1fr_1fr_auto] lg:py-7"
                >
                  <span className="section-num">{s.num}</span>
                  <span
                    className={`font-display text-xl font-semibold transition-colors sm:text-2xl lg:text-[1.75rem] ${
                      open ? "text-blue" : "text-ink group-hover:text-blue"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="hidden text-ink-3 lg:block">{s.short}</span>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                      open ? "rotate-45 border-blue bg-blue text-white" : "border-line-2 text-ink"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-12 sm:pl-16 lg:grid-cols-[6rem_1fr_1fr_auto] lg:pl-0">
                        <span className="hidden lg:block" />
                        <p className="max-w-lg text-ink-2">{s.description}</p>
                        <ul className="flex flex-wrap content-start gap-2">
                          {s.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-line bg-cloud px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/services#${s.slug}`}
                          className="link-arrow self-start lg:pt-1"
                        >
                          Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
