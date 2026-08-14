import type { Metadata } from "next";
import { CategoriesView } from "@/components/categories/CategoriesView";
import { dictionaries } from "@/lib/i18n/dictionary";
import { defaultLocale } from "@/lib/i18n/config";

// Metadata is emitted at build time, so it uses the default locale.
const t = dictionaries[defaultLocale];

export const metadata: Metadata = {
  title: t.categoriesPage.title,
  description: t.categoriesPage.metaDescription,
};

export default function CategoriesPage() {
  return <CategoriesView />;
}
