"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/* Raised tiles on the 80px tech grid: a few cells lifted off the page with a soft
   extrusion, aligned to the grid lines. Two motions on top:
   - depth parallax against the cursor
   - a pulse that travels along a grid row and lights each tile it passes
   [col, row, depth] */
const cells: [number, number, number][] = [
  [13, 1, 1], [15, 2, 2], [17, 0, 1], [14, 4, 2], [16, 5, 1], [13, 6, 1], [15, 7, 2], [17, 3, 1], [1, 0, 1],
];
const pulseRows = [1, 4, 6, 2, 5];
const PULSE_S = 3.2;
const PERIOD_MS = 5200;

export function GridTiles({ mobile = 3 }: { mobile?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1440);
  const [pulse, setPulse] = useState<{ row: number; key: number }>({ row: pulseRows[0], key: 0 });

  // cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    window.addEventListener("resize", measure);
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my, reduce]);

  useEffect(() => {
    if (reduce) return;
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      setPulse({ row: pulseRows[k % pulseRows.length], key: k });
    }, PERIOD_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* travelling signal along one grid row */}
      {!reduce && (
        <motion.div
          key={pulse.key}
          className="absolute hidden h-px lg:block"
          style={{
            top: pulse.row * 80,
            width: 160,
            background: "linear-gradient(90deg, rgba(0,48,232,0) 0%, rgba(0,48,232,0.9) 60%, rgba(0,48,232,0) 100%)",
          }}
          initial={{ x: -160, opacity: 0 }}
          animate={{ x: width + 160, opacity: [0, 1, 1, 0] }}
          transition={{ duration: PULSE_S, ease: "linear", opacity: { times: [0, 0.08, 0.92, 1], duration: PULSE_S } }}
        />
      )}

      {cells.map(([c, r, d], i) => (
        <Tile
          key={i}
          col={c}
          row={r}
          depth={d}
          index={i}
          hidden={i >= mobile}
          sx={sx}
          sy={sy}
          lit={!reduce && pulse.row === r}
          litKey={pulse.key}
          litDelay={((c * 80 + 40 + 160) / (width + 320)) * PULSE_S}
          reduce={!!reduce}
        />
      ))}
    </div>
  );
}

function Tile({
  col,
  row,
  depth,
  index,
  hidden,
  sx,
  sy,
  lit,
  litKey,
  litDelay,
  reduce,
}: {
  col: number;
  row: number;
  depth: number;
  index: number;
  hidden: boolean;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  lit: boolean;
  litKey: number;
  litDelay: number;
  reduce: boolean;
}) {
  const px = useTransform(sx, (v) => v * -8 * depth);
  const py = useTransform(sy, (v) => v * -6 * depth);
  return (
    <motion.div
      className={`absolute ${hidden ? "hidden lg:block" : ""}`}
      style={{ left: col * 80, top: row * 80, width: 80, height: 80, x: px, y: py }}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 + index * 0.12 }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
      >
        <div className="absolute inset-0 rounded-[6px] bg-blue/[0.14]" style={{ transform: `translate(${4 * depth}px, ${5 * depth}px)` }} />
        <div className="absolute inset-0 rounded-[6px] bg-blue/[0.08]" style={{ transform: `translate(${2 * depth}px, ${2.5 * depth}px)` }} />
        <motion.div
          key={lit ? litKey : "idle"}
          className="absolute inset-0 rounded-[6px] border border-blue/15"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #eef2fc 55%, #e3e9fb 100%)",
            boxShadow:
              "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,48,232,0.08), 10px 14px 30px -14px rgba(6,16,48,0.28)",
          }}
          animate={
            lit
              ? { y: [0, -10, 0], boxShadow: [
                  "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,48,232,0.08), 10px 14px 30px -14px rgba(6,16,48,0.28)",
                  "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,48,232,0.2), 0 0 0 1px rgba(0,48,232,0.45), 14px 22px 40px -14px rgba(0,48,232,0.45)",
                  "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,48,232,0.08), 10px 14px 30px -14px rgba(6,16,48,0.28)",
                ] }
              : undefined
          }
          transition={{ duration: 0.9, ease: "easeOut", delay: litDelay }}
        />
      </motion.div>
    </motion.div>
  );
}
