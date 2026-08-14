"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { getCategory } from "@/lib/categories";
import { discountPercent, formatPrice } from "@/lib/format";
import { productOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory } from "@/lib/i18n/content";
import type { Product } from "@/lib/types";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { locale, t } = useI18n();
  const rawCategory = getCategory(product.categoryId);
  const category = rawCategory ? localizeCategory(rawCategory, locale) : undefined;
  const discount = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.status === "out_of_stock";

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)] transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-4/3 overflow-hidden bg-surface-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 20rem, (min-width: 768px) 33vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            soldOut && "opacity-60 saturate-50",
          )}
        />

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-col items-start gap-1.5">
            {product.isNew && <Badge tone="dark">{t.common.new}</Badge>}
            {discount !== null && <Badge tone="danger">−{discount}%</Badge>}
          </div>
          <StatusBadge status={product.status} className="bg-surface/95 backdrop-blur-sm" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-ink-subtle">
            {category.name}
          </p>
        )}

        {/* Reserves two lines so titles of different lengths keep cards aligned. */}
        <h3 className="mt-1.5 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 hover:text-navy-800">
            <span className="line-clamp-2">{product.name}</span>
          </Link>
        </h3>

        <div className="mt-3 flex min-h-[1.75rem] flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-lg font-bold tracking-tight text-navy-900">
            {formatPrice(product.price, locale)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-ink-subtle line-through">
              {formatPrice(product.compareAtPrice, locale)}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="relative z-10 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-line-strong text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-surface-muted"
          >
            {t.common.viewProduct}
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={productOrderLink(product, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-whatsapp px-3 text-center text-[0.8125rem] font-semibold leading-tight text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-4" />
            {soldOut ? t.common.askAvailability : t.nav.orderOnWhatsApp}
          </a>
        </div>
      </div>
    </article>
  );
}
