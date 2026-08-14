import type { CatalogFilters, Product, ProductStatus, SortKey } from "./types";
import { categories } from "./categories";

/** Order matters — this is the order the select and the checkboxes render in. */
export const sortOptions: SortKey[] = ["newest", "price_asc", "price_desc", "name_asc"];

export const availabilityOptions: ProductStatus[] = ["in_stock", "pre_order", "out_of_stock"];

const sortKeys = new Set<string>(sortOptions);
const statusKeys = new Set<string>(availabilityOptions);
const categorySlugs = new Set(categories.map((category) => category.slug));

function toNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/** Reads filters out of the URL, discarding anything unrecognised. */
export function parseFilters(params: URLSearchParams): CatalogFilters {
  const sort = params.get("sort");
  const min = toNumber(params.get("min"));
  const max = toNumber(params.get("max"));

  return {
    query: params.get("q")?.trim() ?? "",
    categories: (params.get("category") ?? "")
      .split(",")
      .map((slug) => slug.trim())
      .filter((slug) => categorySlugs.has(slug)),
    availability: (params.get("availability") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter((value): value is ProductStatus => statusKeys.has(value)),
    minPrice: min,
    maxPrice: max,
    sort: sort && sortKeys.has(sort) ? (sort as SortKey) : "newest",
  };
}

/** Serialises filters back to a query string, omitting defaults so URLs stay short. */
export function buildQuery(filters: CatalogFilters): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.categories.length) params.set("category", filters.categories.join(","));
  if (filters.availability.length) params.set("availability", filters.availability.join(","));
  if (filters.minPrice !== null) params.set("min", String(filters.minPrice));
  if (filters.maxPrice !== null) params.set("max", String(filters.maxPrice));
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  return params.toString();
}

export function activeFilterCount(filters: CatalogFilters): number {
  return (
    filters.categories.length +
    filters.availability.length +
    (filters.query ? 1 : 0) +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0)
  );
}

const comparators: Record<SortKey, (a: Product, b: Product) => number> = {
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  name_asc: (a, b) => a.name.localeCompare(b.name),
};

export function applyFilters(source: Product[], filters: CatalogFilters): Product[] {
  const needle = filters.query.toLowerCase();
  const categoryIds = new Set(
    filters.categories
      .map((slug) => categories.find((category) => category.slug === slug)?.id)
      .filter((id): id is string => Boolean(id)),
  );

  const matched = source.filter((product) => {
    if (categoryIds.size && !categoryIds.has(product.categoryId)) return false;
    if (filters.availability.length && !filters.availability.includes(product.status)) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;

    if (needle) {
      const haystack = `${product.name} ${product.description} ${product.sku}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });

  return matched.sort(comparators[filters.sort]);
}
