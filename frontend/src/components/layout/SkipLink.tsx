"use client";

import { useI18n } from "@/lib/i18n/locale";

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
    >
      {t.nav.skipToContent}
    </a>
  );
}
