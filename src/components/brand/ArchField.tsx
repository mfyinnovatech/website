"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Brand pattern 05 · Arch field
   Rounded-top bars from the "m" and "y" strokes. Bar width = gap,
   radius = width / 2, alternating heights 1 : 0.62. */
type Props = {
  bars?: number;
  color?: string;
  className?: string;
  animate?: boolean;
  height?: number; // px of the tall bar
  align?: "bottom" | "top";
};

export function ArchField({
  bars = 14,
  color = "var(--color-blue)",
  className = "",
  animate = true,
  height = 220,
  align = "bottom",
}: Props) {
  const reduce = useReducedMotion();
  const items = Array.from({ length: bars }, (_, i) => i);
  return (
    <div
      aria-hidden
      className={`pointer-events-none flex ${align === "bottom" ? "items-end" : "items-start"} gap-[var(--bar)] ${className}`}
      style={{ ["--bar" as string]: `calc(100% / ${bars * 2 - 1})`, height }}
    >
      {items.map((i) => {
        const tall = i % 2 === 0;
        const h = tall ? height : Math.round(height * 0.62);
        return (
          <motion.span
            key={i}
            className="block shrink-0"
            style={{
              width: "var(--bar)",
              background: color,
              borderRadius: align === "bottom" ? "999px 999px 0 0" : "0 0 999px 999px",
              transformOrigin: align === "bottom" ? "bottom" : "top",
              height: h,
            }}
            initial={animate && !reduce ? { scaleY: 0.15, opacity: 0.6 } : false}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.045 }}
          />
        );
      })}
    </div>
  );
}
