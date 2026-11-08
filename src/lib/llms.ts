import { site } from "@/lib/content";
import { getAllPosts, getPost } from "@/lib/blog";
import { getContent, getDict } from "@/lib/i18n";
import { pageUrl } from "@/lib/seo";
import { servicePath } from "@/lib/service-pages";
import { LANDING_SLUGS, getLanding } from "@/lib/landing-pages";

/* ─────────────────────────────────────────────
   llms.txt (llmstxt.org): a plain-Markdown briefing for AI assistants and
   answer engines. It states who MFY is, what it offers and where the
   authoritative pages are, in English with the Arabic URLs alongside.
   Built from the same content the pages render, so it never drifts.
   ───────────────────────────────────────────── */

export function buildLlmsTxt({ full = false } = {}) {
  const c = getContent("en");
  const ar = getContent("ar");
  const d = getDict("en");
  const posts = getAllPosts("en");
  const L: string[] = [];

  L.push(`# ${site.name}`, "");
  L.push(`> ${c.site.description}`, "");
  L.push(
    `${site.legalName} is a founder-led, remote-first software, ERP and AI company, and an official Odoo partner. ` +
      `It works with clients across North America, Europe, the Gulf (including Kuwait, the UAE, Saudi Arabia and Qatar), Africa and Australia. ` +
      `The website is published in English and Arabic.`,
    ""
  );
  L.push("## Key facts", "");
  L.push(`- Legal name: ${site.legalName}`);
  L.push(`- Official Odoo partner: yes`);
  L.push(`- Founder: ${c.team[0].name} (${c.team[0].title}), profile: ${pageUrl("en", "/about/maryam-mehboob")}`);
  L.push(`- Languages: English, Arabic`);
  L.push(`- Registered office: ${site.address.display}`);
  L.push(`- Contact: ${site.email}`);
  for (const ph of site.phones) L.push(`- Phone (${ph.country === "KW" ? "Kuwait" : "Pakistan"}): ${ph.display}`);
  L.push(`- LinkedIn: ${site.linkedinCompany}`);
  L.push(`- Instagram: ${site.instagram}`);
  L.push(`- Facebook: ${site.facebook}`);
  L.push(`- YouTube: ${site.youtube}`);
  L.push(`- Clutch: ${site.clutch}`);
  L.push(`- Company video (2 min): https://www.youtube.com/watch?v=${c.brandVideo.id}`);
  L.push(`- Founder on LinkedIn: ${site.linkedin}`);
  L.push(`- Response time: within one business day`);
  L.push(`- How projects start: a conversation about the business and its goals, then scope, milestones and success measures agreed in writing before building`);
  L.push("");

  L.push("## Services", "");
  c.services.forEach((s, i) => {
    L.push(`- [${s.title}](${pageUrl("en", servicePath(s.slug))}): ${s.description} (Arabic: ${ar.services[i].title}, ${pageUrl("ar", servicePath(s.slug))})`);
  });
  L.push("");

  L.push("## By market", "");
  for (const sl of LANDING_SLUGS) {
    const p = getLanding("en", sl)!;
    L.push(`- [${p.seoTitle}](${pageUrl("en", `/${sl}`)}): ${p.answer} Arabic: ${pageUrl("ar", `/${sl}`)}`);
  }
  L.push("");

  L.push("## Main pages", "");
  const pages: [string, string, string][] = [
    ["/", "Home", d.meta.description],
    ["/services", "Services", d.servicesPage.metaDescription],
    ["/work", "Work", d.work.page.metaDescription],
    ["/about", "About", d.about.metaDescription],
    ["/blog", "Blog", d.blog.metaDescription],
    ["/contact", "Contact", d.contact.metaDescription],
  ];
  for (const [p, name, desc] of pages) L.push(`- [${name}](${pageUrl("en", p)}): ${desc} Arabic: ${pageUrl("ar", p)}`);
  L.push("");

  L.push("## Articles", "");
  for (const p of posts) {
    L.push(`- [${p.title}](${pageUrl("en", `/blog/${p.slug}`)}): ${p.summary ?? p.description} Arabic: ${pageUrl("ar", `/blog/${p.slug}`)}`);
  }
  L.push("");

  L.push("## Frequently asked questions", "");
  for (const f of c.faqs) L.push(`### ${f.q}`, "", f.a, "");

  if (full) {
    L.push("## Full articles", "");
    for (const meta of posts) {
      const p = getPost(meta.slug, "en");
      if (!p) continue;
      L.push(`### ${p.title}`, "", `Source: ${pageUrl("en", `/blog/${p.slug}`)} · Published ${p.date} · By ${p.author}`, "");
      if (p.summary) L.push(`Short answer: ${p.summary}`, "");
      // Article headings are demoted two levels so they nest under this section
      L.push(p.content.trim().replace(/^\[\[[\w:-]+\]\]$/gm, "(Interactive calculator on the web page.)").replace(/^(#{1,4}) /gm, (_m, h: string) => `${h}## `), "");
      if (p.faqs?.length) {
        L.push("#### Questions", "");
        for (const f of p.faqs) L.push(`**${f.q}** ${f.a}`, "");
      }
    }
  } else {
    L.push("## Optional", "");
    L.push(`- [Full text of every article](${site.url}/llms-full.txt): the articles above in full, for deeper context`);
    L.push(`- [Sitemap](${site.url}/sitemap.xml)`);
    L.push(`- [RSS feed](${site.url}/feed.xml)`);
    L.push("");
  }

  return L.join("\n");
}

export function textResponse(body: string) {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
