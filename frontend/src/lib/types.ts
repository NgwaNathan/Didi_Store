export type ProductStatus = "in_stock" | "pre_order" | "out_of_stock";

export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  highlights: string[];
  /** Price in XAF, whole units. */
  price: number;
  /** Original price in XAF when the item is discounted. */
  compareAtPrice?: number;
  images: string[];
  categoryId: string;
  stock: number;
  isFeatured: boolean;
  isNew: boolean;
  status: ProductStatus;
  createdAt: string;
};

export type SortKey = "newest" | "price_asc" | "price_desc" | "name_asc";

export type CatalogFilters = {
  query: string;
  categories: string[];
  availability: ProductStatus[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortKey;
};
