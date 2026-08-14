import type { Product } from "./types";
import { formatPrice } from "./format";
import type { Locale } from "./i18n/config";
import { dictionaries } from "./i18n/dictionary";

export const store = {
  name: "Didi Store",
  tagline: "Everything you need. All in one store.",
  description:
    "Premium cameras, electronics, home appliances and fitness gear — browse the catalogue and order in a WhatsApp message.",
  /** International format, digits only, as required by wa.me links. */
  whatsappNumber: "237600000000",
  whatsappDisplay: "+237 6 00 00 00 00",
  email: "hello@didistore.cm",
  city: "Douala, Cameroon",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const;

/** Builds a wa.me deep link with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${store.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productOrderLink(product: Product, locale: Locale = "en"): string {
  return whatsappLink(
    dictionaries[locale].whatsapp.orderMessage(product.name, product.sku, formatPrice(product.price, locale)),
  );
}

export function productEnquiryLink(product: Product, locale: Locale = "en"): string {
  return whatsappLink(dictionaries[locale].whatsapp.enquiryMessage(product.name, product.sku));
}

export function generalOrderLink(locale: Locale = "en"): string {
  return whatsappLink(dictionaries[locale].whatsapp.generalMessage);
}
