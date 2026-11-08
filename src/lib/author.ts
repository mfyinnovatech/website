import type { Locale } from "@/lib/i18n";

/* Founder author page (/about/maryam-mehboob). Every fact here comes from Maryam's own
   LinkedIn profile (checked 2026-11-08): degree, background, industries, the distributor
   result and the recommendation. Keep it in sync with that profile; add nothing unverified. */

export const AUTHOR_PATH = "/about/maryam-mehboob";

export const AUTHOR_FACTS = {
  alumniOf: "COMSATS University Islamabad",
  knowsAbout: [
    "ERP implementation",
    "Odoo ERP",
    "Business process analysis",
    "ERP architecture",
    "Custom software development",
    "AI automation in ERP",
    "Data migration",
    "Inventory and manufacturing (MRP)",
    "Accounting systems",
    "Digital transformation",
  ],
};

export type AuthorCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  name: string;
  role: string;
  lead: string;
  answerLabel: string;
  answer: string;
  expertiseTitle: string;
  expertise: { title: string; text: string }[];
  industriesTitle: string;
  industries: string[];
  credentialsTitle: string;
  credentials: string[];
  resultTitle: string;
  resultIntro: string;
  result: string[];
  resultNote: string;
  principlesTitle: string;
  principles: { title: string; text: string }[];
  quoteTitle: string;
  quote: string;
  quoteBy: string;
  articlesTitle: string;
  linkedin: string;
  contact: string;
  breadcrumb: string;
};

const en: AuthorCopy = {
  metaTitle: "Maryam Mehboob · ERP & AI Consultant",
  metaDescription:
    "Maryam Mehboob is the founder of MFY Innovatech: an ERP, AI and digital transformation consultant who leads implementations in the USA, Canada, Kuwait and the Gulf.",
  eyebrow: "Founder · Author",
  name: "Maryam Mehboob",
  role: "Founder of MFY Innovatech · ERP, AI and digital transformation consultant",
  lead: "Maryam is the founder of MFY Innovatech. She sets the direction for the company's ERP, software and AI work, alongside a team of engineers, analysts and designers who deliver each project from workflow analysis to go-live and training.",
  answerLabel: "In short",
  answer:
    "Maryam Mehboob is the founder of MFY Innovatech and an ERP, AI and digital transformation consultant. A Computer Science graduate of COMSATS University Islamabad, she started as an Odoo developer and functional consultant. Today she heads the MFY Innovatech team, which delivers ERP implementations, custom software and AI automation for companies in the USA, Canada, Kuwait and the Gulf.",
  expertiseTitle: "What she works on",
  expertise: [
    { title: "ERP implementation and rescue", text: "New implementations, version upgrades and recovery of stalled projects, on Odoo Online, On-Premise and Odoo.sh." },
    { title: "Process analysis and ERP architecture", text: "Mapping how the business really runs before anything is configured, then designing the system around it." },
    { title: "Custom modules, automation and reporting", text: "Building what the standard product does not cover, and automating the routine work people do by hand." },
    { title: "Integrations", text: "Connecting the ERP to e-commerce stores, shipping carriers, payment gateways and third-party APIs." },
    { title: "Data migration, training and go-live", text: "Moving clean data across, training each role and staying close through the first weeks after launch." },
    { title: "AI inside the workflow", text: "Using AI where it earns its place in sales, inventory and operations, not as a feature for its own sake." },
  ],
  industriesTitle: "Industries",
  industries: ["Medical devices", "Industrial equipment", "Manufacturing", "Wholesale distribution", "E-commerce"],
  credentialsTitle: "Background and credentials",
  credentials: [
    "Computer Science graduate, COMSATS University Islamabad",
    "Started as an Odoo developer and functional consultant",
    "Top Rated on Upwork",
    "Founder of MFY Innovatech, an official Odoo partner",
  ],
  resultTitle: "A client result",
  resultIntro: "A US distributor with 4 warehouses and more than 3,000 SKUs ran on QuickBooks, spreadsheets and one person's memory. After an ERP implementation covering inventory, purchasing and manufacturing:",
  result: [
    "Stock-outs fell from 2–3 a week to near zero within two months",
    "Reorder rules now generate 90% of purchase orders automatically",
    "Month-end close went from 4 days to half a day",
    "Implemented in 10 weeks; the project paid for itself by month 4",
  ],
  resultNote: "As published on Maryam's LinkedIn profile.",
  principlesTitle: "How she approaches a project",
  principles: [
    { title: "Start where it hurts most", text: "Go live with the part of the business in the most pain, make it stable and let the team win once before adding the next part. Big-bang go-lives send people back to the old spreadsheet." },
    { title: "Judge a system on your worst order, not a demo", text: "A demo uses clean data and a perfect order. Ask a vendor to run last month's messiest order instead." },
    { title: "Small changes often beat custom code", text: "A follow-up rule or a reorder rule set up in minutes can save more time than a new module." },
    { title: "Business is still about people", text: "Technology connects teams across borders, but trust and clear ownership are what make a system stick." },
  ],
  quoteTitle: "Recommendation",
  quote: "Incredible asset in any ERP environment and fantastic work ethic. She's a pleasure to work with and learn with.",
  quoteBy: "Casey Skeens, Business Development (LinkedIn recommendation)",
  articlesTitle: "Articles by Maryam",
  linkedin: "Maryam on LinkedIn",
  contact: "Talk to Maryam",
  breadcrumb: "About",
};

const ar: AuthorCopy = {
  metaTitle: "مريم محبوب · مستشارة ERP والذكاء الاصطناعي",
  metaDescription:
    "مريم محبوب مؤسِّسة MFY Innovatech، مستشارة في أنظمة ERP والذكاء الاصطناعي والتحول الرقمي، تقود مشاريع التنفيذ في الولايات المتحدة وكندا والكويت والخليج.",
  eyebrow: "المؤسِّسة · الكاتبة",
  name: "مريم محبوب",
  role: "مؤسِّسة MFY Innovatech · مستشارة ERP والذكاء الاصطناعي والتحول الرقمي",
  lead: "مريم هي مؤسِّسة MFY Innovatech. تحدد توجه أعمال الشركة في أنظمة ERP والبرمجيات والذكاء الاصطناعي، إلى جانب فريق من المهندسين والمحللين والمصممين يتولى تسليم كل مشروع من تحليل سير العمل إلى الإطلاق والتدريب.",
  answerLabel: "باختصار",
  answer:
    "مريم محبوب مؤسِّسة MFY Innovatech ومستشارة في أنظمة ERP والذكاء الاصطناعي والتحول الرقمي. تخرجت في علوم الحاسوب من جامعة COMSATS في إسلام آباد، وبدأت مطوِّرة ومستشارة وظيفية لأنظمة Odoo. وتقود اليوم فريق MFY Innovatech الذي ينفذ مشاريع ERP والبرمجيات المخصصة وأتمتة الذكاء الاصطناعي لشركات في الولايات المتحدة وكندا والكويت والخليج.",
  expertiseTitle: "مجالات عملها",
  expertise: [
    { title: "تنفيذ أنظمة ERP وإنقاذ المشاريع", text: "تنفيذات جديدة وترقيات إصدارات وإنقاذ المشاريع المتعثرة، على Odoo Online وOn-Premise وOdoo.sh." },
    { title: "تحليل العمليات وهندسة ERP", text: "فهم طريقة عمل الشركة فعلاً قبل إعداد أي شيء، ثم تصميم النظام حولها." },
    { title: "وحدات مخصصة وأتمتة وتقارير", text: "بناء ما لا يغطيه المنتج القياسي، وأتمتة الأعمال الروتينية التي تُنجز يدوياً." },
    { title: "التكاملات", text: "ربط نظام ERP بالمتاجر الإلكترونية وشركات الشحن وبوابات الدفع وواجهات الأنظمة الأخرى." },
    { title: "ترحيل البيانات والتدريب والإطلاق", text: "نقل بيانات نظيفة، وتدريب كل دور، والبقاء قريباً خلال الأسابيع الأولى بعد الإطلاق." },
    { title: "الذكاء الاصطناعي داخل سير العمل", text: "استخدام الذكاء الاصطناعي حيث يضيف قيمة حقيقية في المبيعات والمخزون والعمليات، لا كميزة شكلية." },
  ],
  industriesTitle: "القطاعات",
  industries: ["الأجهزة الطبية", "المعدات الصناعية", "التصنيع", "التوزيع بالجملة", "التجارة الإلكترونية"],
  credentialsTitle: "الخلفية والمؤهلات",
  credentials: [
    "خريجة علوم الحاسوب، جامعة COMSATS إسلام آباد",
    "بدأت مطوِّرة ومستشارة وظيفية لأنظمة Odoo",
    "تقييم Top Rated على منصة Upwork",
    "مؤسِّسة MFY Innovatech، الشريك الرسمي لـOdoo",
  ],
  resultTitle: "نتيجة لأحد العملاء",
  resultIntro: "موزّع أمريكي لديه 4 مستودعات وأكثر من 3,000 صنف كان يعمل على QuickBooks وجداول البيانات وذاكرة شخص واحد. بعد تنفيذ نظام ERP يغطي المخزون والمشتريات والتصنيع:",
  result: [
    "انخفض نفاد المخزون من 2–3 مرات أسبوعياً إلى ما يقارب الصفر خلال شهرين",
    "تُنشئ قواعد إعادة الطلب الآن 90% من أوامر الشراء تلقائياً",
    "انخفض إقفال نهاية الشهر من 4 أيام إلى نصف يوم",
    "اكتمل التنفيذ في 10 أسابيع، واسترد المشروع تكلفته بحلول الشهر الرابع",
  ],
  resultNote: "كما نُشر في ملف مريم على LinkedIn.",
  principlesTitle: "كيف تتعامل مع المشروع",
  principles: [
    { title: "ابدأ من حيث الألم الأكبر", text: "أطلق الجزء الأكثر معاناة في الشركة أولاً، وثبّته، ودع الفريق يحقق نجاحاً واحداً قبل إضافة الجزء التالي. الإطلاق الشامل دفعة واحدة يعيد الناس إلى جداول البيانات القديمة." },
    { title: "احكم على النظام بأسوأ طلب لديك لا بالعرض التجريبي", text: "العرض التجريبي يستخدم بيانات نظيفة وطلباً مثالياً. اطلب من المورد تشغيل أكثر طلبات الشهر الماضي تعقيداً." },
    { title: "التغييرات الصغيرة تتفوق غالباً على البرمجة المخصصة", text: "قاعدة متابعة أو قاعدة إعادة طلب تُضبط في دقائق قد توفر وقتاً أكثر من وحدة جديدة." },
    { title: "الأعمال ما زالت تقوم على الناس", text: "التقنية تربط الفرق عبر الحدود، لكن الثقة ووضوح المسؤولية هما ما يجعل النظام يستمر." },
  ],
  quoteTitle: "توصية",
  quote: "Incredible asset in any ERP environment and fantastic work ethic. She's a pleasure to work with and learn with.",
  quoteBy: "Casey Skeens، تطوير الأعمال (توصية على LinkedIn)",
  articlesTitle: "مقالات مريم",
  linkedin: "مريم على LinkedIn",
  contact: "تحدّث مع مريم",
  breadcrumb: "من نحن",
};

export function getAuthor(locale: Locale): AuthorCopy {
  return locale === "ar" ? ar : en;
}
