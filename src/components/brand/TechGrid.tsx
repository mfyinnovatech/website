/* Brand pattern 05 · Tech grid
   80px grid, 1px lines, 6px nodes at intersections, one diagonal at 62°. */
type Props = {
  dark?: boolean;
  diagonal?: boolean;
  className?: string;
  fade?: "b" | "t" | "radial" | "none";
};

export function TechGrid({ dark, diagonal = true, className = "", fade = "b" }: Props) {
  const fadeCls =
    fade === "b" ? "mask-fade-b" : fade === "t" ? "mask-fade-t" : fade === "radial" ? "mask-radial" : "";
  const line = dark ? "rgba(255,255,255,0.22)" : "rgba(0,48,232,0.35)";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${dark ? "tech-grid-dark" : "tech-grid"} ${fadeCls}`} />
      {diagonal && (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
          {/* 62° from horizontal, running up and to the right */}
          <line x1="-40" y1="640" x2="380" y2="-150" stroke={line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
    </div>
  );
}
