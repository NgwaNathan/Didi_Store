import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { store } from "@/lib/store";
import { dictionaries } from "@/lib/i18n/dictionary";
import { defaultLocale } from "@/lib/i18n/config";
import { ProductDetail } from "@/components/product/ProductDetail";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: dictionaries[defaultLocale].product.notFound };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategory(product.categoryId);
  const related = getRelatedProducts(product, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images,
    category: category?.name,
    brand: { "@type": "Brand", name: store.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "XAF",
      availability:
        product.status === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : product.status === "pre_order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} related={related} />
    </>
  );
}
