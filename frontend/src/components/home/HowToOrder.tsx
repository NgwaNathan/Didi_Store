"use client";

import { generalOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowToOrder() {
  const { locale, t } = useI18n();

  return (
    <section id="how-to-order" className="scroll-mt-24 py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.howToOrder.eyebrow}
          title={t.howToOrder.title}
          description={t.howToOrder.body}
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.howToOrder.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 pt-7 shadow-[var(--shadow-card)]"
            >
              {/* Accent rule carries the eye across the sequence. */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-navy-900/15" />

              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-base font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-line bg-navy-900 px-6 py-10 text-center sm:px-10">
          <h3 className="max-w-lg font-display text-2xl font-bold text-white">{t.howToOrder.ctaTitle}</h3>
          <p className="max-w-md text-sm leading-relaxed text-white/70">{t.howToOrder.ctaBody}</p>
          <ButtonAnchor href={generalOrderLink(locale)} variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" />
            {t.howToOrder.ctaButton}
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
