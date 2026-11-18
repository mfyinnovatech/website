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
    posts: ["knet-payment-gateway-integration-kuwait", "odoo-vs-sap-business-one-vs-business-central-gcc", "saas-vs-custom-software-cost-ai-era", "erp-integrations-kuwait-knet-banks-ecommerce"],
  },
  "odoo-partner-kuwait": {
    market: "KW",
    services: ["erp-odoo", "finance-ops", "automation-cloud", "ai-data"],
    posts: ["odoo-implementation-cost-kuwait-gcc", "best-odoo-implementation-company-in-kuwait", "odoo-vs-sap-business-one-vs-business-central-gcc", "knet-payment-gateway-integration-kuwait"],
    odooApps: true,
  },
  "software-development-company-usa": {
    market: "US",
    services: ["web-saas", "mobile", "ai-data", "erp-odoo", "3d", "automation-cloud"],
    posts: ["us-distributor-quickbooks-to-erp-case-study", "saas-vs-custom-software-cost-ai-era", "how-long-does-an-erp-implementation-take", "ai-in-erp-2026-what-actually-works"],
    clients: ["ohs", "naas"],
  },
  "erp-for-wholesale-distributors": {
    market: "US",
    services: ["erp-odoo", "automation-cloud", "finance-ops", "ai-data"],
    posts: ["us-distributor-quickbooks-to-erp-case-study", "how-long-does-an-erp-implementation-take", "how-to-plan-an-erp-budget", "saas-vs-custom-software-cost-ai-era"],
    odooApps: true,
  },
};

export const LANDING_SLUGS = Object.keys(LANDINGS);

export function getLanding(locale: Locale, slug: string): LandingCopy | undefined {
  return (locale === "ar" ? landingPagesAr : landingPagesEn)[slug];
}
