import type { ReactNode } from "react";

/* Every section after the hero sits in a rounded stage on the Cloud page ground,
   with a uniform 16px gap between stages (AgencyAI rhythm). */
export function Stage({
  id,
  tone = "white",
  children,
  className = "",
  ariaLabel,
}: {
  id?: string;
  tone?: "white" | "navy" | "cloud";
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const bg = tone === "navy" ? "bg-navy text-white" : tone === "cloud" ? "bg-cloud" : "bg-white";
  return (
    <section id={id} aria-label={ariaLabel} className="px-4 pt-4">
      <div
        data-surface={tone === "navy" ? "dark" : undefined}
        className={`relative mx-auto max-w-[1408px] overflow-hidden rounded-[40px] px-6 py-16 sm:px-10 lg:px-14 lg:py-24 ${bg} ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
