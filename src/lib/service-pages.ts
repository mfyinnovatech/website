import type { Locale } from "@/lib/i18n/config";
import { servicePagesEn, type ServicePageCopy } from "./service-pages.en";
import { servicePagesAr } from "./service-pages.ar";

export type { ServicePageCopy };

/* URL segment for each service's own page, chosen for the search phrase it targets:
   /services/<segment> (English) and /ar/services/<segment> (Arabic). */
export const SERVICE_PATHS: Record<string, string> = {
  "web-saas": "custom-software-development",
  mobile: "mobile-app-development",
  "ai-data": "ai-data-solutions",
  "erp-odoo": "erp-implementation",
  "3d": "3d-product-animation",
  "automation-cloud": "automation-cloud-integrations",
  "finance-ops": "finance-operations",
  growth: "digital-growth",
};

/* Related services shown at the foot of each page */
export const RELATED: Record<string, string[]> = {
  "web-saas": ["mobile", "ai-data", "automation-cloud"],
  mobile: ["web-saas", "ai-data", "growth"],
  "ai-data": ["erp-odoo", "automation-cloud", "web-saas"],
  "erp-odoo": ["finance-ops", "ai-data", "automation-cloud"],
  "3d": ["growth", "web-saas", "mobile"],
  "automation-cloud": ["erp-odoo", "ai-data", "web-saas"],
  "finance-ops": ["erp-odoo", "ai-data", "automation-cloud"],
  growth: ["3d", "web-saas", "mobile"],
};

/* Which proof block each page shows */
export const PROOF: Record<string, "videos" | "stories" | "quotes"> = {
  "web-saas": "stories",
  mobile: "stories",
  "ai-data": "quotes",
  "erp-odoo": "quotes",
  "3d": "videos",
  "automation-cloud": "quotes",
  "finance-ops": "quotes",
  growth: "stories",
};

/* Articles each service page links to (hub -> supporting guides). The first service listing a
   post is also the service that post links back to. */
export const SERVICE_POSTS: Record<string, string[]> = {
  "erp-odoo": [
    "odoo-vs-sap-business-one-vs-business-central-gcc",
    "how-long-does-an-erp-implementation-take",
    "best-odoo-implementation-company-in-kuwait",
    "how-to-plan-an-erp-budget",
  ],
  "web-saas": ["saas-vs-custom-software-cost-ai-era"],
  "ai-data": ["ai-in-erp-2026-what-actually-works", "saas-vs-custom-software-cost-ai-era"],
  "automation-cloud": ["erp-integrations-kuwait-knet-banks-ecommerce", "ai-in-erp-2026-what-actually-works"],
  "finance-ops": ["why-hr-payroll-implementations-go-over-budget", "how-to-plan-an-erp-budget"],
};

const POST_SERVICE: Record<string, string> = {
  "why-erp-projects-go-over-budget": "erp-odoo",
  "erp-project-over-budget-how-to-recover": "erp-odoo",
  "saas-vs-custom-software-cost-ai-era": "web-saas",
  "ai-in-erp-2026-what-actually-works": "ai-data",
  "erp-integrations-kuwait-knet-banks-ecommerce": "automation-cloud",
  "why-hr-payroll-implementations-go-over-budget": "finance-ops",
};

/* The service page a blog post links back to */
export function serviceForPost(postSlug: string): string | undefined {
  return POST_SERVICE[postSlug] ?? Object.keys(SERVICE_POSTS).find((k) => SERVICE_POSTS[k].includes(postSlug));
}

export const servicePath = (slug: string) => `/services/${SERVICE_PATHS[slug]}`;

export function slugForPath(segment: string) {
  return Object.keys(SERVICE_PATHS).find((k) => SERVICE_PATHS[k] === segment);
}

export function getServicePage(locale: Locale, slug: string): ServicePageCopy {
  return (locale === "ar" ? servicePagesAr : servicePagesEn)[slug];
}
