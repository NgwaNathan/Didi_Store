import type { Category } from "./types";

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=75`;

export const categories: Category[] = [
  {
    id: "photography",
    slug: "photography",
    name: "Photography",
    tagline: "Cameras, lenses and rigs for creators",
    image: u("1526406915894-7bcd65f60845"),
  },
  {
    id: "electronics",
    slug: "electronics",
    name: "Electronics",
    tagline: "Audio, computing and everyday tech",
    image: u("1505740420928-5e560c06d30e"),
  },
  {
    id: "home-kitchen",
    slug: "home-kitchen",
    name: "Home & Kitchen",
    tagline: "Appliances that make home easier",
    image: u("1556909114-f6e7ad7d3136"),
  },
  {
    id: "fitness",
    slug: "fitness",
    name: "Fitness",
    tagline: "Train at home with proper gear",
    image: u("1534438327276-14e5300c3a48"),
  },
  {
    id: "lighting",
    slug: "lighting",
    name: "Lighting",
    tagline: "Studio and continuous lighting",
    image: u("1601506521937-0121a7fc2a6b"),
  },
  {
    id: "wearables",
    slug: "wearables",
    name: "Wearables",
    tagline: "Smartwatches and fitness bands",
    image: u("1523275335684-37898b6baf30"),
  },
];

export const categoryById = new Map(categories.map((c) => [c.id, c]));

export function getCategory(id: string): Category | undefined {
  return categoryById.get(id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
