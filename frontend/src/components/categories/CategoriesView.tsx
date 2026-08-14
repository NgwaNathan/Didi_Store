"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { countByCategory, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

function cheapestIn(categoryId: string): number | null {
  const prices = products.filter((product) => product.categoryId === categoryId).map((p) => p.price);
  return prices.length ? Math.min(...prices) : null;
}

export function CategoriesView() {
  const { locale, t } = useI18n();

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ href: "/", label: t.nav.home }, { label: t.categoriesPage.title }]} />
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {t.categoriesPage.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
            {t.categoriesPage.body(products.length, categories.length)}
          </p>
        </div>
      </section>

      <div className="container-page py-10 lg:py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((raw, index) => {
            const category = localizeCategory(raw, locale);
            const from = cheapestIn(category.id);

            return (
              <li key={category.id}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)] transition-[box-shadow,transform,border-color] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-surface-muted">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                      loading={index < 3 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-lg font-bold text-navy-900">{category.name}</h2>
                      <span className="shrink-0 rounded-full bg-surface-sunken px-2.5 py-1 text-[0.6875rem] font-semibold text-ink-muted">
                        {countByCategory(category.id)}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{category.tagline}</p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      {from !== null && (
                        <p className="text-xs text-ink-subtle">
                          {t.common.from}{" "}
                          <span className="font-semibold text-ink">{formatPrice(from, locale)}</span>
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-blue-accent">
                        {t.common.browse}
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
