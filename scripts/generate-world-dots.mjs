// Generates src/lib/world-map.json: dot-matrix land points + projected client markers.
// Run: node scripts/generate-world-dots.mjs
import fs from "node:fs";
import { createRequire } from "node:module";
import * as topojson from "topojson-client";
import { geoEqualEarth, geoContains } from "d3-geo";

const require = createRequire(import.meta.url);
const world = require("world-atlas/countries-110m.json");
const land = topojson.feature(world, world.objects.land);

const W = 1000, H = 520;
const projection = geoEqualEarth().fitExtent([[10, 10], [W - 10, H - 10]], land);

// Dot grid in projected space so spacing is visually even
const STEP = 7;
const dots = [];
for (let y = 10; y < H - 10; y += STEP) {
  for (let x = 10; x < W - 10; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!ll) continue;
    if (Math.abs(ll[1]) > 84) continue; // skip polar rows
    if (geoContains(land, ll)) dots.push([x, y]);
  }
}

// Client markers (approximate business-centre coordinates)
const markers = {
  usa: { label: "United States", lonlat: [-95.7, 39.5] },
  germany: { label: "Germany", lonlat: [10.4, 51.2] },
  uae: { label: "UAE · Dubai", lonlat: [55.0, 24.8] },
  kuwait: { label: "Kuwait", lonlat: [47.5, 29.3] },
  africa: { label: "Africa", lonlat: [20.0, 5.0] },
  australia: { label: "Australia", lonlat: [134.0, -25.5] },
  pakistan: { label: "Pakistan", lonlat: [69.3, 30.4] },
  canada: { label: "Canada", lonlat: [-98.0, 57.0] },
  greece: { label: "Greece", lonlat: [22.5, 39.2] },
  romania: { label: "Romania", lonlat: [25.0, 45.9] },
  saudi: { label: "Saudi Arabia", lonlat: [45.0, 24.0] },
  qatar: { label: "Qatar", lonlat: [51.2, 25.3] },
};
const projected = Object.fromEntries(
  Object.entries(markers).map(([k, m]) => {
    const [x, y] = projection(m.lonlat);
    return [k, { label: m.label, x: +x.toFixed(1), y: +y.toFixed(1) }];
  })
);

fs.writeFileSync(
  "src/lib/world-map.json",
  JSON.stringify({ width: W, height: H, dots: dots.map(([x, y]) => [+x.toFixed(0), +y.toFixed(0)]), markers: projected })
);
console.log("dots:", dots.length, "markers:", Object.keys(projected).join(","));
