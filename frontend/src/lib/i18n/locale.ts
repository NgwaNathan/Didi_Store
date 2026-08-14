"use client";

import { useSyncExternalStore } from "react";
import { dictionaries, type Dict } from "./dictionary";
import { defaultLocale, type Locale } from "./config";

export type { Locale };

const STORAGE_KEY = "didi-store.locale";

function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "fr";
}

/**
 * The locale lives in a tiny external store rather than React state so that
 * `useSyncExternalStore` can hand the server a stable snapshot while the client
 * reads the visitor's saved choice — no hydration mismatch, no effect needed.
 */
let current: Locale | null = null;
const listeners = new Set<() => void>();

function read(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
    // Fall back to the browser's preference the first time round.
    return window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Locale {
  if (current === null) current = read();
  return current;
}

function getServerSnapshot(): Locale {
  return defaultLocale;
}

export function setLocale(next: Locale) {
  if (current === next) return;
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // A blocked storage API should not stop the language from switching.
  }
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useI18n(): { locale: Locale; t: Dict; setLocale: typeof setLocale } {
  const locale = useLocale();
  return { locale, t: dictionaries[locale], setLocale };
}
