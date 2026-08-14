import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/shop/CatalogView";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { dictionaries } from "@/lib/i18n/dictionary";
import { defaultLocale } from "@/lib/i18n/config";

// Metadata is emitted at build time, so it uses the default locale.
const t = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: t.shop.metaTitle,
  description: t.shop.metaDescription,
};

export default function ShopPage() {
  return (
    <>
      <ShopHeader />
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogView />
      </Suspense>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="container-page grid gap-8 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10 lg:py-10">
      <div className="hidden h-96 rounded-xl border border-line bg-surface lg:block" />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index} className="h-96 animate-pulse rounded-xl border border-line bg-surface" />
        ))}
      </ul>
    </div>
  );
}
