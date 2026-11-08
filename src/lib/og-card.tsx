import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Branded 1200×630 share cards for blog posts, service pages and market pages.
   Arabic pages use the default share image: the image renderer cannot shape Arabic script. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const root = process.cwd();
const assets = Promise.all([
  readFile(join(root, "assets/fonts/Sora-700.woff")),
  readFile(join(root, "assets/fonts/SourceSans3-600.woff")),
  readFile(join(root, "public/brand/logo-white.png"), "base64"),
  readFile(join(root, "public/og-default.png"), "base64"),
]);

export async function ogCard({ eyebrow, title, locale }: { eyebrow: string; title: string; locale: string }) {
  const [sora, source, logo, fallback] = await assets;

  if (locale === "ar") {
    return new ImageResponse(
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img src={`data:image/png;base64,${fallback}`} width={1200} height={630} />,
      ogSize,
    );
  }

  const size = title.length > 72 ? 54 : title.length > 48 ? 62 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          color: "#fff",
          fontFamily: "Source",
          background: "radial-gradient(900px 600px at 90% -10%, #0b2a9e 0%, rgba(11,42,158,0) 60%), #061030",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={`data:image/png;base64,${logo}`} height={66} width={121} />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#aeb9e3", textTransform: "uppercase" }}>
            Software · ERP · AI
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, letterSpacing: 5, color: "#6b8cff", textTransform: "uppercase" }}>
            <div style={{ width: 44, height: 4, background: "#0030e8", marginRight: 18 }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily: "Sora", fontSize: size, lineHeight: 1.08, letterSpacing: -2, marginTop: 22, maxWidth: 1010 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 44, fontSize: 24, color: "#aeb9e3" }}>
          <div style={{ display: "flex" }}>mfyinnova.tech</div>
          <div style={{ display: "flex", color: "#fff" }}>Kuwait · USA · Worldwide</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sora", data: sora, weight: 700, style: "normal" },
        { name: "Source", data: source, weight: 600, style: "normal" },
      ],
    },
  );
}
