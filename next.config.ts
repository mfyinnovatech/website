import type { NextConfig } from "next";
import path from "node:path";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ["image/avif", "image/webp"] },
};

/* Vercel BotID: invisible bot check for the contact form (see src/instrumentation-client.ts) */
export default withBotId(nextConfig);
