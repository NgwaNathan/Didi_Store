import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LocaleSync } from "@/components/layout/LocaleSync";
import { SkipLink } from "@/components/layout/SkipLink";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { store } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://didistore.example"),
  title: {
    default: `${store.name} — ${store.tagline}`,
    template: `%s · ${store.name}`,
  },
  description: store.description,
  keywords: [
    "Didi Store",
    "cameras Cameroon",
    "electronics Douala",
    "home appliances",
    "fitness equipment",
    "WhatsApp shopping",
  ],
  openGraph: {
    type: "website",
    siteName: store.name,
    title: `${store.name} — ${store.tagline}`,
    description: store.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${store.name} — ${store.tagline}`,
    description: store.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      {/* Bottom padding clears the fixed mobile nav. */}
      <body className="min-h-dvh pb-16 md:pb-0">
        <LocaleSync />
        <SkipLink />
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
