/* Individual service pages — English. One entry per service slug in content.ts.
   Copy is built only from facts already stated on the site and blog. */

export type ServicePageCopy = {
  seoTitle: string; // ≤ ~43 chars so "· MFY Innovatech" still fits in results
  metaDescription: string; // ≤ 160 chars
  h1: string;
  lead: string;
  answer: string; // direct 2–3 sentence answer, quoted by answer engines
  fit: string[];
  deliverables: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const servicePagesEn: Record<string, ServicePageCopy> = {
  "web-saas": {
    seoTitle: "Custom Software Development Company",
    metaDescription:
      "MFY Innovatech designs and builds custom web applications and SaaS platforms: React and Next.js front-ends, typed APIs and infrastructure that scales.",
    h1: "Custom software development, built to hold up under real load.",
    lead: "We design and build web applications and multi-tenant SaaS platforms from the first architecture diagram to production, then stay on to run them.",
    answer:
      "MFY Innovatech is a custom software development company that builds web applications and SaaS platforms for growing businesses. We work in React, Next.js, Node and Postgres, write the scope and architecture down before code, and hand over the repositories at the end of the project. Most web scopes get a written fixed estimate within 48 hours of a discovery call.",
    fit: [
      "You have outgrown spreadsheets or off-the-shelf tools and need software shaped to your process.",
      "You are launching a SaaS product and need multi-tenant architecture from day one.",
      "You have an existing codebase that needs a team to extend, stabilise or rebuild it.",
    ],
    deliverables: [
      { title: "Web applications", text: "Internal tools, portals and customer-facing apps with role-based access, built on React and Next.js." },
      { title: "SaaS platforms", text: "Multi-tenant architecture, subscriptions and onboarding, designed to scale from the first customer to the thousandth." },
      { title: "APIs and integrations", text: "Typed APIs that connect your product to payment gateways, ERPs, CRMs and the tools your team already uses." },
      { title: "Websites and e-commerce", text: "Fast marketing sites and online stores on WordPress, WooCommerce, Kajabi or a custom Next.js build." },
      { title: "Infrastructure and support", text: "Hosting, monitoring and releases set up so the software stays fast and available after launch." },
    ],
    faqs: [
      { q: "How much does custom software development cost?", a: "It depends on scope: user roles, screens, integrations and how much already exists. Discovery is free, and most web scopes get a written fixed estimate within 48 hours. Larger platforms are estimated per phase, so you only commit to the next milestone." },
      { q: "Which technologies do you use?", a: "Mostly React and Next.js for front-ends, Node and Postgres on the back end, and WordPress or WooCommerce when a content site is the better fit. The stack is chosen in the written scope, with the reasons." },
      { q: "Who owns the code?", a: "You do. At handover you receive the repositories and everything needed to run the software, not just a login." },
      { q: "Can you take over an existing project?", a: "Often, yes. We audit the codebase first, agree what to keep and what to fix, then work in short iterations with working software at every review." },
    ],
  },
  mobile: {
    seoTitle: "iOS & Android App Development",
    metaDescription:
      "Native and cross-platform iOS and Android apps built in Flutter, React Native, Swift and Kotlin, from first release through store publishing and updates.",
    h1: "iOS and Android apps that feel native on both platforms.",
    lead: "We design, build and publish mobile apps that ship through the App Store and Google Play without drama, and stay maintainable for years.",
    answer:
      "MFY Innovatech builds iOS and Android apps with Flutter and React Native for one shared codebase, and with Swift and Kotlin where native code matters. We handle design, development, store submission and updates, and you own the source code. Mobile scopes usually get a written fixed estimate within 48 hours of a discovery call.",
    fit: [
      "You need one app on both iOS and Android without paying for two teams.",
      "Your customers, staff or field teams need to work from their phones.",
      "You have an app that needs a rebuild, new features or a team to maintain it.",
    ],
    deliverables: [
      { title: "Cross-platform apps", text: "One Flutter or React Native codebase that runs on iOS and Android with a native look and feel." },
      { title: "Native features", text: "Swift and Kotlin for camera, payments, offline mode, notifications and anything the platform does best." },
      { title: "Backends and admin panels", text: "The APIs, databases and dashboards behind the app, so you can manage users and content yourself." },
      { title: "Store publishing", text: "App Store and Google Play listings, review submissions and release management." },
      { title: "Maintenance and updates", text: "OS updates, new features and monitoring after launch, so the app keeps working as phones change." },
    ],
    faqs: [
      { q: "Flutter, React Native or native: which should I choose?", a: "For most business apps, Flutter or React Native gives you both platforms from one codebase at lower cost. We recommend native Swift or Kotlin when the app depends heavily on device features or performance, and explain the choice in the written scope." },
      { q: "How long does it take to build an app?", a: "It depends on the screens, integrations and backend. After discovery you get milestones with dates in the written scope, and a working build to test at every review." },
      { q: "Do you publish the app to the stores?", a: "Yes. We prepare the listings, submit for review and manage releases on the App Store and Google Play under your own developer accounts." },
      { q: "Who owns the app and its code?", a: "You do. At handover you receive the repositories and store assets, and the apps stay in your developer accounts." },
    ],
  },
  "ai-data": {
    seoTitle: "AI Development & Data Solutions",
    metaDescription:
      "AI models, LLM integration, data annotation and BI dashboards that answer real business questions. Practical AI from MFY Innovatech, measured by outcomes.",
    h1: "AI and data that answer real business questions.",
    lead: "We train and fine-tune models on your data, prepare that data properly, and turn it into dashboards your team actually opens.",
    answer:
      "MFY Innovatech builds practical AI and data solutions: custom and fine-tuned models, large language model integrations, data annotation and labeling, and business intelligence dashboards. We start from one measurable workflow, keep a human approval on anything that changes your records, and measure results against the number agreed at the start.",
    fit: [
      "You have data in your ERP, CRM or spreadsheets but no clear view of what it says.",
      "You want AI for a specific task, such as reading documents or forecasting demand, not as a buzzword.",
      "You need training data labeled accurately for a model you are building.",
    ],
    deliverables: [
      { title: "Model training and fine-tuning", text: "Models trained or fine-tuned on your own data for classification, forecasting and extraction." },
      { title: "LLM integration", text: "Large language model features built into your software and ERP, with approvals and audit trails." },
      { title: "Data annotation and labeling", text: "Precise, consistent labeling of text, images and documents to train and evaluate models." },
      { title: "Analytics and BI dashboards", text: "Dashboards built on one clean dataset, so every department reads the same numbers." },
      { title: "Document capture", text: "Supplier bills, receipts and orders read automatically and drafted for a person to check." },
    ],
    faqs: [
      { q: "Where should a company start with AI?", a: "With one workflow and one number, such as time to process supplier bills or forecast error. Clean the data behind it, ship a first version, measure it for a month, then move to the next workflow." },
      { q: "Is it safe to let AI change our business data?", a: "Only with a human in the loop. AI drafts, suggests and flags; a named person approves anything that changes master data, posts to the ledger or moves stock." },
      { q: "Can you add AI to our existing ERP?", a: "Yes. We build alongside the ERP through its API, so it stays the single source of truth and models can be replaced as better ones arrive." },
      { q: "Do you offer data annotation on its own?", a: "Yes. We label and prepare datasets for teams training their own models, with agreed guidelines and quality checks." },
    ],
  },
  "erp-odoo": {
    seoTitle: "ERP Implementation · Official Odoo Partner",
    metaDescription:
      "ERP implementation for growing companies by MFY Innovatech, an official Odoo partner: accounting setup, multi-currency, custom modules, integrations, training.",
    h1: "ERP implementation your finance team will trust.",
    lead: "We design, implement and run ERP systems for growing companies, with the accounting discipline to keep them compliant. As an official Odoo partner, we implement Odoo where it fits.",
    answer:
      "MFY Innovatech implements ERP systems for growing companies: process mapping, chart of accounts and tax setup, multi-currency, data migration, custom modules, integrations and role-based training. We are an official Odoo partner, write a phased scope before configuring anything, and keep phase one close to standard so you go live sooner.",
    fit: [
      "Sales, stock and accounting live in separate tools and someone reconciles them by hand.",
      "Month-end close takes weeks instead of days.",
      "You already run an ERP, but it was set up badly and nobody trusts the numbers.",
    ],
    deliverables: [
      { title: "Discovery and process mapping", text: "Your processes, systems and data mapped before anything is configured, with a written, phased scope." },
      { title: "Accounting setup", text: "Chart of accounts, taxes, multi-currency and three-decimal currencies such as the Kuwaiti dinar, set up by people who close books." },
      { title: "Data migration", text: "Customers, suppliers, products, open invoices and stock balances moved, cleaned and reconciled." },
      { title: "Custom modules and integrations", text: "Only where standard flows do not fit: approvals, reports and connections to banks, e-commerce and existing tools." },
      { title: "Training and go-live support", text: "Role-based training on your own data, a cut-over plan and support through the first month-end close." },
    ],
    faqs: [
      { q: "Are you an official Odoo partner?", a: "Yes. MFY Innovatech is an official Odoo partner, and most of our ERP projects are Odoo implementations. We recommend it where it fits your business and say so when it does not." },
      { q: "How long does an ERP implementation take?", a: "A focused first phase typically goes live in 8 to 14 weeks. Timelines stretch when data is dirty, when every process is customised or when nobody inside the company owns the project." },
      { q: "Can you fix an ERP that was implemented badly?", a: "Often that is the best starting point. We audit what exists, agree what to keep, and correct the configuration, data and reports before adding anything new." },
      { q: "Do you support Arabic documents and Gulf currencies?", a: "Yes. We set up bilingual Arabic and English documents, and currencies such as the Kuwaiti dinar with three-decimal precision, before any transactions are entered." },
    ],
  },
  "3d": {
    seoTitle: "3D Product Animation Studio",
    metaDescription:
      "Photoreal 3D product animation, modeling and industrial visualization for launches, investor decks and e-commerce, modeled, lit and animated in-house.",
    h1: "3D product animation that sells before the product ships.",
    lead: "Photoreal product films, industrial visualization and hero renders for launches, investor decks and online stores, all modeled, lit and animated in-house.",
    answer:
      "MFY Innovatech is a 3D product animation studio. We model, light and animate products in Blender to produce launch films, explainer animations, industrial visualizations and e-commerce renders. Nine productions have been released so far, from hyperbaric medical chambers to consumer packaging, and you receive the native scene files, not just the renders.",
    fit: [
      "You are launching a product that is not manufactured yet, or is hard to film.",
      "You need to show how a machine or medical device works inside.",
      "You want consistent, studio-quality product visuals for your store and ads.",
    ],
    deliverables: [
      { title: "Product animation films", text: "Launch and explainer films with camera moves, materials and lighting designed around the product." },
      { title: "3D modeling", text: "Accurate models built from CAD files, drawings or reference photos." },
      { title: "Industrial visualization", text: "Cutaways and exploded views that show how equipment works inside." },
      { title: "E-commerce renders", text: "Hero images and turntable views in a consistent studio look for every product." },
      { title: "Source files", text: "Native 3D scene files delivered with the renders, so future edits do not start from zero." },
    ],
    faqs: [
      { q: "What do you need to start a 3D animation?", a: "CAD files are ideal, but drawings, reference photos or a physical sample work too. We agree the shots, style and length in a short brief before modeling starts." },
      { q: "Can you animate a product that does not exist yet?", a: "Yes. Most of our films show products before or around launch, built from engineering files and design references." },
      { q: "Do we receive the 3D files?", a: "Yes. At handover you receive the native scene files as well as the rendered videos and images." },
      { q: "Which industries do you work with?", a: "Medical equipment, consumer health, footwear and packaging so far. The same process works for any physical product." },
    ],
  },
  "automation-cloud": {
    seoTitle: "Workflow Automation & Integrations",
    metaDescription:
      "Workflow automation, custom APIs and cloud consulting that connect the systems you already run and remove manual work, with Zapier, Make, n8n and AWS.",
    h1: "Automation and integrations that remove manual work.",
    lead: "We connect the systems you already run, automate the hand-offs between them, and keep the cloud infrastructure underneath lean, secure and observable.",
    answer:
      "MFY Innovatech automates workflows and integrates business systems: quick wins with Zapier, Make and n8n, custom APIs where ready-made connectors fall short, and cloud consulting on AWS and other platforms. The goal is one flow of data between your tools, entered once, with every automation documented and monitored.",
    fit: [
      "Your team re-types the same data into several tools every day.",
      "Your ERP, CRM, store and payment tools do not talk to each other.",
      "Your cloud setup or bill has grown without anyone owning it.",
    ],
    deliverables: [
      { title: "Workflow automation", text: "Zapier, Make and n8n automations for approvals, notifications, reports and hand-offs." },
      { title: "Custom integrations and APIs", text: "Reliable connections between your ERP, CRM, e-commerce, banking and in-house systems." },
      { title: "Cloud consulting", text: "Architecture, cost and security reviews, and infrastructure on AWS and other clouds." },
      { title: "Monitoring and documentation", text: "Every automation logged, alerted and written down, so it keeps working when people change." },
      { title: "Smart contracts", text: "Web3 and smart contract work when the use case is real." },
    ],
    faqs: [
      { q: "Zapier, Make, n8n or custom code: which is right?", a: "No-code tools are the fastest way to automate simple flows. When volumes grow, logic gets complex or data is sensitive, a custom integration is cheaper to run and easier to control. We recommend per workflow." },
      { q: "Can you connect our ERP to our online store?", a: "Yes. Orders, stock, customers and invoices can sync between the store and the ERP so nothing is typed twice." },
      { q: "What happens when an automation breaks?", a: "Logging and alerts make failures visible immediately, and each flow is documented so it can be fixed quickly by us or your team." },
      { q: "Do you work with our existing cloud provider?", a: "Yes. We review what you run today, then improve cost, security and monitoring on the platform you already use." },
    ],
  },
  "finance-ops": {
    seoTitle: "Finance Operations & Bookkeeping",
    metaDescription:
      "Bookkeeping, AR and AP, bank reconciliation, payroll and monthly management reporting, run inside your ERP by the team that implements it.",
    h1: "Finance operations run by people who know your ERP.",
    lead: "Ongoing accounting operations aligned with your ERP, from receivables and payables to the monthly close and the management reports built on it.",
    answer:
      "MFY Innovatech runs finance operations for growing companies: bookkeeping, accounts receivable and payable, bank reconciliations, cash flow, payroll, internal controls and monthly P&L, balance sheet and management reporting. Because the same team implements ERP systems, the books are kept inside your ERP and the month closes from records that already exist.",
    fit: [
      "You need reliable books without hiring a full in-house team.",
      "Your month-end close is late, or the numbers do not reconcile.",
      "You have a new ERP and want accounting run properly inside it from day one.",
    ],
    deliverables: [
      { title: "Bookkeeping", text: "Day-to-day entries, supplier bills and customer invoices recorded accurately in your ERP." },
      { title: "Receivables and payables", text: "Invoices issued and followed up, supplier payments scheduled, ageing kept under control." },
      { title: "Bank reconciliation and cash flow", text: "Bank lines matched every month and cash flow visible before it becomes a problem." },
      { title: "Payroll and internal controls", text: "Payroll processed on time, with approvals and controls that hold up to an audit." },
      { title: "Management reporting", text: "Monthly P&L, balance sheet and MIS reports your leadership can act on." },
    ],
    faqs: [
      { q: "Do you work inside our ERP?", a: "Yes. We keep the books in your ERP, so reports come from the same records the rest of the business creates. If your ERP's accounting setup needs work, we fix that too." },
      { q: "What reports do we receive each month?", a: "A profit and loss statement, a balance sheet and management reports agreed with you, delivered after each monthly close." },
      { q: "Can you clean up books that are behind?", a: "Yes. We reconcile and correct past periods first, then move to a regular monthly close." },
      { q: "Do you replace our accountant?", a: "We run day-to-day operations and work alongside your accountant or auditor, who keeps responsibility for statutory filings." },
    ],
  },
  growth: {
    seoTitle: "Digital Marketing & Brand Growth",
    metaDescription:
      "Brand positioning, integrated marketing campaigns and social media management with a content strategy behind it, reported in numbers, not adjectives.",
    h1: "Digital growth reported in numbers, not adjectives.",
    lead: "Brand positioning, integrated campaigns and social media management with a content strategy behind it, from the same team that builds your website and product.",
    answer:
      "MFY Innovatech provides digital growth services: brand positioning, integrated marketing campaigns, social media management and content strategy. Campaigns are planned around measurable goals and reported in numbers, and because the same team builds websites, apps and 3D product films, the content and the product are designed together.",
    fit: [
      "You have a good product, but your brand and message are unclear.",
      "Your social media is active but not bringing customers.",
      "You are launching a product and need the website, visuals and campaign to work together.",
    ],
    deliverables: [
      { title: "Brand positioning", text: "A clear message, audience and visual direction that sets you apart." },
      { title: "Integrated campaigns", text: "Campaigns across search, social and email, with goals agreed before launch." },
      { title: "Social media management", text: "Planning, content and community management on the channels your customers use." },
      { title: "Content strategy", text: "A content plan built around what your customers ask, including 3D product visuals." },
      { title: "Reporting", text: "Regular reports on reach, leads and sales, with what to change next." },
    ],
    faqs: [
      { q: "Which channels do you manage?", a: "The ones your customers use, typically Instagram, LinkedIn, Facebook and Meta ads, set out in a channel plan agreed at the start." },
      { q: "How do you measure results?", a: "We agree goals such as leads, sales or sign-ups before launch and report against them, not against likes alone." },
      { q: "Can you also build the website and visuals?", a: "Yes. The same team builds websites, apps and 3D product films, so campaigns and content are designed together." },
      { q: "Do you work with small businesses?", a: "Yes. We run website, social media and marketing together for business owners as well as larger teams." },
    ],
  },
};
