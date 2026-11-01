import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/* Everyone may crawl the public site. AI search and answer crawlers are named
   explicitly so there is no doubt they are welcome: being readable by them is
   how the site gets cited in ChatGPT, Perplexity, Claude, Gemini and Copilot. */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User",
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Bing and Copilot
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "Amazonbot",
  "CCBot", // Common Crawl, used to train many models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
