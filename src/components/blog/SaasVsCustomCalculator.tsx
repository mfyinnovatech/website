"use client";

import { useId, useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

/* SaaS ERP vs custom software: 3- and 5-year cost calculator.
   The formulas match the tables in the article "SaaS vs custom software in the AI era",
   so the defaults rendered on the server equal the published 50-user figures. */

type Plan = { id: string; perUser: number; base: number };
const PLANS: Plan[] = [
  { id: "odoo", perUser: 61, base: 0 },
  { id: "bcEss", perUser: 80, base: 0 },
  { id: "bcPrem", perUser: 110, base: 0 },
  { id: "netsuite", perUser: 150, base: 999 },
];
type Scope = { id: string; impl: number; hours: number; apps: number };
const SCOPES: Scope[] = [
  { id: "lean", impl: 30000, hours: 1500, apps: 250 },
  { id: "standard", impl: 80000, hours: 3500, apps: 600 },
  { id: "broad", impl: 200000, hours: 7000, apps: 1200 },
];
const RATES = [125, 75, 40];
const ADDONS = [0, 20, 30, 40];
const KWD_PER_USD = 0.307;

const PRICE_RISE = 0.05; // yearly SaaS price increase
const SUPPORT = 0.1; // yearly partner support, share of implementation
const MAINT = 0.18; // yearly custom upkeep, share of the build, from year 2

const sumRise = (years: number) => Array.from({ length: years }, (_, i) => (1 + PRICE_RISE) ** i).reduce((a, b) => a + b, 0);

export function computeCosts(o: { users: number; plan: Plan; scope: Scope; rate: number; ai: number; years: number; addons: number }) {
  const licence = (o.plan.base + o.plan.perUser * o.users) * 12;
  const addonFees = o.addons * o.users * 12;
  const erp = o.scope.impl + licence * sumRise(o.years) + SUPPORT * o.scope.impl * o.years;
  /* SaaS: the ERP plus per-seat add-on tools around it */
  const saas = erp + addonFees * sumRise(o.years);
  const build = o.scope.hours * (1 - o.ai) * o.rate;
  const hosting = (100 + 10 * o.users) * 12;
  const custom = build + MAINT * build * (o.years - 1) + hosting * o.years;
  const apps = o.scope.apps * (1 - o.ai) * o.rate;
  /* Hybrid: the same ERP, with small custom apps replacing the add-ons */
  const hybrid = erp + (o.addons > 0 ? apps + MAINT * apps * (o.years - 1) : 0);
  return { licence, saas, build, custom, hybrid };
}

const T = {
  en: {
    title: "SaaS vs custom software cost calculator",
    intro: "Change the inputs to see a 3- and 5-year total cost of ownership. Figures are in US dollars at list prices and market rates, not a quote.",
    users: "Users",
    plan: "SaaS ERP plan (list price, per user per month)",
    plans: { odoo: "Odoo Custom · $61", bcEss: "Business Central Essentials · $80", bcPrem: "Business Central Premium · $110", netsuite: "NetSuite · ~$150 + $999/mo base" },
    scope: "Scope",
    scopes: { lean: "Lean: finance, sales, inventory", standard: "Standard: + purchasing, HR, reporting", broad: "Broad: + manufacturing, multi-company" },
    rate: "Developer rate ($/hour)",
    rates: { 125: "$125 · US agency", 75: "$75 · Eastern Europe", 40: "$40 · offshore" } as Record<number, string>,
    ai: "AI saving on total build effort",
    years: "Years",
    currency: "Currency",
    saas: "SaaS ERP",
    addons: "Add-on SaaS tools around the ERP (per user per month)",
    addonOpt: (a: number) => (a === 0 ? "None (ERP only)" : `$${a}: portal, field service, pricing, HR apps`),
    custom: "Fully custom build",
    hybrid: "SaaS ERP + custom apps",
    saasNote: "Implementation, licences and add-ons rising 5% a year, partner support",
    customNote: "Build, 18% yearly upkeep from year 2, hosting",
    hybridNote: "Same ERP; small custom apps replace the add-on tools",
    cheapest: "Lowest on these inputs",
    detail: (b: string, l: string) => `Custom build cost after AI saving: ${b}. SaaS licences in year 1: ${l}.`,
    caveat: "Custom estimates overrun more often than subscriptions do. Treat a custom total within 20% of the SaaS total as a tie.",
    kwdNote: "KWD at 1 USD = 0.307 KWD.",
  },
  ar: {
    title: "حاسبة تكلفة SaaS مقابل البرمجيات المخصصة",
    intro: "غيّر المدخلات لترى إجمالي تكلفة الملكية على 3 و5 سنوات. الأرقام بالدولار الأمريكي وفق الأسعار المعلنة وأسعار السوق، وليست عرض سعر.",
    users: "عدد المستخدمين",
    plan: "خطة ERP سحابية (السعر المعلن للمستخدم شهرياً)",
    plans: { odoo: "Odoo Custom · 61$", bcEss: "Business Central Essentials · 80$", bcPrem: "Business Central Premium · 110$", netsuite: "NetSuite · نحو 150$ + 999$ شهرياً" },
    scope: "النطاق",
    scopes: { lean: "محدود: المالية والمبيعات والمخزون", standard: "قياسي: + المشتريات والموارد البشرية والتقارير", broad: "واسع: + التصنيع وتعدد الشركات" },
    rate: "سعر ساعة المطوّر (دولار)",
    rates: { 125: "125$ · شركة أمريكية", 75: "75$ · أوروبا الشرقية", 40: "40$ · فريق خارجي" } as Record<number, string>,
    ai: "توفير الذكاء الاصطناعي من إجمالي جهد البناء",
    years: "سنوات",
    currency: "العملة",
    saas: "ERP سحابي (SaaS)",
    addons: "إضافات SaaS حول نظام ERP (للمستخدم شهرياً)",
    addonOpt: (a: number) => (a === 0 ? "لا شيء (ERP فقط)" : `${a}$: بوابة، خدمة ميدانية، تسعير، موارد بشرية`),
    custom: "نظام مخصص بالكامل",
    hybrid: "ERP سحابي + تطبيقات مخصصة",
    saasNote: "التنفيذ، اشتراكات وإضافات ترتفع 5% سنوياً، دعم الشريك",
    customNote: "البناء، صيانة 18% سنوياً من السنة الثانية، الاستضافة",
    hybridNote: "نظام ERP نفسه، وتطبيقات مخصصة صغيرة تستبدل الإضافات",
    cheapest: "الأقل تكلفة بهذه المدخلات",
    detail: (b: string, l: string) => `تكلفة البناء المخصص بعد توفير الذكاء الاصطناعي: ${b}. اشتراكات السنة الأولى: ${l}.`,
    caveat: "تتجاوز تقديرات البرمجيات المخصصة ميزانيتها أكثر من الاشتراكات. اعتبر أي فرق أقل من 20% تعادلاً.",
    kwdNote: "الدينار الكويتي بسعر 1 دولار = 0.307 د.ك.",
  },
};

export function SaasVsCustomCalculator() {
  const { locale } = useLocale();
  const t = locale === "ar" ? T.ar : T.en;
  const uid = useId();
  const [users, setUsers] = useState(50);
  const [planId, setPlanId] = useState("odoo");
  const [scopeId, setScopeId] = useState("standard");
  const [rate, setRate] = useState(40);
  const [ai, setAi] = useState(15);
  const [addons, setAddons] = useState(0);
  const [currency, setCurrency] = useState<"USD" | "KWD">("USD");

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const scope = SCOPES.find((s) => s.id === scopeId) ?? SCOPES[1];

  const results = useMemo(
    () => [3, 5].map((years) => ({ years, ...computeCosts({ users, plan, scope, rate, ai: ai / 100, years, addons }) })),
    [users, plan, scope, rate, ai, addons],
  );

  const fmt = (usd: number) => {
    const v = currency === "KWD" ? usd * KWD_PER_USD : usd;
    const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(v / 1000) * 1000);
    return currency === "KWD" ? `${n} KWD` : `$${n}`;
  };

  const field = "mt-2 h-11 w-full rounded-xl border border-line-2 bg-white px-3 text-[0.95rem] text-ink focus:border-blue focus:outline-none";
  const label = "mono-label block text-ink-3";

  return (
    <section aria-labelledby={`${uid}-h`} className="not-prose mt-10 rounded-2xl border border-line bg-cloud p-5 sm:p-7">
      <p className="eyebrow text-blue">{locale === "ar" ? "حاسبة تفاعلية" : "Interactive calculator"}</p>
      <h3 id={`${uid}-h`} className="mt-3 font-display text-xl font-semibold text-ink">{t.title}</h3>
      <p className="mt-2 text-[0.95rem] text-ink-2">{t.intro}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-users`} className={label}>
            {t.users}: <span className="font-semibold text-ink">{users}</span>
          </label>
          <input
            id={`${uid}-users`}
            type="range"
            min={5}
            max={500}
            step={5}
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="mt-3 w-full accent-blue"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-plan`} className={label}>{t.plan}</label>
          <select id={`${uid}-plan`} value={planId} onChange={(e) => setPlanId(e.target.value)} className={field}>
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>{t.plans[p.id as keyof typeof t.plans]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-scope`} className={label}>{t.scope}</label>
          <select id={`${uid}-scope`} value={scopeId} onChange={(e) => setScopeId(e.target.value)} className={field}>
            {SCOPES.map((s) => (
              <option key={s.id} value={s.id}>{t.scopes[s.id as keyof typeof t.scopes]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-rate`} className={label}>{t.rate}</label>
          <select id={`${uid}-rate`} value={rate} onChange={(e) => setRate(Number(e.target.value))} className={field}>
            {RATES.map((r) => (
              <option key={r} value={r}>{t.rates[r]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-ai`} className={label}>
            {t.ai}: <span className="font-semibold text-ink">{ai}%</span>
          </label>
          <input
            id={`${uid}-ai`}
            type="range"
            min={0}
            max={40}
            step={5}
            value={ai}
            onChange={(e) => setAi(Number(e.target.value))}
            className="mt-4 w-full accent-blue"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-addons`} className={label}>{t.addons}</label>
          <select id={`${uid}-addons`} value={addons} onChange={(e) => setAddons(Number(e.target.value))} className={field}>
            {ADDONS.map((a) => (
              <option key={a} value={a}>{t.addonOpt(a)}</option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className={label}>{t.currency}</legend>
          <div className="mt-2 inline-flex rounded-xl border border-line-2 bg-white p-1" dir="ltr">
            {(["USD", "KWD"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={currency === c}
                onClick={() => setCurrency(c)}
                className={`rounded-lg px-4 py-1.5 font-mono text-sm ${currency === c ? "bg-ink text-white" : "text-ink-2 hover:text-blue"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
        {results.map((r) => {
          const rows = [
            { key: "saas", name: t.saas, note: t.saasNote, value: r.saas },
            { key: "custom", name: t.custom, note: t.customNote, value: r.custom },
            { key: "hybrid", name: t.hybrid, note: t.hybridNote, value: r.hybrid },
          ];
          const min = Math.min(...rows.map((x) => x.value));
          const max = Math.max(...rows.map((x) => x.value));
          return (
            <div key={r.years} className="rounded-xl border border-line bg-white p-4 sm:p-5">
              <p className="font-display text-lg font-semibold text-ink">
                {r.years} {t.years}
              </p>
              <ul className="mt-3 space-y-4">
                {rows.map((x) => (
                  <li key={x.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[0.95rem] font-semibold text-ink">{x.name}</span>
                      <span className="font-mono text-[0.95rem] text-ink" dir="ltr">{fmt(x.value)}</span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-cloud">
                      <div
                        className={`h-2 rounded-full ${x.value === min ? "bg-blue" : "bg-ink-4"}`}
                        style={{ width: `${Math.max(6, (x.value / max) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-ink-3">
                      {x.note}
                      {x.value === min && <span className="font-semibold text-blue"> · {t.cheapest}</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-ink-2">{t.detail(fmt(results[0].build), fmt(results[0].licence))}</p>
      <p className="mt-2 text-sm text-ink-3">
        {t.caveat} {currency === "KWD" && t.kwdNote}
      </p>
    </section>
  );
}
