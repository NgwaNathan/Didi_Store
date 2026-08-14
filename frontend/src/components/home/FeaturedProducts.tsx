"use client";

import { getFeaturedProducts } from "@/lib/products";
import { useI18n } from "@/lib/i18n/locale";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductRail } from "@/components/product/ProductRail";

export function FeaturedProducts() {
  const { t } = useI18n();
  const featured = getFeaturedProducts(8);

  return (
    <section className="border-y border-line bg-surface py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading
          align="start"
          eyebrow={t.featured.eyebrow}
          title={t.featured.title}
          description={t.featured.body}
          action={{ href: "/shop", label: t.featured.action }}
          className="md:pr-24"
        />

        <div className="mt-10">
          <ProductRail products={featured} label={t.featured.railLabel} fade="surface" />
        </div>
      </div>
    </section>
  );
}
