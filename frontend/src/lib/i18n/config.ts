export type Locale = "en" | "fr";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { label: string; full: string }> = {
  en: { label: "EN", full: "English" },
  fr: { label: "FR", full: "Français" },
};
