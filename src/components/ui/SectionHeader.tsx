import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  num?: string;
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  dark?: boolean;
  align?: "left" | "split";
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  num,
  eyebrow,
  title,
  text,
  dark,
  align = "split",
  action,
  className = "",
}: Props) {
  const titleCls = dark ? "text-white" : "text-ink";
  const textCls = dark ? "text-white/65" : "text-ink-2";
  return (
    <div
      className={`grid gap-6 ${align === "split" ? "lg:grid-cols-12 lg:items-end" : ""} ${className}`}
    >
      <Reveal className={align === "split" ? "lg:col-span-7" : ""}>
        <span
          className={`inline-flex items-center rounded-lg px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] ${
            dark ? "bg-navy-2 text-blue-soft" : "bg-cloud text-blue ring-1 ring-navy/[0.06]"
          }`}
        >
          {num ? `${num} · ` : ""}
          {eyebrow}
        </span>
        <h2 className={`mt-7 max-w-[18ch] font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[4rem] ${titleCls}`}>{title}</h2>
      </Reveal>
      {(text || action) && (
        <Reveal
          delay={0.1}
          className={`${align === "split" ? "lg:col-span-5 lg:pb-1" : ""} flex flex-col gap-5`}
        >
          {text && <p className={`text-lead max-w-md ${textCls}`}>{text}</p>}
          {action}
        </Reveal>
      )}
    </div>
  );
}
