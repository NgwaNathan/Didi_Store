"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/categories";
import { countByCategory } from "@/lib/products";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Categories are navigation, not content — kept deliberately quiet so the hero
 * and the product rail below keep visual priority.
 */
export function CategoryGrid() {
  const { locale, t } = useI18n();

  return (
    <section className="container-page py-16 lg:py-20">
      <SectionHeading
        align="start"
        eyebrow={t.categorySection.eyebrow}
        title={t.categorySection.title}
        description={t.categorySection.body}
        action={{ href: "/categories", label: t.categorySection.action }}
      />

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((raw) => {
          const category = localizeCategory(raw, locale);
          return (
            <li key={category.id}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex h-full items-center gap-3 rounded-xl border border-line bg-surface p-3 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)] lg:flex-col lg:items-start lg:gap-4 lg:p-4"
              >
                <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-surface-muted lg:size-12">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-navy-900 lg:text-[0.9375rem]">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-subtle">
                    {t.common.productCount(countByCategory(category.id))}
                  </span>
                </span>

                <ChevronRight
                  aria-hidden
                  className="size-4 shrink-0 text-line-strong transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-navy-900 lg:hidden"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
