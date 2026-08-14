"use client";

import { categories } from "@/lib/categories";
import { availabilityOptions } from "@/lib/filter";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import type { CatalogFilters } from "@/lib/types";
import { cn } from "@/lib/cn";

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-sm font-semibold text-navy-900">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 shrink-0 cursor-pointer rounded-xs border-line-strong accent-navy-900"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-ink-subtle">{count}</span>}
    </label>
  );
}

export function FilterPanel({
  filters,
  counts,
  onChange,
  onClear,
  hasActive,
  className,
}: {
  filters: CatalogFilters;
  counts: Record<string, number>;
  onChange: (next: Partial<CatalogFilters>) => void;
  onClear: () => void;
  hasActive: boolean;
  className?: string;
}) {
  const { locale, t } = useI18n();

  const toggle = <T extends string>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-navy-900">{t.shop.filters}</h2>
        {hasActive && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-blue-accent transition-colors hover:text-navy-900"
          >
            {t.shop.clearAll}
          </button>
        )}
      </div>

      <Fieldset legend={t.shop.categoriesLegend}>
        <div className="-my-1.5">
          {categories.map((raw) => {
            const category = localizeCategory(raw, locale);
            return (
              <Checkbox
                key={category.id}
                label={category.name}
                count={counts[category.id] ?? 0}
                checked={filters.categories.includes(category.slug)}
                onChange={() => onChange({ categories: toggle(filters.categories, category.slug) })}
              />
            );
          })}
        </div>
      </Fieldset>

      <Fieldset legend={t.shop.priceLegend}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={t.shop.min}
            aria-label={t.shop.minLabel}
            value={filters.minPrice ?? ""}
            onChange={(event) =>
              onChange({ minPrice: event.target.value === "" ? null : Number(event.target.value) })
            }
            className="h-10 w-full min-w-0 rounded-lg border border-line bg-surface px-3 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-blue-accent"
          />
          <span aria-hidden className="text-ink-subtle">
            –
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={t.shop.max}
            aria-label={t.shop.maxLabel}
            value={filters.maxPrice ?? ""}
            onChange={(event) =>
              onChange({ maxPrice: event.target.value === "" ? null : Number(event.target.value) })
            }
            className="h-10 w-full min-w-0 rounded-lg border border-line bg-surface px-3 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-blue-accent"
          />
        </div>
      </Fieldset>

      <Fieldset legend={t.shop.availabilityLegend}>
        <div className="-my-1.5">
          {availabilityOptions.map((status) => (
            <Checkbox
              key={status}
              label={t.status[status]}
              checked={filters.availability.includes(status)}
              onChange={() => onChange({ availability: toggle(filters.availability, status) })}
            />
          ))}
        </div>
      </Fieldset>
    </div>
  );
}
