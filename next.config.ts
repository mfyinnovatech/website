import type { NextConfig } from "next";
import path from "node:path";
import { withBotId } from "botid/next/config";

/* Security headers for every route. The CSP only restricts framing, plugins,
   <base> and form targets, so it cannot break scripts, styles, embeds or analytics. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

/* Vercel BotID: invisible bot check for the contact form (see src/instrumentation-client.ts) */
export default withBotId(nextConfig);
