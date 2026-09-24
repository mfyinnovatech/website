/* ─────────────────────────────────────────────
   MFY Innovatech · site content
   Single source of truth for copy, nav, services,
   portfolio, people and contact details.
   ───────────────────────────────────────────── */

export const site = {
  name: "MFY Innovatech",
  legalName: "MFYINNOVATECH LLC",
  url: "https://mfyinnova.tech",
  description:
    "MFY Innovatech is an official Odoo partner and software studio building custom web and mobile products, AI and data solutions, Odoo ERP implementations and 3D product animation for companies on five continents.",
  email: "maryam@mfyinnova.tech",
  linkedin: "https://www.linkedin.com/in/maryammehboobalam/",
  location: "Remote-first · Clients on five continents",
  partner: {
    name: "Odoo",
    label: "Official Odoo partner",
    url: "https://www.odoo.com",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  num: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  group: "Engineering" | "Intelligence" | "Operations" | "Growth";
};

export const services: Service[] = [
  {
    slug: "web-saas",
    num: "01",
    title: "Web & SaaS products",
    short: "High-performance web applications and multi-tenant SaaS platforms.",
    description:
      "From first architecture diagram to production, we design and build web applications that hold up under real load. Modern React and Next.js front-ends, typed APIs, and infrastructure that scales without surprises.",
    tags: ["Next.js", "React", "Node", "Postgres", "SaaS", "CRM", "WordPress", "WooCommerce", "Kajabi"],
    group: "Engineering",
  },
  {
    slug: "mobile",
    num: "02",
    title: "iOS & Android apps",
    short: "Native and cross-platform mobile apps with seamless user experiences.",
    description:
      "Mobile products that feel native on both platforms, ship through the stores without drama, and stay maintainable for years. Flutter and React Native for shared codebases, Swift and Kotlin where it matters.",
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "App Store", "Play Store"],
    group: "Engineering",
  },
  {
    slug: "ai-data",
    num: "03",
    title: "AI & data",
    short: "Custom models, data pipelines and dashboards that answer real questions.",
    description:
      "We train and fine-tune models on your data, prepare it properly with precise annotation and labeling, and turn it into analytics dashboards your team actually opens. Practical AI, measured by outcomes.",
    tags: ["Model training", "Fine-tuning", "LLM integration", "Data annotation", "Analytics", "BI dashboards"],
    group: "Intelligence",
  },
  {
    slug: "erp-odoo",
    num: "04",
    title: "ERP & Odoo",
    short: "Official Odoo partner. Implementation, customization and accounting alignment.",
    description:
      "Specialized Odoo implementation for growing companies. Chart of accounts design, tax and multi-currency setup, custom modules, third-party integrations, and the accounting discipline to keep it all compliant.",
    tags: ["Official Odoo partner", "Implementation", "Custom modules", "Integrations", "Chart of accounts", "Multi-currency"],
    group: "Operations",
  },
  {
    slug: "3d",
    num: "05",
    title: "3D animation & visualization",
    short: "Product animation and modeling that sells before the product ships.",
    description:
      "Photoreal product animations, industrial visualization and hero renders for launches, investor decks and e-commerce. Modeled, lit and animated in-house with strong diagonals and a cool, precise grade.",
    tags: ["Product animation", "3D modeling", "Industrial viz", "Launch films", "E-commerce renders"],
    group: "Engineering",
  },
  {
    slug: "automation-cloud",
    num: "06",
    title: "Automation, cloud & integrations",
    short: "Workflow automation, APIs and cloud infrastructure that remove manual work.",
    description:
      "We connect the systems you already run. Zapier and Make for quick wins, custom integrations and APIs for the rest, and cloud consulting to keep infrastructure lean, secure and observable. Web3 and smart contracts when the use case is real.",
    tags: ["Zapier", "Make", "Custom APIs", "Cloud consulting", "AWS", "Smart contracts"],
    group: "Operations",
  },
  {
    slug: "finance-ops",
    num: "07",
    title: "Finance operations",
    short: "End-to-end accounting operations aligned with your ERP.",
    description:
      "Ongoing accounts receivable and payable, bank reconciliations, cash flow, payroll and internal controls, plus monthly P&L, balance sheet and management reporting. Run by people who also built the ERP it lives in.",
    tags: ["Bookkeeping", "AR / AP", "Reconciliation", "Payroll", "P&L", "MIS reporting"],
    group: "Operations",
  },
  {
    slug: "growth",
    num: "08",
    title: "Digital growth",
    short: "Brand positioning, integrated campaigns and social growth.",
    description:
      "Strategic brand positioning, marketing campaigns that report on numbers not adjectives, and social media management with a content strategy behind it.",
    tags: ["Branding", "Campaigns", "Social media", "Content strategy"],
    group: "Growth",
  },
];

export type Video = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  featured?: boolean;
};

/* 3D portfolio — YouTube productions by MFY Innovatech */
export const videos: Video[] = [
  {
    id: "O40dgi9Vg0I",
    title: "HBOT 64D Plus oxygen chamber",
    client: "Hyperbaric medical equipment",
    category: "Product animation",
    year: "2025",
    featured: true,
  },
  {
    id: "Sb2qt7QJIOE",
    title: "HBOTs 64D hyperbaric chamber",
    client: "Hyperbaric medical equipment",
    category: "Product animation",
    year: "2025",
    featured: true,
  },
  {
    id: "WUbft4fIkA4",
    title: "Oxygen exercise chamber",
    client: "Hyperbaric medical equipment",
    category: "Product animation",
    year: "2025",
  },
  {
    id: "1X-zlaGFwPI",
    title: "HBOT 40D oxygen chamber",
    client: "Hyperbaric medical equipment",
    category: "Product animation",
    year: "2025",
  },
  {
    id: "X1ExjME3kSM",
    title: "HBOTs 35D chamber",
    client: "Hyperbaric medical equipment",
    category: "Product animation",
    year: "2025",
  },
  {
    id: "H3YglDR0wjk",
    title: "Performance shoe",
    client: "Footwear concept",
    category: "Product animation",
    year: "2025",
    featured: true,
  },
  {
    id: "ihWBj6ercZE",
    title: "Vitamin supplement",
    client: "Consumer health",
    category: "Product animation",
    year: "2025",
  },
  {
    id: "NSK-yFkdTB0",
    title: "Beverage can",
    client: "Consumer packaging",
    category: "Product animation",
    year: "2025",
  },
  {
    id: "96FKrPCF6vg",
    title: "Industrial can design",
    client: "Consumer packaging",
    category: "Product animation",
    year: "2025",
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  services: string[];
  summary: string;
  result: { value: string; label: string };
  accent: "blue" | "navy" | "ice";
};

/* Software engagements — representative, anonymized */
export const caseStudies: CaseStudy[] = [
  {
    slug: "odoo-erp-rollout",
    title: "Odoo ERP rollout across sales, inventory and accounting",
    sector: "Distribution",
    services: ["ERP & Odoo", "Finance operations"],
    summary:
      "Replaced three disconnected tools with a single Odoo instance: configured chart of accounts, multi-currency invoicing, warehouse flows and custom reporting. Delivered ahead of schedule.",
    result: { value: "1", label: "system instead of three" },
    accent: "blue",
  },
  {
    slug: "ai-annotation-pipeline",
    title: "Annotation pipeline and model training for a vision product",
    sector: "AI / Computer vision",
    services: ["AI & data"],
    summary:
      "Built the labeling workflow, QA gates and training loop that took a prototype model from demo to a dataset the team could trust.",
    result: { value: "10k+", label: "labeled samples, QA-gated" },
    accent: "navy",
  },
  {
    slug: "saas-platform",
    title: "Multi-tenant SaaS platform with analytics dashboards",
    sector: "B2B software",
    services: ["Web & SaaS", "Automation & cloud"],
    summary:
      "Designed and shipped a subscription platform with role-based access, real-time dashboards and automated onboarding through Make and custom APIs.",
    result: { value: "99.9%", label: "uptime since launch" },
    accent: "ice",
  },
];

export const process = [
  {
    num: "01",
    title: "Discover",
    text: "A focused session on your business, current systems and the outcome you need. We ask the hard questions before we estimate anything.",
  },
  {
    num: "02",
    title: "Define",
    text: "Scope, architecture, milestones and success metrics written down and agreed. If the plan changes later, the estimate changes with it, in the open.",
  },
  {
    num: "03",
    title: "Build",
    text: "Short iterations with working software at every review. You see progress in the product, not in a status deck.",
  },
  {
    num: "04",
    title: "Run",
    text: "Launch, monitor and improve. We stay on for the operating phase, from uptime to the accounting close.",
  },
];

export const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "9", label: "3D productions released" },
  { value: "4", label: "Disciplines under one roof" },
];

export type VideoTestimonial = {
  id: string; // YouTube id
  name: string;
  role: string;
  company?: string;
  topic: string;
  quote?: string;
};

/* Video testimonials — YouTube, from the current mfyinnova.tech */
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "xQUGS2VYbKk",
    name: "Dr. Dimitrios Tsoukas",
    role: "Orthopaedic surgeon",
    topic: "Website",
  },
  {
    id: "Q4Q_AEcwxuo",
    name: "3D animation client",
    role: "Product launch",
    topic: "3D product animation",
  },
  {
    id: "op_I8Y8tR1I",
    name: "Christos Poulis",
    role: "Sports medicine specialist",
    topic: "Website & Flutter mobile app",
  },
];

export type TextTestimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  service: string;
};

export const testimonials: TextTestimonial[] = [
  {
    quote:
      "The attention to detail and technical prowess of the MFY Innovatech team is unmatched. They delivered our Odoo implementation ahead of schedule and with perfect precision.",
    name: "Client",
    role: "Operations lead",
    service: "Odoo ERP",
  },
  {
    quote:
      "Incredible asset in any ERP environment and fantastic work ethic. She's a pleasure to work with and learn with.",
    name: "Casey Skeens",
    role: "Business Development, LinkedIn recommendation for Maryam Mehboob",
    service: "ERP",
  },
];

export type TeamMember = {
  name: string;
  role: string; // Founder / Co-founder
  title: string; // discipline
  bio: string;
  initials: string;
  linkedin: string;
  instagram: string;
  photo?: string; // /team/<file>.jpg — add when portraits are available
  featured?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Maryam Mehboob",
    role: "Founder",
    title: "ERP & technology expert",
    bio: "Leads the Odoo partnership, client engagements and delivery. Structures the ERP, the accounts and the process behind every project.",
    initials: "MM",
    linkedin: "https://www.linkedin.com/in/maryammehboobalam/",
    instagram: "https://www.instagram.com/biz_maryam_/",
    photo: "/team/maryam-mehboob.jpg",
    featured: true,
  },
  {
    name: "Mian Farhan",
    role: "Co-founder",
    title: "3D artist",
    bio: "Models, lights and animates the studio's product films and hero renders.",
    initials: "FM",
    linkedin: "https://www.linkedin.com/in/farhan-mehboob-0b12582bb/",
    instagram: "https://www.instagram.com/mfm_farhan_/",
    photo: "/team/farhan-mehboob.jpg",
  },
  {
    name: "Minahil Fatima",
    role: "Co-founder",
    title: "Data analyst",
    bio: "Turns operational and ERP data into dashboards, forecasts and decisions.",
    initials: "MiM",
    linkedin: "https://www.linkedin.com/in/minahil-fatima-802120332/",
    instagram: "#",
    photo: "/team/minahil-mehboob.jpg",
  },
];

/* kept for older imports */
export const founders = team;

export const faqs = [
  {
    q: "Do you take fixed-price projects?",
    a: "Yes, once scope is defined. Discovery is free, and most web, mobile and AI scopes get a written fixed estimate within 48 hours. Larger Odoo rollouts are priced per phase after a discovery call.",
  },
  {
    q: "Can you work inside our existing Odoo or codebase?",
    a: "Often that is the best option. We audit what exists, agree on what to keep, and work alongside your engineers, your Odoo partner or your accountant as needed.",
  },
  {
    q: "Who owns the code and the 3D source files?",
    a: "You do. On final payment you receive the repositories, the Odoo modules and the native 3D scene files, not just the renders.",
  },
  {
    q: "What happens when requirements change mid-project?",
    a: "We share an updated estimate before continuing, never after. Every approved scope and milestone is documented before we build, so changes are visible and priced in the open.",
  },
  {
    q: "Where are you based and what hours do you keep?",
    a: "MFYINNOVATECH LLC is registered in the United States and works remote-first. Our clients are in the US, Canada, Germany, Greece, Romania, the UAE, Saudi Arabia, Qatar, Kuwait, Africa and Australia, and overlap hours are agreed per project.",
  },
];

export const capabilities = [
  "Odoo ERP",
  "Next.js",
  "React Native",
  "Flutter",
  "AI model training",
  "Data annotation",
  "3D product animation",
  "SaaS platforms",
  "Workflow automation",
  "Cloud & APIs",
  "Analytics dashboards",
  "Finance operations",
];

/* ─────────────────────────────────────────────
   Why ERP — the cost of manual work, by industry
   ───────────────────────────────────────────── */
export type Industry = {
  key: string;
  label: string;
  headline: string;
  levers: { title: string; text: string }[];
  callouts: [string, string, string]; // annotations along the after-go-live curve
  before: number[]; // 4 months, relative revenue index
  after: number[]; // 8 months, relative revenue index
};

export const hiddenCosts = [
  {
    num: "01",
    title: "No single view of stock, cash and orders",
    cost: "Decisions wait for someone to reconcile three spreadsheets.",
    fix: "One database. Sales, inventory and accounting update each other in real time.",
  },
  {
    num: "02",
    title: "Re-typing the same data into every tool",
    cost: "Every hand-off is a chance to lose an order or invoice the wrong amount.",
    fix: "Quote to invoice to ledger in one flow, entered once.",
  },
  {
    num: "03",
    title: "Stock you cannot trust",
    cost: "Stockouts on best-sellers, dead stock on the rest, and rush freight to cover both.",
    fix: "Live quantities, reorder rules and multi-warehouse routing.",
  },
  {
    num: "04",
    title: "Month-end that takes weeks",
    cost: "By the time the numbers arrive, the month they describe is gone.",
    fix: "Bank reconciliation and reporting that close in days.",
  },
  {
    num: "05",
    title: "Knowledge that lives in one person's head",
    cost: "When they are on leave, the process is on leave.",
    fix: "Documented workflows, roles and approvals inside the system.",
  },
];

export const industries: Industry[] = [
  {
    key: "distribution",
    label: "Distributors",
    headline: "Sell what is actually on the shelf, and reorder before it runs out.",
    levers: [
      { title: "Live inventory across warehouses", text: "Reorder rules and routing replace the weekly count." },
      { title: "B2B portal and pricelists", text: "Customers order themselves, at the price agreed for them." },
      { title: "Order-to-cash in one flow", text: "Pick, pack, deliver, invoice, without re-keying." },
    ],
    callouts: ["Stockouts stop", "Same-day invoicing", "Repeat orders grow"],
    before: [100, 103, 98, 101],
    after: [104, 110, 116, 121, 128, 134, 141, 149],
  },
  {
    key: "manufacturing",
    label: "Manufacturers",
    headline: "Plan production from real demand, not from last month's spreadsheet.",
    levers: [
      { title: "MRP with bills of materials", text: "Work orders and purchasing driven by confirmed demand." },
      { title: "Shop-floor control and quality", text: "Scrap, rework and downtime become visible numbers." },
      { title: "Maintenance and costing", text: "Know the real cost of every unit that leaves the line." },
    ],
    callouts: ["On-time delivery up", "Less scrap and rework", "Margin per unit visible"],
    before: [100, 99, 102, 100],
    after: [103, 108, 112, 118, 123, 130, 136, 143],
  },
  {
    key: "medical",
    label: "Medical equipment",
    headline: "Traceability, service contracts and compliance in the same system as sales.",
    levers: [
      { title: "Lot and serial traceability", text: "Every device tracked from supplier to installed site." },
      { title: "Field service and contracts", text: "Installations, maintenance visits and renewals scheduled and billed." },
      { title: "Regulatory documentation", text: "Certificates and records attached to the product, not to a folder." },
    ],
    callouts: ["Audit-ready records", "Service revenue recurring", "Renewals never missed"],
    before: [100, 101, 99, 102],
    after: [105, 109, 115, 120, 127, 133, 140, 148],
  },
  {
    key: "healthcare",
    label: "Hospitals & clinics",
    headline: "Procurement, consumables and payroll under one set of controls.",
    levers: [
      { title: "Purchasing with approvals", text: "Requests, tenders and vendor bills follow one approval chain." },
      { title: "Consumables and pharmacy stock", text: "Expiry-aware inventory across departments." },
      { title: "HR, payroll and accounting", text: "Headcount and cost centres reconciled every month." },
    ],
    callouts: ["Procurement cycle shorter", "Expired stock written off less", "Cost per department known"],
    before: [100, 102, 100, 101],
    after: [103, 107, 111, 116, 121, 126, 132, 138],
  },
];

/* ─────────────────────────────────────────────
   Global presence — client regions (keys match scripts/generate-world-dots.mjs)
   ───────────────────────────────────────────── */
export const presence = {
  /* labelSide "none" hides the map label; the Gulf cluster shares one label on the UAE marker */
  regions: [
    { key: "usa", name: "United States", note: "Registered here", labelSide: "right" },
    { key: "canada", name: "Canada", note: "Software", labelSide: "left" },
    { key: "germany", name: "Germany", note: "Software · ERP", labelSide: "above" },
    { key: "romania", name: "Romania", note: "Software", labelSide: "right" },
    { key: "greece", name: "Greece", note: "3D · Software", labelSide: "below" },
    { key: "uae", name: "UAE · Dubai", note: "ERP · 3D", labelSide: "right", mapLabel: "UAE · Saudi · Qatar · Kuwait" },
    { key: "saudi", name: "Saudi Arabia", note: "ERP", labelSide: "none" },
    { key: "qatar", name: "Qatar", note: "Software", labelSide: "none" },
    { key: "kuwait", name: "Kuwait", note: "ERP", labelSide: "none" },
    { key: "africa", name: "Africa", note: "Software", labelSide: "left" },
    { key: "australia", name: "Australia", note: "Software · 3D", labelSide: "right" },
  ],
  more: "and new countries every quarter",
  stats: [
    { value: "5", label: "continents" },
    { value: "11+", label: "countries" },
    { value: "18h", label: "time-zone span" },
  ],
};

/* ─────────────────────────────────────────────
   Clients — logo strip
   ───────────────────────────────────────────── */
export type Client = {
  key: string;
  name: string;
  sector: string;
  url: string;
  logo: string;
  /* exact rendered size in px inside the strip (fits a 160×56 box) */
  width: number;
  height: number;
};

export const clients: Client[] = [
  {
    key: "ohs",
    name: "Oxygen Health Systems",
    sector: "Hyperbaric chambers · USA",
    url: "https://www.oxygenhealthsystems.com",
    logo: "/clients/oxygen-health-systems.png",
    width: 52,
    height: 52,
  },
  {
    key: "tsoukas",
    name: "Dr. Dimitrios Tsoukas",
    sector: "Orthopaedic surgery · Greece",
    url: "https://drtsoukas.com",
    logo: "/clients/dr-tsoukas-wordmark.png",
    width: 160,
    height: 14,
  },
  {
    key: "poulis",
    name: "Christos Poulis",
    sector: "Sports medicine",
    url: "https://christospoulis.com",
    logo: "/clients/christos-poulis-trim.png",
    width: 127,
    height: 30,
  },
  {
    key: "sportmedlab",
    name: "Sport MedLab",
    sector: "Therapy equipment · Romania",
    url: "https://sportmedlab.com",
    logo: "/clients/sport-medlab@2x.png",
    width: 117,
    height: 34,
  },
  {
    key: "heykiz",
    name: "Heykiz",
    sector: "Beauty e-commerce · France",
    url: "https://heykiz.com",
    logo: "/clients/heykiz.png",
    width: 100,
    height: 45,
  },
  {
    key: "naas",
    name: "North American Aerial Surveys",
    sector: "Aerial surveys · USA",
    url: "https://www.naasurveys.com",
    logo: "/clients/naas.png",
    width: 66,
    height: 54,
  },
  {
    key: "naneau",
    name: "Naneau by Inspired Waters",
    sector: "Consumer health · Canada",
    url: "https://inspiredwaters.com",
    logo: "/clients/naneau.png",
    width: 150,
    height: 22,
  },
  {
    key: "killerbody",
    name: "Killerbody",
    sector: "Nutrition e-commerce · Netherlands",
    url: "https://killerbodyfood.com",
    logo: "/clients/killerbody.png",
    width: 120,
    height: 26,
  },
];

/* ─────────────────────────────────────────────
   Tool stack — brand marks in /public/tools (Simple Icons, CC0)
   ───────────────────────────────────────────── */
export type Tool = { slug: string; name: string; category: string; color: string };

export const tools: Tool[] = [
  { slug: "odoo", name: "Odoo", category: "ERP", color: "#714B67" },
  { slug: "n8n", name: "n8n", category: "Automation", color: "#EA4B71" },
  { slug: "blender", name: "Blender", category: "3D", color: "#E87D0D" },
  { slug: "flutter", name: "Flutter", category: "Mobile", color: "#02569B" },
  { slug: "nextdotjs", name: "Next.js", category: "Web", color: "#000000" },
  { slug: "react", name: "React", category: "Web", color: "#61DAFB" },
  { slug: "nodedotjs", name: "Node.js", category: "Web", color: "#5FA04E" },
  { slug: "typescript", name: "TypeScript", category: "Web", color: "#3178C6" },
  { slug: "tailwindcss", name: "Tailwind CSS", category: "Web", color: "#06B6D4" },
  { slug: "python", name: "Python", category: "AI & data", color: "#3776AB" },
  { slug: "pytorch", name: "PyTorch", category: "AI", color: "#EE4C2C" },
  { slug: "tensorflow", name: "TensorFlow", category: "AI", color: "#FF6F00" },
  { slug: "huggingface", name: "Hugging Face", category: "AI", color: "#FFD21E" },
  { slug: "langchain", name: "LangChain", category: "AI", color: "#7FC8FF" },
  { slug: "postgresql", name: "PostgreSQL", category: "Data", color: "#4169E1" },
  { slug: "supabase", name: "Supabase", category: "Cloud", color: "#3FCF8E" },
  { slug: "firebase", name: "Firebase", category: "Cloud", color: "#DD2C00" },
  { slug: "docker", name: "Docker", category: "Cloud", color: "#2496ED" },
  { slug: "googlecloud", name: "Google Cloud", category: "Cloud", color: "#4285F4" },
  { slug: "vercel", name: "Vercel", category: "Cloud", color: "#000000" },
  { slug: "github", name: "GitHub", category: "Engineering", color: "#181717" },
  { slug: "figma", name: "Figma", category: "Design", color: "#F24E1E" },
  { slug: "wordpress", name: "WordPress", category: "Web", color: "#21759B" },
  { slug: "woocommerce", name: "WooCommerce", category: "Web", color: "#96588A" },
  { slug: "zapier", name: "Zapier", category: "Automation", color: "#FF4F00" },
  { slug: "make", name: "Make", category: "Automation", color: "#6D00CC" },
  { slug: "hubspot", name: "HubSpot", category: "Growth", color: "#FF7A59" },
  { slug: "swift", name: "Swift", category: "Mobile", color: "#F05138" },
  { slug: "kotlin", name: "Kotlin", category: "Mobile", color: "#7F52FF" },
];

/* The tiles that float around the heading on desktop, in display order */
export const featuredTools = [
  "odoo", "n8n", "blender", "flutter", "nextdotjs", "react", "python", "pytorch",
  "postgresql", "docker", "figma", "wordpress", "zapier", "hubspot",
];
