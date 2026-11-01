import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { site } from "@/lib/content";

/* IndexNow (indexnow.org): tells Bing, and through it ChatGPT search and Copilot,
   Yandex, Seznam and others, which URLs changed, so they re-crawl within minutes.
   Runs daily from Vercel Cron (vercel.json) and submits every sitemap URL whose
   lastmod falls in the last 48 hours. The key file lives at /467111c5678240f7b3a831eb6cf7607b.txt. */

export const dynamic = "force-dynamic";

const KEY = "467111c5678240f7b3a831eb6cf7607b";
const WINDOW_MS = 48 * 60 * 60 * 1000;

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret) return req.headers.get("authorization") === `Bearer ${secret}`;
  return (req.headers.get("user-agent") ?? "").includes("vercel-cron");
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const all = new URL(req.url).searchParams.get("all") === "1";
  const cutoff = Date.now() - WINDOW_MS;
  const urlList = sitemap()
    .filter((e) => all || (e.lastModified && new Date(e.lastModified).getTime() >= cutoff))
    .map((e) => e.url);

  if (urlList.length === 0) return NextResponse.json({ ok: true, submitted: 0 });

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(site.url).host,
      key: KEY,
      keyLocation: `${site.url}/${KEY}.txt`,
      urlList,
    }),
  });
  console.info(`[indexnow] submitted ${urlList.length} URLs: HTTP ${res.status}`);
  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urlList.length });
}
