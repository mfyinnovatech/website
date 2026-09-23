/* Brand pattern 05 · Monogram tile
   The mark repeated in a staggered grid, one color, 8–12% opacity.
   Tile 420px, row offset 50%. */
type Props = {
  ink?: "white" | "blue" | "navy";
  opacity?: number;
  tile?: number;
  className?: string;
};

export function MonogramTile({ ink = "white", opacity = 0.1, tile = 420, className = "" }: Props) {
  const w = tile;
  const h = Math.round(tile * 0.749);
  const rowH = Math.round(h * 1.35);
  const id = `mono-${ink}-${tile}`;
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={id} width={w * 2} height={rowH * 2} patternUnits="userSpaceOnUse">
          <image href={`/brand/mark-${ink}.png`} x={w * 0.25} y={rowH * 0.15} width={w * 0.5} height={h * 0.5} />
          <image href={`/brand/mark-${ink}.png`} x={w * 1.25} y={rowH * 0.15} width={w * 0.5} height={h * 0.5} />
          <image href={`/brand/mark-${ink}.png`} x={w * 0.75} y={rowH * 1.15} width={w * 0.5} height={h * 0.5} />
          <image href={`/brand/mark-${ink}.png`} x={w * -0.25} y={rowH * 1.15} width={w * 0.5} height={h * 0.5} />
          <image href={`/brand/mark-${ink}.png`} x={w * 1.75} y={rowH * 1.15} width={w * 0.5} height={h * 0.5} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
