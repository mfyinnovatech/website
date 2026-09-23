"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 font-display text-[15px] font-semibold text-navy"
    >
      <span className="border-b border-navy pb-px transition-colors group-hover:border-blue group-hover:text-blue">
        Back to top
      </span>
      <ArrowUp size={15} strokeWidth={2.2} className="transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
