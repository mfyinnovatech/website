# MFY Innovatech SEO content plan

How this plan works: each article is written in English and Arabic, answers a question people actually search (checked against Google autocomplete for the US, Kuwait, Saudi Arabia and the UAE in November 2026), and links to the matching service page. The aim is leads, not traffic for its own sake, so every topic has buyer intent.

Status: `done`, `next`, or blank (queued). Work top to bottom inside each priority band.

## Priority 1: high intent, low competition, fits a service

| # | Article | Market | Service page | Search evidence | Status |
|---|---|---|---|---|---|
| 1 | KNET payment gateway integration: how it works, costs and timelines for Kuwaiti businesses | KW | automation-cloud, web-saas | "knet payment gateway integration / api / test card" | done |
| 1b | How to choose a software company in Kuwait (Arabic-first: "افضل شركة برمجة بالكويت") | KW | web-saas, mobile | Search Console: "شركة برمجة" (pos 6), "افضل شركة برمجة بالكويت", "software development companies in kuwait", "erp software company kuwait" | next |
| 2 | How much does it cost to build an app in 2026 (and how much AI really saves) | US, GCC | mobile | "how much does it cost to build an app with ai", "...for my business" | |
| 3 | ZATCA e-invoicing Phase 2: requirements and ERP integration checklist | SA, GCC | finance-ops, erp-odoo | "zatca e-invoicing requirements / integration / waves" | |
| 4 | Odoo vs QuickBooks: when a growing US company should switch | US | erp-odoo | "odoo vs quickbooks (online / enterprise)" | |
| 5 | Mobile app development in Kuwait: cost, timeline and how to choose a company | KW | mobile | "mobile app development company kuwait" | |
| 6 | UAE e-invoicing 2027: timeline, requirements and what your ERP must do | AE | finance-ops, erp-odoo | "uae e-invoicing timeline / requirements / asp" | |
| 7 | Zapier vs Make vs n8n: which automation tool fits your business in 2026 | US, GCC | automation-cloud | "zapier vs make vs n8n (pricing)" | |
| 8 | NetSuite alternatives for small and mid-sized businesses | US | erp-odoo | "netsuite alternatives for small business" | |

## Priority 2

| # | Article | Market | Service page | Search evidence | Status |
|---|---|---|---|---|---|
| 9 | Custom software development cost in 2026: USA, Dubai, Kuwait compared | US, GCC | web-saas | "custom software development cost 2026 / in usa / in dubai" | |
| 10 | Best accounting software in Kuwait (KWD, Arabic, payroll) | KW | finance-ops | "best accounting software in kuwait" | |
| 11 | ERP for wholesale distributors: what to look for | US | erp-odoo | "erp for wholesale distributors" | |
| 12 | AI automation for small business: 10 use cases that pay back | US, GCC | ai-data | "ai automation for business owners / operations" | |
| 13 | Website development price in Kuwait: what you should pay for | KW | web-saas, growth | "website development price in kuwait" | |
| 14 | 3D product animation cost: what drives the price | US, GCC | 3d | "3d product animation cost / price" | |
| 15 | Building an e-commerce store in Kuwait: platforms, KNET and delivery | KW | web-saas, automation-cloud | "kuwait ecommerce platform / website" | |
| 16 | Custom CRM vs Salesforce: when building your own makes sense | US | web-saas | "custom crm vs salesforce" | |

## Priority 3

| # | Article | Market | Service page | Status |
|---|---|---|---|---|
| 17 | App development cost in Saudi Arabia and Dubai | SA, AE | mobile | |
| 18 | Outsourced bookkeeping on your ERP: what it costs and what you get | US | finance-ops | |
| 19 | Best ERP for Saudi companies (ZATCA-ready) | SA | erp-odoo | |
| 20 | Kuwait payroll in your ERP: end-of-service indemnity, leave and PIFSS | KW | finance-ops | |
| 21 | Arabic and English apps: building RTL properly | GCC | mobile, web-saas | |
| 22 | Digital marketing for B2B companies in Kuwait: what works | KW | growth | |

## Rules for every article

- Answer the search question in the first paragraph and the "short answer" box; then tables, steps and FAQs.
- Facts with sources. No MFY pricing, payment terms or turnaround promises. Industry ranges are fine when sourced or clearly labelled as typical.
- MFY is a team led by the founder; never "Maryam does everything".
- English and Arabic versions; add each new post to `SERVICE_POSTS` in `src/lib/service-pages.ts` and to the relevant landing page `posts` list.
- After publishing: IndexNow ping, Search Console indexing request (EN + AR), and a carousel for LinkedIn, Facebook and Instagram when the topic suits it.

## Search Console question filter

Saved view (bookmark it): Performance > Query > Custom (regex), matching question and buying-intent words in English and Arabic:

`(?i)^(who|what|where|when|why|how|which|is|are|can|does|do|should|will)\b|\b(vs|versus|cost|costs|price|pricing|best|top|alternative|alternatives|compare|comparison|guide|checklist|requirements)\b|(كيف|لماذا|ما هو|ما هي|كم|أفضل|افضل|مقارنة|سعر|تكلفة|متطلبات)`

Every week, add any new question queries without a matching article to this plan.

## Weekly CTR review

Each week, read Search Console Performance (last 28 days). For pages with impressions but CTR under 5% at positions 1–15, rewrite the search title and description to match the exact query wording, and add a section that answers the query if it is missing.

## Backlinks (later)

Directory profiles done: Clutch, GoodFirms. Later: Kuwait business directories and chambers, guest articles on GCC business and tech sites, partner pages (Odoo app store, KNET/payment partners), and the US distributor case study as a link-worthy asset.
