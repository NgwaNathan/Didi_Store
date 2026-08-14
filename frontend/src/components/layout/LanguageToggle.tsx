"use client";

import { locales, localeNames } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";

/**
 * Segmented EN | FR pill. It looks like two options but is a single button, so
 * a click anywhere on it flips the language — including on the highlighted half,
 * which as two separate buttons was a dead click that read as broken.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  const next = locale === "en" ? "fr" : "en";
  const label = t.nav.switchTo(localeNames[next].full);

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      title={label}
      aria-label={label}
      className={cn(
        "flex h-10 shrink-0 items-center gap-0.5 rounded-full border border-line bg-surface p-1 transition-colors hover:border-line-strong",
        className,
      )}
    >
      {locales.map((option) => (
        <span
          key={option}
          aria-hidden
          className={cn(
            "rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors",
            option === locale ? "bg-navy-900 text-white" : "text-ink-subtle",
          )}
        >
          {localeNames[option].label}
        </span>
      ))}
    </button>
  );
}
