"use client";

import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { categories } from "@/lib/categories";
import { generalOrderLink, store } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Logo } from "./Logo";

export function Footer() {
  const { locale, t } = useI18n();

  const shopLinks = [
    { href: "/shop", label: t.footer.allProducts },
    { href: "/shop?sort=newest", label: t.footer.newArrivals },
    { href: "/categories", label: t.footer.categories },
  ];

  return (
    <footer className="mt-20 bg-navy-900 text-white/70">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Logo mono />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{t.footer.blurb}</p>
          <a
            href={generalOrderLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-4" />
            {store.whatsappDisplay}
          </a>
        </div>

        <nav aria-label={t.footer.shop} className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold text-white">{t.footer.shop}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.categories} className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold text-white">{t.footer.categories}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm lg:grid-cols-1">
            {categories.map((category) => {
              const localized = localizeCategory(category, locale);
              return (
                <li key={category.id}>
                  <Link href={`/shop?category=${category.slug}`} className="transition-colors hover:text-white">
                    {localized.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold text-white">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-white/40" />
              {store.city}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-white/40" />
              {t.footer.hours}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-white/40" />
              <a href={`mailto:${store.email}`} className="transition-colors hover:text-white">
                {store.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex gap-2 text-xs font-medium">
            {Object.entries(store.socials).map(([name, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-white/8 px-3 py-1.5 capitalize transition-colors hover:bg-white/15 hover:text-white"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights(new Date().getFullYear())}</p>
          <p>{t.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
