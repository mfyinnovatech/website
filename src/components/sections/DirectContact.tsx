import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { getContent, getDict, localeHref, type Locale } from "@/lib/i18n";

/* WhatsApp link with a pre-filled first message naming the page, so each lead
   arrives with its source. Plain links: no script, no cookies, no speed cost. */
export function whatsappHref(number: string, text: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37A9.82 9.82 0 0 1 2.23 12C2.23 6.58 6.63 2.18 12.06 2.18c2.62 0 5.09 1.02 6.94 2.88a9.75 9.75 0 0 1 2.87 6.95c0 5.42-4.4 9.82-9.82 9.82zm8.36-18.18A11.76 11.76 0 0 0 12.05.17C5.5.17.17 5.5.17 12.05c0 2.1.55 4.14 1.59 5.94L.07 24l6.15-1.61a11.85 11.85 0 0 0 5.83 1.48h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.48-8.4z" />
    </svg>
  );
}

/* Direct-contact block for blog posts and landing pages: WhatsApp, both phone
   lines, email and the contact form. */
export function DirectContact({ locale, topic, className = "" }: { locale: Locale; topic: string; className?: string }) {
  const t = getDict(locale).direct;
  const { site } = getContent(locale);
  const labels: Record<string, string> = { KW: t.callKuwait, PK: t.callPakistan };
  return (
    <div className={`rounded-2xl bg-navy p-8 text-white lg:p-10 ${className}`} data-surface="dark">
      <p className="eyebrow text-blue-soft">{t.eyebrow}</p>
      <h2 className="mt-4 font-display text-2xl font-semibold lg:text-3xl">{t.title}</h2>
      <p className="mt-3 max-w-xl text-white/70">{t.text}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={whatsappHref(site.whatsapp, t.prefill(topic))}
          target="_blank"
          rel="noopener"
          className="btn bg-[#25D366] text-navy hover:bg-white"
        >
          <WhatsAppGlyph /> {t.whatsapp}
        </a>
        <Link href={localeHref(locale, "/contact")} className="btn btn-ghost-dark">
          {t.form} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
        </Link>
      </div>
      <ul className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-[15px] sm:grid-cols-3">
        {site.phones.map((ph) => (
          <li key={ph.tel}>
            <a href={`tel:${ph.tel}`} className="inline-flex items-center gap-2 text-white/85 hover:text-white">
              <Phone size={15} className="text-blue-soft" />
              <span className="text-white/55">{labels[ph.country]}</span>
              <span dir="ltr">{ph.display}</span>
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white/85 hover:text-white">
            <Mail size={15} className="text-blue-soft" />
            <span dir="ltr">{site.email}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
