import type { Locale } from "./i18n/config";

/** XAF has no minor units, so prices are always rendered as whole numbers. */
export function formatPrice(value: number, locale: Locale = "en"): string {
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  // Intl emits narrow / non-breaking spaces as the French group separator.
  return `${formatted.replace(/[  ]/g, " ")} XAF`;
}

export function discountPercent(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}
