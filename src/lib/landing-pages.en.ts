/* Market landing pages — English. Facts only from what the site already states
   or verified public sources; no pricing or payment terms. */

export type LandingCopy = {
  seoTitle: string;
  metaDescription: string; // ≤ 160 chars
  eyebrow: string;
  h1: string;
  lead: string;
  answer: string; // direct answer, quoted by answer engines
  pointsLabel: string;
  pointsTitle: string;
  points: { title: string; text: string }[];
  servicesTitle: string;
  faqs: { q: string; a: string }[];
};

export const landingPagesEn: Record<string, LandingCopy> = {
  "software-company-kuwait": {
    seoTitle: "Software Company in Kuwait: Custom Software, Apps & ERP",
    metaDescription:
      "MFY Innovatech builds custom software, mobile apps, ERP and AI for businesses in Kuwait, with KWD accounting, Arabic documents and WhatsApp support.",
    eyebrow: "Kuwait",
    h1: "A software company for Kuwaiti businesses that need it done right.",
    lead: "Custom software, iOS and Android apps, ERP, HR and payroll systems and AI for companies in Kuwait, from a team that works in your hours and answers on WhatsApp.",
    answer:
      "MFY Innovatech is a software company serving businesses in Kuwait with custom web and mobile software, ERP implementation as an official Odoo partner, HR and payroll systems, AI and automation, and 3D product animation. We set up Kuwaiti dinar accounting to three decimals, issue Arabic and English documents, connect KNET payments, and support clients in Kuwaiti working hours by phone, email and WhatsApp on +965 5566 3826.",
    pointsLabel: "Built for Kuwait",
    pointsTitle: "The details Kuwaiti companies need, set up from day one.",
    points: [
      { title: "Kuwaiti dinar accounting", text: "Three-decimal precision for the 1,000-fils dinar, multi-currency purchasing in USD, EUR and AED, and rounding checked on invoices, payments and bank statements." },
      { title: "Arabic and English", text: "Bilingual quotations, invoices and reports, Arabic interfaces with right-to-left layouts, and Arabic names and addresses handled in your data." },
      { title: "Kuwait payroll rules", text: "End-of-service indemnity accruals, leave entitlements and PIFSS contributions for Kuwaiti employees, configured as payroll rules and checked with a parallel run." },
      { title: "KNET and local payments", text: "KNET and card payments connected through your bank or a gateway such as MyFatoorah or Tap, with each payment matched to its invoice in your ERP." },
    ],
    servicesTitle: "What we build for companies in Kuwait.",
    faqs: [
      { q: "Is MFY Innovatech based in Kuwait?", a: "MFY Innovatech is a remote-first company registered in the United States that serves clients in Kuwait and across the GCC. You can reach us on a Kuwait number and WhatsApp, +965 5566 3826, and we agree meeting hours that overlap with your working week." },
      { q: "Can you build software and apps in Arabic?", a: "Yes. Interfaces, documents and reports can be in Arabic, English or both, with right-to-left layouts wherever Arabic is used." },
      { q: "Do you implement ERP for Kuwaiti companies?", a: "Yes. MFY Innovatech is an official Odoo partner and implements ERP for Kuwaiti companies with Kuwaiti dinar accounting, bilingual documents and Kuwait payroll rules set up before go-live." },
      { q: "Which payment gateways do you integrate in Kuwait?", a: "KNET and card payments, either directly through your acquiring bank or through gateways such as MyFatoorah or Tap. We connect them to your website, app and ERP so payments and refunds reconcile automatically." },
      { q: "How do we start a project?", a: "Message us on WhatsApp, call, email or send the contact form. The first conversation is about your business and goals, and the scope and milestones are agreed in writing before anything is built." },
    ],
  },
  "odoo-partner-kuwait": {
    seoTitle: "Odoo Partner Kuwait: Odoo ERP Implementation & Support",
    metaDescription:
      "Odoo partner in Kuwait for Odoo ERP implementation, custom modules and support: KWD accounting, Arabic documents, Kuwait payroll and KNET. Also UAE and KSA.",
    eyebrow: "Odoo partner · Kuwait",
    h1: "Your Odoo partner in Kuwait, from the first workshop to month-end close.",
    lead: "An official Odoo partner implementing, customising and supporting Odoo for Kuwaiti companies, with the accounting, Arabic and payroll details right from day one.",
    answer:
      "MFY Innovatech is an official Odoo partner serving companies in Kuwait. We implement and support Odoo for sales, inventory, purchasing, accounting, manufacturing, HR and payroll, set up three-decimal Kuwaiti dinar accounting and bilingual documents, connect KNET payments, and build custom Odoo modules and integrations, and keep phase one close to standard Odoo so you go live sooner. We also implement Odoo for companies in the UAE, Saudi Arabia, Qatar and Bahrain. Talk to us on WhatsApp at +965 5566 3826.",
    pointsLabel: "Why companies choose us",
    pointsTitle: "An Odoo partner that also keeps the books.",
    points: [
      { title: "Official Odoo partner", text: "Trained on Odoo, with access to Odoo's partner support when something in the core product needs attention." },
      { title: "Kuwait-ready configuration", text: "Kuwaiti dinar to three decimals, bilingual Arabic and English templates, KNET payments and Kuwait payroll rules, set up before the first transaction." },
      { title: "A written, phased scope", text: "Apps, integrations, data to migrate and what done means for each phase, written down before configuration starts, with phase one kept close to standard." },
      { title: "Support after go-live", text: "We stay through the first month-end close and beyond: new apps, version upgrades, and a finance team that can run the books inside Odoo." },
    ],
    servicesTitle: "Services around your Odoo system.",
    faqs: [
      { q: "Is MFY Innovatech an official Odoo partner?", a: "Yes. MFY Innovatech is an official Odoo partner and implements, customises and supports Odoo for companies in Kuwait, the GCC and beyond." },
      { q: "How long does an Odoo implementation take in Kuwait?", a: "A focused first phase typically goes live in 8 to 14 weeks. Timelines stretch when data is dirty, when every process is customised or when nobody inside the company owns the project." },
      { q: "Can you take over an Odoo system another partner set up?", a: "Yes. We audit the current configuration, data and customisations, agree what to keep, and fix what is wrong before adding anything new." },
      { q: "Does Odoo support Kuwaiti dinar and Arabic invoices?", a: "Yes. Odoo supports three-decimal currencies such as the Kuwaiti dinar, Arabic as an interface language, right-to-left layouts and bilingual documents. They need to be configured correctly before any transactions are entered." },
      { q: "How much does Odoo cost in Kuwait?", a: "There are two parts. The Odoo licence is a price per user per month that Odoo sets for each country, so check the current Kuwait price on odoo.com/pricing. Implementation depends on the apps, number of users, data to migrate and integrations such as KNET or your bank. We give a written estimate for each phase after a discovery call, never a single number on the first call." },
      { q: "Do you build custom Odoo modules and integrations in Kuwait?", a: "Yes. Our team develops custom Odoo modules when standard Odoo does not cover a process, and connects Odoo to KNET and payment gateways, Kuwaiti banks, online stores, marketplaces and delivery apps. We customise only what pays for itself, so upgrades stay manageable." },
      { q: "Do you implement Odoo elsewhere in the GCC?", a: "Yes. Besides Kuwait we work with companies in the UAE, Saudi Arabia, Qatar and Bahrain. Each country has its own setup: VAT in the UAE and Saudi Arabia, ZATCA Phase 2 e-invoicing in Saudi Arabia, and mandatory e-invoicing in the UAE from 2027 for larger businesses. Odoo's country localizations cover these, and we configure and test them for your entity." },
      { q: "Can Odoo run payroll for a Kuwaiti company?", a: "Yes, with Kuwait-specific salary rules for end-of-service indemnity, leave and PIFSS contributions for Kuwaiti employees. We configure and test them with a parallel payroll run; confirm current contribution rates with PIFSS or your advisor." },
    ],
  },
  "software-development-company-usa": {
    seoTitle: "Software Development Company for US Businesses",
    metaDescription:
      "MFY Innovatech, a US-registered LLC, builds custom software, mobile apps, ERP, AI and 3D product animation for American businesses, in your time zone.",
    eyebrow: "United States",
    h1: "Custom software and ERP for US businesses, from a US-registered team.",
    lead: "MFYINNOVATECH LLC is registered in the United States and builds web and mobile software, ERP systems, AI and 3D product animation for American companies, with hours agreed to overlap with yours.",
    answer:
      "MFY Innovatech is a US-registered software development company (MFYINNOVATECH LLC) that builds custom web applications and SaaS platforms, iOS and Android apps, ERP systems as an official Odoo partner, AI and automation, and photoreal 3D product animation for US businesses. US clients include a hyperbaric chamber company and an aerial survey firm, and clients own the code and source files at handover.",
    pointsLabel: "Why US companies work with us",
    pointsTitle: "One accountable team, on your schedule.",
    points: [
      { title: "A US-registered company", text: "You work with MFYINNOVATECH LLC, a company registered in the United States." },
      { title: "Hours that overlap with yours", text: "Meeting and support hours are agreed per project to overlap with your time zone, from the East Coast to the West Coast." },
      { title: "You own everything", text: "Repositories, ERP modules and native 3D scene files are yours at handover, not just a login or a rendered video." },
      { title: "Software, ERP, AI and 3D under one roof", text: "The team that builds your product can also run its ERP, automate the workflows around it and produce the launch film." },
    ],
    servicesTitle: "What we build for US companies.",
    faqs: [
      { q: "Is MFY Innovatech a US company?", a: "Yes. MFYINNOVATECH LLC is registered in the United States and works remote-first with clients across the US, Canada, Europe, the Gulf and Australia." },
      { q: "Do you work in US time zones?", a: "Yes. Meeting and support hours are agreed per project so they overlap with your working day." },
      { q: "What kinds of US businesses do you work with?", a: "US clients include a hyperbaric chamber company and an aerial survey firm. We build custom software, websites, mobile apps, ERP systems and 3D product animation for companies that need them done carefully." },
      { q: "Can you implement an ERP system for a US company?", a: "Yes. As an official Odoo partner we implement ERP covering sales, inventory, purchasing, accounting, HR and payroll, and connect it to the tools you already use." },
      { q: "How do we start?", a: "Send the contact form, email or message us. The first conversation is about your business and goals, and the scope and milestones are agreed in writing before anything is built." },
    ],
  },
  "erp-for-wholesale-distributors": {
    seoTitle: "ERP & Inventory Software for Wholesale Distributors (USA)",
    metaDescription:
      "ERP and inventory software for US wholesale distributors: multi-warehouse stock, reorder rules, lot tracking and accounting, from an official Odoo partner.",
    eyebrow: "Wholesale distribution · USA",
    h1: "ERP and inventory software for distributors who have outgrown QuickBooks.",
    lead: "Inventory across every warehouse, automatic reordering, purchasing, lot and serial tracking and accounting in one system, implemented by a US-registered team and official Odoo partner.",
    answer:
      "For a US wholesale distributor, the right ERP connects inventory in every warehouse with purchasing, sales and accounting in one system, so stock levels, reorder points and margins are accurate in real time instead of in spreadsheets. MFY Innovatech, a US-registered official Odoo partner, implements Odoo for distributors with multi-warehouse stock, reorder rules, lot and serial tracking, barcode scanning, landed costs and integrations with online stores and shipping carriers. One US distributor with 4 warehouses and more than 3,000 SKUs went live in 10 weeks and cut stock-outs from 2–3 a week to near zero within two months.",
    pointsLabel: "Built for distribution",
    pointsTitle: "The four problems every growing distributor hits, solved in one system.",
    points: [
      { title: "Stock you can see in every warehouse", text: "Real-time quantities by warehouse and bin, transfers between locations, cycle counts and barcode scanning, so sales stops promising stock that isn't there." },
      { title: "Reordering that runs itself", text: "Minimum and maximum rules with vendor lead times draft purchase orders automatically. At one US distributor, reorder rules now create 90% of purchase orders." },
      { title: "Lot, serial and expiry tracking", text: "Know which lot went to which customer, pick by expiry date, and answer a recall in minutes instead of days." },
      { title: "Margins and month-end you can trust", text: "Landed costs, customer pricelists and accounting in the same system. The same distributor cut month-end close from 4 days to half a day." },
    ],
    servicesTitle: "What we set up for distributors.",
    faqs: [
      { q: "What is the best ERP for a small wholesale distributor?", a: "The best ERP is the one that handles your warehouses, reordering, lot or serial tracking and accounting without heavy customisation, at a cost per user that still works as you hire. For many small and mid-sized distributors that is Odoo, NetSuite or Microsoft Dynamics 365 Business Central. Ask each vendor to run your messiest order, with your data, before you choose." },
      { q: "When should a distributor move from QuickBooks to an ERP?", a: "Usually when stock lives in more than one warehouse, when reordering depends on one person's memory or a spreadsheet, when you need lot or serial tracking, or when month-end close takes days. Those are signs that accounting software alone is no longer enough." },
      { q: "How long does an ERP implementation take for a distributor?", a: "A focused first phase covering inventory, purchasing and sales typically goes live in 8 to 14 weeks. One US distributor with 4 warehouses and more than 3,000 SKUs went live in 10 weeks. Clean data and a written scope matter more than the software." },
      { q: "Can the ERP connect to our online store and shipping carriers?", a: "Yes. Odoo connects to e-commerce platforms, shipping carriers and other systems through standard connectors or custom integrations, so orders, stock and tracking numbers update without re-keying." },
      { q: "Do you work with distributors anywhere in the United States?", a: "Yes. MFYINNOVATECH LLC is registered in the United States and works remote-first with clients across the country, with meeting and support hours agreed to overlap with your time zone." },
    ],
  },
};
