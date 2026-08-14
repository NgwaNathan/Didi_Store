"use client";

import { useI18n } from "@/lib/i18n/locale";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-extrabold tracking-tight text-line-strong">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{t.notFound.title}</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">{t.notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" size="lg">
          {t.notFound.browse}
        </ButtonLink>
        <ButtonLink href="/" variant="outline" size="lg">
          {t.notFound.home}
        </ButtonLink>
      </div>
    </div>
  );
}
