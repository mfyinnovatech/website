"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Landmarks drawn in the hero's dot language, cycling every few seconds:
   Kuwait Towers → Faisal Mosque (Islamabad) → Statue of Liberty (New York).
   Every scene is a set of dots on the same canvas. Between scenes each dot slides
   to its partner in the next scene, so the skyline re-forms rather than cuts.
   All geometry is computed once at module load and is deterministic, so server
   and client render identical markup. */

const W = 290;
const H = 520;
const BASE = 492; // ground line
const P = 6.4; // dot pitch
const ROW = P * 0.866; // hex row height
const HOLD_MS = 6200; // time each landmark stays on screen

const NAVY = "var(--color-navy)";
const NAVY2 = "var(--color-navy-2)";
const BLUE = "var(--color-blue)";
const SOFT = "var(--color-blue-soft)";

type Dot = { x: number; y: number; r: number; fill: string; o: number; glint?: number };
type Tone = { fill: string; o: number; r?: number } | null;

const r1 = (n: number) => Math.round(n * 10) / 10;

function hash(a: number, b: number) {
  let h = (Math.round(a * 10) * 73856093) ^ (Math.round(b * 10) * 19349663);
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) % 1000;
}

/* Light from the upper left, slightly toward the viewer */
const L = (() => {
  const v = [-0.55, -0.6, 0.58];
  const m = Math.hypot(v[0], v[1], v[2]);
  return v.map((c) => c / m);
})();

/* ── Primitives ─────────────────────────────────────────────── */

/* Tapered shaft: symmetric rows of dots from yBase up to yTop */
function taper(
  out: Dot[],
  cx: number,
  yBase: number,
  yTop: number,
  halfBase: number,
  { halfTop = 0, exp = 1.15, fill = NAVY, o = 0.9, skip }: { halfTop?: number; exp?: number; fill?: string; o?: number; skip?: (y: number) => boolean } = {}
) {
  for (let row = 0; ; row++) {
    const y = yBase - row * ROW;
    if (y < yTop) break;
    if (skip?.(y)) continue;
    const k = (yBase - y) / Math.max(1, yBase - yTop);
    const half = halfTop + (halfBase - halfTop) * (1 - k) ** exp;
    const count = Math.max(1, Math.floor((2 * half) / P) + 1);
    for (let i = 0; i < count; i++) {
      const x = cx + (i - (count - 1) / 2) * P;
      const lit = count > 1 ? (i < count / 2 ? 1 : 0.75) : 0.9;
      out.push({ x: r1(x), y: r1(y), r: 1.5, fill, o: r1(o * lit) });
    }
  }
}

/* Shaded ball on its own centred hex lattice */
function ball(out: Dot[], cx: number, cy: number, r: number, { glint = 0.085, light = false } = {}) {
  const rows = Math.ceil(r / ROW);
  for (let j = -rows; j <= rows; j++) {
    const y = cy + j * ROW;
    const off = (Math.abs(j) % 2) * (P / 2);
    const cols = Math.ceil(r / P) + 1;
    for (let i = -cols; i <= cols; i++) {
      const x = cx + i * P + off;
      const dx = (x - cx) / r;
      const dy = (y - cy) / r;
      const d2 = dx * dx + dy * dy;
      if (d2 > 1) continue;
      const b = Math.max(0, dx * L[0] + dy * L[1] + Math.sqrt(1 - d2) * L[2]);
      const h = hash(x, y);
      const fill = light ? (b > 0.5 ? "#ffffff" : SOFT) : b > 0.78 ? SOFT : b > 0.38 ? BLUE : NAVY2;
      out.push({
        x: r1(x),
        y: r1(y),
        r: r1(1.25 + b * 1.15),
        fill,
        o: r1(0.55 + b * 0.45),
        glint: h < glint * 1000 ? (h % 40) / 10 : undefined,
      });
    }
  }
}

/* Filled polygon on the global hex lattice; tone() picks colour per dot */
function poly(out: Dot[], pts: [number, number][], tone: (x: number, y: number) => Tone) {
  const ys = pts.map((p) => p[1]);
  const xs = pts.map((p) => p[0]);
  const [minY, maxY, minX, maxX] = [Math.min(...ys), Math.max(...ys), Math.min(...xs), Math.max(...xs)];
  const inside = (x: number, y: number) => {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  const firstRow = Math.ceil((BASE - maxY) / ROW);
  for (let row = firstRow; ; row++) {
    const y = BASE - row * ROW;
    if (y < minY) break;
    const off = (((row % 2) + 2) % 2) * (P / 2);
    for (let x = off + Math.floor((minX - off) / P) * P; x <= maxX; x += P) {
      if (!inside(x, y)) continue;
      const t = tone(x, y);
      if (t) out.push({ x: r1(x), y: r1(y), r: t.r ?? 1.5, fill: t.fill, o: t.o });
    }
  }
}

/* Dotted straight line (thin parts below the lattice pitch) */
function line(out: Dot[], x1: number, y1: number, x2: number, y2: number, fill = NAVY, o = 0.9, r = 1.5) {
  const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / (P * 0.85)));
  for (let i = 0; i <= n; i++) {
    out.push({ x: r1(x1 + ((x2 - x1) * i) / n), y: r1(y1 + ((y2 - y1) * i) / n), r, fill, o });
  }
}

/* Ground: two dotted rows fading toward the edges */
function ground(out: Dot[]) {
  for (let row = 0; row < 2; row++) {
    const y = BASE + 7 + row * ROW;
    for (let x = (row % 2) * (P / 2); x <= W; x += P) {
      const fade = 1 - Math.abs(x - W * 0.55) / (W * 0.58);
      if (fade <= 0.05) continue;
      out.push({ x: r1(x), y: r1(y), r: 1.2, fill: BLUE, o: Math.round(fade * (row ? 0.25 : 0.45) * 100) / 100 });
    }
  }
}

/* Drop dots that land on top of an earlier one; earlier primitives win */
function dedupe(dots: Dot[]) {
  const min = P * 0.62;
  const grid = new Map<string, Dot[]>();
  const keep: Dot[] = [];
  for (const d of dots) {
    const gx = Math.floor(d.x / min);
    const gy = Math.floor(d.y / min);
    let clash = false;
    for (let ix = gx - 1; ix <= gx + 1 && !clash; ix++)
      for (let iy = gy - 1; iy <= gy + 1 && !clash; iy++)
        for (const e of grid.get(`${ix},${iy}`) ?? []) if (Math.hypot(e.x - d.x, e.y - d.y) < min) clash = true;
    if (clash) continue;
    keep.push(d);
    const k = `${gx},${gy}`;
    grid.set(k, [...(grid.get(k) ?? []), d]);
  }
  return keep;
}

/* ── Scenes ─────────────────────────────────────────────────── */

const M = 2.45; // px per metre for the towers

function kuwaitTowers(): Dot[] {
  const out: Dot[] = [];
  const towers = [
    { cx: 112, h: 187, half: 11, spheres: [{ cy: 82, r: 16.5 }, { cy: 123, r: 10 }] },
    { cx: 198, h: 147, half: 9, spheres: [{ cy: 75, r: 14 }] },
    { cx: 252, h: 113, half: 6, spheres: [] as { cy: number; r: number }[] },
  ];
  for (const t of towers) {
    const sph = t.spheres.map((s) => ({ cy: BASE - s.cy * M, r: s.r * M }));
    sph.forEach((s) => ball(out, t.cx, s.cy, s.r));
    taper(out, t.cx, BASE, BASE - t.h * M, t.half, { skip: (y) => sph.some((s) => Math.abs(y - s.cy) < s.r - P * 0.4) });
  }
  ground(out);
  return out;
}

function faisalMosque(): Dot[] {
  const out: Dot[] = [];
  const C = 145; // centre line
  const minaret = (cx: number, base: number, top: number, fill: string, o: number) => {
    const coneStart = top + (base - top) * 0.12;
    taper(out, cx, base, coneStart, 4.6, { halfTop: 4.6, fill, o });
    taper(out, cx, coneStart - ROW, top, 3.6, { fill, o, exp: 1 });
    const balcony = top + (base - top) * 0.24;
    line(out, cx - 8, balcony, cx + 8, balcony, fill, o, 1.7);
  };

  /* Prayer hall: a desert tent. The roof drops steeply from the peak and flares
     wide at the base (concave sides). The front is folded into facets: a lighter
     central triangle framed by two dark fold lines, darker side wings. */
  const PEAK = 326;
  const EAVE = 462;
  const HALF = 112;
  const roofY = (x: number) => {
    const d = Math.min(1, Math.abs(x - C) / HALF);
    return EAVE - (EAVE - PEAK) * (1 - d) ** 1.22;
  };
  const outline: [number, number][] = [];
  for (let i = 0; i <= 40; i++) {
    const x = C - HALF + (2 * HALF * i) / 40;
    outline.push([x, roofY(x)]);
  }
  outline.push([C + HALF, EAVE], [C - HALF, EAVE]);
  const FOLD = 0.6; // half-width of the front facet per px of drop from the peak
  poly(out, outline, (x, y) => {
    const span = (y - PEAK) * FOLD;
    const dx = Math.abs(x - C);
    if (y - roofY(x) < ROW * 0.9) return { fill: NAVY, o: 0.95, r: 1.6 }; // crisp roofline
    if (Math.abs(dx - span) < P * 0.5) return { fill: BLUE, o: 0.95, r: 1.6 }; // soft fold lines
    if (dx < span) return { fill: SOFT, o: 0.85, r: 1.55 }; // front facet catches the light
    return x < C ? { fill: BLUE, o: 0.8, r: 1.5 } : { fill: NAVY2, o: 0.8, r: 1.5 };
  });
  // Finial on the peak
  line(out, C, PEAK - 4, C, PEAK - 16, NAVY, 0.9, 1.5);

  // Podium with a row of arched openings under the eaves
  poly(out, [[34, 462], [256, 462], [256, 484], [34, 484]], (x, y) => {
    const bay = ((x - 34) % 22 + 22) % 22;
    const opening = y > 468 && bay > 6 && bay < 16;
    return opening ? null : { fill: NAVY, o: 0.7, r: 1.4 };
  });

  // Front minarets at the outer corners, rear pair set back (shorter, fainter)
  minaret(22, 484, 96, NAVY, 0.92);
  minaret(268, 484, 96, NAVY, 0.92);
  minaret(70, 462, 140, NAVY2, 0.42);
  minaret(220, 462, 140, NAVY2, 0.42);
  ground(out);
  return out;
}

function statueOfLiberty(): Dot[] {
  const out: Dot[] = [];
  const statue = (x: number) => (x < 140 ? { fill: SOFT, o: 0.95, r: 1.6 } : { fill: BLUE, o: 0.9, r: 1.6 });
  // Torch flame and cup
  ball(out, 103, 44, 9, { light: true, glint: 0.3 });
  line(out, 104, 55, 106, 64, BLUE, 0.95);
  // Raised arm, head and crown
  poly(out, [[100, 66], [111, 64], [131, 160], [118, 164]], statue);
  ball(out, 147, 126, 12);
  for (const a of [-160, -137, -113, -90, -67, -43, -20]) {
    const rad = (a * Math.PI) / 180;
    const [dx, dy] = [Math.cos(rad), Math.sin(rad)];
    line(out, 147 + dx * 15, 126 + dy * 15, 147 + dx * 30, 126 + dy * 30, BLUE, 0.9, 1.4);
  }
  // Tablet, robe
  poly(out, [[168, 168], [186, 160], [196, 222], [178, 230]], () => ({ fill: NAVY2, o: 0.9, r: 1.5 }));
  poly(out, [[121, 144], [173, 144], [182, 298], [110, 298]], statue);
  // Pedestal with cap, then the star-fort base
  poly(out, [[98, 290], [196, 290], [196, 300], [98, 300]], () => ({ fill: NAVY, o: 0.95, r: 1.5 }));
  poly(out, [[106, 300], [188, 300], [200, 462], [94, 462]], (x) => ({ fill: NAVY, o: x < 147 ? 0.88 : 0.68, r: 1.45 }));
  poly(out, [[46, 462], [248, 462], [262, 490], [32, 490]], () => ({ fill: NAVY2, o: 0.5, r: 1.3 }));
  ground(out);
  return out;
}

/* Sort each scene into rows so dot i in one scene pairs with a nearby-ranked
   dot in the next; pad shorter scenes with invisible copies so counts match. */
const RAW = [kuwaitTowers(), faisalMosque(), statueOfLiberty()].map((s) =>
  dedupe(s).sort((a, b) => a.y - b.y || a.x - b.x)
);
const N = Math.max(...RAW.map((s) => s.length));
const SCENES: Dot[][] = RAW.map((s) =>
  Array.from({ length: N }, (_, i) => (i < s.length ? s[i] : { ...s[Math.floor((i * s.length) / N)], o: 0, glint: undefined }))
);
/* Per-dot stagger: the new landmark builds from the ground up */
const DELAY = SCENES.map((s) => s.map((d) => Math.round(((BASE - d.y) / BASE) * 420 + (hash(d.x, d.y) % 180))));

export const LANDMARK_COUNT = SCENES.length;

export function DotLandmarks({ labels, className = "" }: { labels: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const clip = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);

  /* Advance on a steady beat, paused while off screen or in a background tab */
  useEffect(() => {
    if (reduce) return;
    let visible = true;
    const el = ref.current;
    const io = el
      ? new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
        })
      : null;
    if (el && io) io.observe(el);
    const id = setInterval(() => {
      if (visible && !document.hidden) setScene((s) => (s + 1) % SCENES.length);
    }, HOLD_MS);
    return () => {
      clearInterval(id);
      io?.disconnect();
    };
  }, [reduce]);

  const dots = SCENES[scene];
  const delays = DELAY[scene];

  return (
    <div ref={ref} className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden focusable="false">
        <defs>
          <clipPath id={clip}>
            {/* The first landmark rises from the ground on load */}
            <motion.rect
              x="0"
              width={W}
              height={H}
              initial={reduce ? false : { y: H }}
              animate={{ y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clip})`}>
          {dots.map((d, i) => (
            <circle
              key={i}
              r={1}
              className={d.glint !== undefined ? "dot-glint" : undefined}
              style={{
                transform: `translate(${d.x}px, ${d.y}px) scale(${d.r})`,
                fill: d.fill,
                opacity: d.o,
                transition: reduce
                  ? undefined
                  : `transform 1.5s cubic-bezier(0.16,1,0.3,1) ${delays[i]}ms, opacity 0.9s ease ${delays[i]}ms, fill 0.9s ease ${delays[i]}ms`,
                animationDelay: d.glint !== undefined ? `${d.glint}s` : undefined,
              }}
            />
          ))}
        </g>
      </svg>
      <div className="relative mt-3 h-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={scene}
            className="mono-label absolute inset-x-0 text-balance text-center text-[10px] leading-snug text-ink-3 sm:text-[11px]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5 }}
          >
            {labels[scene]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
