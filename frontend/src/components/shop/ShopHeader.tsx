"use client";

import { Suspense } from "react";
import { useI18n } from "@/lib/i18n/locale";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SearchBar } from "@/components/layout/SearchBar";

export function ShopHeader() {
  const { t } = useI18n();

  return (
    <section className="border-b border-line bg-surface">
      <div className="container-page py-8 lg:py-10">
        <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.shop.breadcrumb }]} />

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
              {t.shop.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">{t.shop.body}</p>
          </div>
          <Suspense fallback={null}>
            <SearchBar className="w-full lg:w-80" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
