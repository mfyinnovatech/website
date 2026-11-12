import type { Locale } from "@/lib/i18n/config";
import { landingPagesEn, type LandingCopy } from "./landing-pages.en";
import { landingPagesAr } from "./landing-pages.ar";

export type { LandingCopy };

/* Market landing pages served at the site root: /<slug> and /ar/<slug> */
export const LANDINGS: Record<
  string,
  { market: "KW" | "US"; services: string[]; posts: string[]; odooApps?: boolean; clients?: string[] }
> = {
  "software-company-kuwait": {
    market: "KW",
    services: ["web-saas", "mobile", "erp-odoo", "ai-data", "automation-cloud", "finance-ops"],
    posts: ["saas-vs-custom-software-cost-ai-era", "erp-integrations-kuwait-knet-banks-ecommerce", "best-odoo-implementation-company-in-kuwait", "why-hr-payroll-implementations-go-over-budget"],
  },
  "odoo-partner-kuwait": {
    market: "KW",
    services: ["erp-odoo", "finance-ops", "automation-cloud", "ai-data"],
    posts: ["best-odoo-implementation-company-in-kuwait", "how-long-does-an-erp-implementation-take", "erp-integrations-kuwait-knet-banks-ecommerce", "how-to-plan-an-erp-budget"],
    odooApps: true,
  },
  "software-development-company-usa": {
    market: "US",
    services: ["web-saas", "mobile", "ai-data", "erp-odoo", "3d", "automation-cloud"],
    posts: ["saas-vs-custom-software-cost-ai-era", "how-long-does-an-erp-implementation-take", "how-to-plan-an-erp-budget", "ai-in-erp-2026-what-actually-works"],
    clients: ["ohs", "naas"],
  },
};

export const LANDING_SLUGS = Object.keys(LANDINGS);

export function getLanding(locale: Locale, slug: string): LandingCopy | undefined {
  return (locale === "ar" ? landingPagesAr : landingPagesEn)[slug];
}
