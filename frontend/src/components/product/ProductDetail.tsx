"use client";

import Link from "next/link";
import { BadgeCheck, Check, Headset, MessageCircleQuestion, Truck } from "lucide-react";
import { getCategory } from "@/lib/categories";
import { discountPercent, formatPrice } from "@/lib/format";
import { productEnquiryLink, productOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { localizeCategory, localizeProduct } from "@/lib/i18n/content";
import type { Product } from "@/lib/types";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProductGallery } from "./ProductGallery";
import { ProductRail } from "./ProductRail";

export function ProductDetail({ product: source, related }: { product: Product; related: Product[] }) {
  const { locale, t } = useI18n();

  const product = localizeProduct(source, locale);
  const rawCategory = getCategory(product.categoryId);
  const category = rawCategory ? localizeCategory(rawCategory, locale) : undefined;
  const discount = discountPercent(product.price, product.compareAtPrice);
  const soldOut = product.status === "out_of_stock";

  const assurances = [
    { Icon: Truck, title: t.product.assurances.deliveryTitle, body: t.product.assurances.deliveryBody },
    { Icon: BadgeCheck, title: t.product.assurances.warrantyTitle, body: t.product.assurances.warrantyBody },
    { Icon: Headset, title: t.product.assurances.supportTitle, body: t.product.assurances.supportBody },
  ];

  return (
    <>
      <div className="container-page py-6 lg:py-8">
        <Breadcrumbs
          items={[
            { href: "/", label: t.nav.home },
            { href: "/shop", label: t.nav.shop },
            ...(category ? [{ href: `/shop?category=${category.slug}`, label: category.name }] : []),
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={product.status} />
              {product.isNew && <Badge tone="dark">{t.common.newArrival}</Badge>}
              {discount !== null && <Badge tone="danger">{t.common.save(discount)}</Badge>}
              <span className="text-xs font-medium text-ink-subtle">{t.product.sku(product.sku)}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <p className="font-display text-3xl font-extrabold tracking-tight text-blue-accent sm:text-4xl">
                {formatPrice(product.price, locale)}
              </p>
              {product.compareAtPrice && (
                <p className="text-base text-ink-subtle line-through">
                  {formatPrice(product.compareAtPrice, locale)}
                </p>
              )}
            </div>

            {product.status === "in_stock" && product.stock <= 5 && (
              <p className="mt-2 text-sm font-medium text-warn">{t.product.lowStock(product.stock)}</p>
            )}

            <p className="mt-6 text-sm leading-relaxed text-ink-muted sm:text-base">{product.description}</p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-whatsapp-dark" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonAnchor href={productOrderLink(source, locale)} variant="whatsapp" size="lg" fullWidth>
                <WhatsAppIcon className="size-5" />
                {soldOut ? t.product.askAvailability : t.product.orderNow}
              </ButtonAnchor>
              <ButtonAnchor href={productEnquiryLink(source, locale)} variant="outline" size="lg" fullWidth>
                <MessageCircleQuestion aria-hidden className="size-4.5" />
                {t.product.askQuestion}
              </ButtonAnchor>
              <p className="text-center text-xs text-ink-subtle">{t.product.orderNote}</p>
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-7">
              {assurances.map(({ Icon, title, body }) => (
                <li key={title} className="text-center">
                  <Icon aria-hidden className="mx-auto size-5 text-blue-accent" />
                  <p className="mt-2 text-xs font-semibold text-navy-900">{title}</p>
                  <p className="mt-0.5 text-[0.6875rem] leading-snug text-ink-subtle">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 border-t border-line bg-surface py-14 lg:py-16">
          <div className="container-page">
            {/* Right padding keeps the heading clear of the rail's scroll arrows. */}
            <div className="flex items-end justify-between gap-4 md:pr-24">
              <h2 className="font-display text-2xl font-bold text-navy-900">{t.product.relatedTitle}</h2>
              <Link
                href={category ? `/shop?category=${category.slug}` : "/shop"}
                className="shrink-0 text-sm font-semibold text-navy-900 transition-colors hover:text-blue-accent"
              >
                {t.common.viewAll}
              </Link>
            </div>

            <div className="mt-8">
              <ProductRail products={related} label={t.product.relatedRailLabel} fade="surface" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
