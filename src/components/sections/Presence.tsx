"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import map from "@/lib/world-map.json";
import { presence } from "@/lib/content";

type MarkerKey = keyof typeof map.markers;

/* Global presence — dot-matrix world map generated from Natural Earth
   (scripts/generate-world-dots.mjs) with one pulsing marker per client region. */
export function Presence({ num = "07" }: { num?: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<MarkerKey | null>(null);
  const markers = presence.regions.map((r) => ({ ...r, ...map.markers[r.key as MarkerKey] }));

  return (
    <section id="presence" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="container-page">
        <SectionHeader
          num={num}
          eyebrow="Global presence"
          title={
            <>
              One studio. <span className="text-ink-3">Clients on five continents.</span>
            </>
          }
          text="Remote-first from day one. We have shipped for companies in North America, Europe, the Gulf, Africa and Australia, with overlap hours agreed per project."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Map */}
          <Reveal className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-cloud">
              <svg
                viewBox={`0 0 ${map.width} ${map.height}`}
                className="block h-auto w-full"
                role="img"
                aria-label="World map with MFY client locations marked"
              >
                <g fill="var(--color-line-2)">
                  {map.dots.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={1.9} />
                  ))}
                </g>
                {markers.map((m, i) => {
                  const on = hover === m.key;
                  return (
                    <g
                      key={m.key}
                      onMouseEnter={() => setHover(m.key as MarkerKey)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-default"
                    >
                      <circle cx={m.x} cy={m.y} r={on ? 14 : 11} fill="none" stroke="var(--color-blue)" strokeWidth={1} opacity={on ? 0.5 : 0.25} />
                      <motion.circle
                        cx={m.x}
                        cy={m.y}
                        r={on ? 8 : 6}
                        fill="var(--color-blue)"
                        stroke="#fff"
                        strokeWidth={2}
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
                        style={{ transformOrigin: `${m.x}px ${m.y}px` }}
                      />
                      {m.labelSide !== "none" && (
                      <text
                        x={
                          m.labelSide === "left" ? m.x - 14 : m.labelSide === "right" ? m.x + 14 : m.x
                        }
                        y={m.labelSide === "above" ? m.y - 14 : m.labelSide === "below" ? m.y + 24 : m.y + 5}
                        textAnchor={
                          m.labelSide === "left" ? "end" : m.labelSide === "right" ? "start" : "middle"
                        }
                        fontFamily="var(--font-mono)"
                        fontSize={13}
                        letterSpacing="0.12em"
                        fill={on ? "var(--color-blue)" : "var(--color-ink-2)"}
                        className="uppercase"
                      >
                        {(m.mapLabel ?? m.label).toUpperCase()}
                      </text>
                      )}
                    </g>
                  );
                })}
              </svg>
              <p className="absolute bottom-3 left-4 hidden font-mono text-[10px] uppercase tracking-[0.12em] text-ink-4 sm:block">
                Equal Earth projection · markers show client regions
              </p>
            </div>
          </Reveal>

          {/* Region index + numbers */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <ul className="divide-y divide-line border-y border-line">
              {markers.map((m, i) => (
                <li
                  key={m.key}
                  onMouseEnter={() => setHover(m.key as MarkerKey)}
                  onMouseLeave={() => setHover(null)}
                  className={`flex items-baseline justify-between gap-4 py-3 transition-colors ${
                    hover === m.key ? "text-blue" : "text-ink"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="section-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display font-semibold">{m.name}</span>
                  </span>
                  <span className="mono-label text-ink-3">{m.note}</span>
                </li>
              ))}
              <li className="py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
                + {presence.more}
              </li>
            </ul>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              {presence.stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink">{s.value}</dd>
                  <dt className="mono-label mt-1.5 text-ink-3">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
