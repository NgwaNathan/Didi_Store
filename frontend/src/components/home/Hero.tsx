"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, Truck, Headset } from "lucide-react";
import { generalOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * A transparent PNG needs no blend tricks — it sits straight on the page
 * background, so the hero has no image edge to hide.
 */
const HERO_IMAGE = "/hero-products.png";

export function Hero() {
  const { locale, t } = useI18n();

  const assurances = [
    { Icon: Truck, label: t.hero.assurances.delivery },
    { Icon: BadgeCheck, label: t.hero.assurances.genuine },
    { Icon: Headset, label: t.hero.assurances.support },
  ];

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {/* Soft brand wash, and a fade so the hero melts into the next section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[32rem] rounded-full bg-blue-soft/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="container-page relative z-10 grid items-center gap-6 pt-14 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-6 lg:pt-16">
        <div className="pb-2 lg:pb-16">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-accent">{t.hero.eyebrow}</p>

          {/* Steps up at xl, not lg — at 1024px the 3.5rem size wraps line one. */}
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] text-navy-900 sm:text-5xl lg:text-[2.75rem] xl:text-[3.5rem]">
            {t.hero.titleLine1}
            <br />
            <span className="text-blue-accent">{t.hero.titleLine2}</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted">{t.hero.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor href={generalOrderLink(locale)} variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              {t.nav.orderOnWhatsApp}
            </ButtonAnchor>
            <ButtonLink href="/shop" variant="outline" size="lg">
              {t.hero.browseProducts}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {assurances.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-ink-muted">
                <Icon aria-hidden className="size-4 text-blue-accent" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Slight bleed past the container on wide screens gives the lineup presence. */}
        <div className="-mx-4 sm:-mx-6 lg:-mr-8 lg:ml-0 xl:-mr-12">
          <Image
            src={HERO_IMAGE}
            alt={t.hero.imageAlt}
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
