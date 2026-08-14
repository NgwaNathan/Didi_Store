"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Suspense, useState } from "react";
import { cn } from "@/lib/cn";
import { generalOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  // The mobile search sheet should not survive a navigation. Reconciling during
  // render rather than in an effect avoids a flash of the open sheet.
  const [search, setSearch] = useState({ pathname, open: false });
  if (search.pathname !== pathname) {
    setSearch({ pathname, open: false });
  }
  const searchOpen = search.open;
  const setSearchOpen = (open: boolean) => setSearch({ pathname, open });

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/shop", label: t.nav.shop },
    { href: "/categories", label: t.nav.categories },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4 lg:h-18">
        <Logo />

        <nav aria-label={t.nav.mainNav} className="ml-6 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href) ? "text-navy-900" : "text-ink-muted hover:text-navy-900",
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span aria-hidden className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-navy-900" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Suspense fallback={null}>
            <SearchBar className="hidden w-56 lg:block xl:w-72" />
          </Suspense>

          <LanguageToggle />

          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-expanded={searchOpen}
            aria-controls="mobile-search"
            aria-label={searchOpen ? t.nav.closeSearch : t.nav.openSearch}
            className="grid size-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink lg:hidden"
          >
            {searchOpen ? <X className="size-4.5" /> : <Search className="size-4.5" />}
          </button>

          {/* Wrapper, not a `hidden` class on the button — the button's own
              `inline-flex` is emitted later in the sheet and would win. */}
          <div className="hidden sm:block">
            <ButtonAnchor
              href={generalOrderLink(locale)}
              variant="whatsapp"
              size="sm"
              aria-label={t.nav.orderOnWhatsApp}
              className="max-xl:size-10 max-xl:px-0"
            >
              <WhatsAppIcon className="size-4" />
              {/* Icon-only until xl. At lg the search field appears too, and the
                  French label ("Commander sur WhatsApp") no longer fits. */}
              <span className="hidden xl:inline">{t.nav.orderOnWhatsApp}</span>
            </ButtonAnchor>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div id="mobile-search" className="border-t border-line bg-surface px-4 py-3 lg:hidden">
          <Suspense fallback={null}>
            <SearchBar autoFocus />
          </Suspense>
        </div>
      )}
    </header>
  );
}
