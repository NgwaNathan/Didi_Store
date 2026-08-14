"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { activeFilterCount, applyFilters, buildQuery, parseFilters, sortOptions } from "@/lib/filter";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import type { CatalogFilters } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductRail } from "@/components/product/ProductRail";
import { FilterPanel } from "./FilterPanel";

const PAGE_SIZE = 9;

const counts = categories.reduce<Record<string, number>>((acc, category) => {
  acc[category.id] = products.filter((product) => product.categoryId === category.id).length;
  return acc;
}, {});

export function CatalogView() {
  const router = useRouter();
  const params = useSearchParams();
  const { locale, t } = useI18n();
  const [sheetOpen, setSheetOpen] = useState(false);

  const queryKey = params.toString();
  const filters = useMemo(() => parseFilters(new URLSearchParams(queryKey)), [queryKey]);
  const results = useMemo(() => applyFilters(products, filters), [filters]);
  const activeCount = activeFilterCount(filters);

  // Any change to the filter set restarts paging from the first page. Adjusting
  // during render avoids the extra pass an effect-based reset would cause.
  const [paging, setPaging] = useState({ queryKey, visible: PAGE_SIZE });
  if (paging.queryKey !== queryKey) {
    setPaging({ queryKey, visible: PAGE_SIZE });
  }
  const visible = paging.visible;
  const showMore = () => setPaging((prev) => ({ ...prev, visible: prev.visible + PAGE_SIZE }));

  // Rails are the default browsing view; narrowing the results with a filter or a
  // search makes a flat grid more useful, so it switches until the user overrides.
  const [viewPref, setViewPref] = useState<"rails" | "grid" | null>(null);
  const view = viewPref ?? (activeCount > 0 ? "grid" : "rails");

  const shelves = useMemo(
    () =>
      categories
        .map((category) => ({
          category: localizeCategory(category, locale),
          items: results.filter((product) => product.categoryId === category.id),
        }))
        .filter((shelf) => shelf.items.length > 0),
    [results, locale],
  );

  // The mobile filter sheet locks background scroll while open.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetOpen]);

  const update = useCallback(
    (next: Partial<CatalogFilters>) => {
      const query = buildQuery({ ...filters, ...next });
      router.replace(query ? `/shop?${query}` : "/shop", { scroll: false });
    },
    [filters, router],
  );

  const clearAll = useCallback(() => router.replace("/shop", { scroll: false }), [router]);

  const chips = [
    ...(filters.query ? [{ key: "q", label: `"${filters.query}"`, clear: { query: "" } }] : []),
    ...filters.categories.map((slug) => {
      const match = categories.find((category) => category.slug === slug);
      return {
        key: `cat-${slug}`,
        label: match ? localizeCategory(match, locale).name : slug,
        clear: { categories: filters.categories.filter((item) => item !== slug) },
      };
    }),
    ...filters.availability.map((status) => ({
      key: `av-${status}`,
      label: t.status[status],
      clear: { availability: filters.availability.filter((item) => item !== status) },
    })),
    ...(filters.minPrice !== null || filters.maxPrice !== null
      ? [
          {
            key: "price",
            label: `${filters.minPrice ?? 0} – ${filters.maxPrice ?? "∞"} XAF`,
            clear: { minPrice: null, maxPrice: null },
          },
        ]
      : []),
  ];

  const panel = (
    <FilterPanel
      filters={filters}
      counts={counts}
      onChange={update}
      onClear={clearAll}
      hasActive={activeCount > 0}
    />
  );

  return (
    <div className="container-page grid gap-8 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10 lg:py-10">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
          {panel}
        </div>
      </aside>

      {/* min-w-0: without it this grid item takes its content's min width, so the
          rails widen the page instead of scrolling inside themselves. */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-muted lg:hidden"
          >
            <SlidersHorizontal aria-hidden className="size-4" />
            {t.shop.filters}
            {activeCount > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-navy-900 text-[0.6875rem] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>

          <p aria-live="polite" className="text-sm text-ink-muted">
            {t.common.productCount(results.length)}
          </p>

          <div className="ml-auto flex items-center gap-3">
            <div
              role="group"
              aria-label={t.shop.layout}
              className="hidden items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5 sm:flex"
            >
              {(
                [
                  { key: "rails", Icon: Rows3, label: t.shop.categoryRows },
                  { key: "grid", Icon: LayoutGrid, label: t.shop.grid },
                ] as const
              ).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setViewPref(key)}
                  aria-pressed={view === key}
                  title={label}
                  className={cn(
                    "grid size-8 place-items-center rounded-md transition-colors",
                    view === key ? "bg-navy-900 text-white" : "text-ink-subtle hover:bg-surface-muted",
                  )}
                >
                  <Icon aria-hidden className="size-4" />
                  <span className="sr-only">{label}</span>
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <span className="hidden sm:inline">{t.shop.sortBy}</span>
              <select
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value as CatalogFilters["sort"] })}
                className="h-10 cursor-pointer rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-blue-accent"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {t.shop.sort[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={() => update(chip.clear as Partial<CatalogFilters>)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface py-1.5 pl-3 pr-2 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {chip.label}
                  <X aria-hidden className="size-3.5" />
                  <span className="sr-only">{t.shop.removeFilter}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={clearAll}
                className="px-2 text-xs font-semibold text-blue-accent transition-colors hover:text-navy-900"
              >
                {t.shop.clearAll}
              </button>
            </li>
          </ul>
        )}

        {results.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
            <h2 className="font-display text-lg font-bold text-navy-900">{t.shop.emptyTitle}</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">{t.shop.emptyBody}</p>
            <Button variant="outline" className="mt-6" onClick={clearAll}>
              {t.shop.clearAllFilters}
            </Button>
          </div>
        ) : view === "rails" ? (
          <div className="mt-8 space-y-12">
            {shelves.map(({ category, items }) => (
              <section key={category.id} className="min-w-0">
                {/* Right padding keeps the heading clear of the rail's scroll arrows. */}
                <div className="flex items-end justify-between gap-4 md:pr-24">
                  <div>
                    <h2 className="font-display text-xl font-bold text-navy-900">{category.name}</h2>
                    <p className="mt-1 text-sm text-ink-muted">{category.tagline}</p>
                  </div>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="shrink-0 text-sm font-semibold text-navy-900 transition-colors hover:text-blue-accent"
                  >
                    {t.common.viewAllCount(items.length)}
                  </Link>
                </div>

                <div className="mt-5">
                  <ProductRail products={items} label={t.shop.railLabel(category.name)} />
                </div>
              </section>
            ))}
          </div>
        ) : (
          <>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.slice(0, visible).map((product, index) => (
                <li key={product.id}>
                  <ProductCard product={product} priority={index < 3} />
                </li>
              ))}
            </ul>

            {visible < results.length && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <Button variant="outline" size="lg" onClick={showMore}>
                  {t.shop.loadMore}
                </Button>
                <p className="text-xs text-ink-subtle">
                  {t.shop.showing(Math.min(visible, results.length), results.length)}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={t.shop.closeFilters}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-xs"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.shop.filters}
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-surface p-5 pb-8 shadow-[var(--shadow-float)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <span aria-hidden className="absolute inset-x-0 top-2.5 mx-auto h-1 w-10 rounded-full bg-line-strong" />
              <h2 className="sr-only">{t.shop.filters}</h2>
              <span className="text-sm font-medium text-ink-muted">
                {t.common.productCount(results.length)}
              </span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label={t.shop.closeFilters}
                className="grid size-9 place-items-center rounded-full border border-line text-ink-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            {panel}

            <Button fullWidth size="lg" className="mt-7" onClick={() => setSheetOpen(false)}>
              {t.shop.showResults(results.length)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
