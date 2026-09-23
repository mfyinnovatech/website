type Props = {
  items: string[];
  dark?: boolean;
  className?: string;
};

export function Marquee({ items, dark, className = "" }: Props) {
  const list = [...items, ...items];
  return (
    <div
      className={`mask-fade-x relative overflow-hidden ${className}`}
      aria-label={items.join(", ")}
      role="marquee"
    >
      <div className="animate-marquee flex w-max items-center">
        {list.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className={`mono-label flex items-center gap-8 pr-8 ${dark ? "text-white/55" : "text-ink-3"}`}
          >
            {item}
            <span className={`h-3 w-px ${dark ? "bg-white/25" : "bg-line-2"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
