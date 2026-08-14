"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n/locale";

/**
 * Keeps <html lang> in step with the chosen locale. The server always renders
 * `lang="en"`, so a returning French visitor needs this on mount too — it
 * matters for screen-reader pronunciation and browser translation prompts.
 */
export function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
