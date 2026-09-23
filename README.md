# MFY Innovatech — website

Marketing site for [MFY Innovatech](https://mfyinnova.tech), an official Odoo partner and software studio.

Built with Next.js 16 (App Router), Tailwind CSS v4 and Framer Motion. Fonts (Sora, Source Sans 3, DM Mono) are self-hosted through `next/font`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `src/lib/content.ts` — every piece of site copy: services, team, clients, testimonials, presence, tools.
- `content/blog/*.md` — blog posts (Markdown with frontmatter). Add a file, push, and the post, sitemap and RSS update.
- `src/components/sections/*` — home-page sections in display order.
- `public/brand`, `public/clients`, `public/team`, `public/work`, `public/testimonials`, `public/tools` — assets.
- `scripts/generate-world-dots.mjs` — regenerates the presence map data.

## Contact form

`POST /api/contact` sends mail over SMTP. Copy `.env.example` to `.env.local` and fill in the values (on Vercel, add the same variables in Project Settings → Environment Variables). Without them the form falls back to opening the visitor's mail app.

## Deploy

Push to `main`; Vercel builds and deploys automatically. Preview deployments are created for every branch.
