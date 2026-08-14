"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Store } from "lucide-react";
import { cn } from "@/lib/cn";
import { generalOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function BottomNav() {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  const items = [
    { href: "/", label: t.nav.home, Icon: Home },
    { href: "/shop", label: t.nav.shop, Icon: Store },
    { href: "/categories", label: t.nav.categories, Icon: LayoutGrid },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label={t.nav.mobileNav}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "flex h-16 flex-col items-center justify-center gap-1 px-1 text-center text-[0.6875rem] font-medium leading-tight transition-colors",
                isActive(href) ? "text-navy-900" : "text-ink-subtle",
              )}
            >
              <Icon className={cn("size-5 shrink-0", isActive(href) && "stroke-[2.4]")} />
              {label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href={generalOrderLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 flex-col items-center justify-center gap-1 px-1 text-center text-[0.6875rem] font-semibold leading-tight text-whatsapp-dark"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            {t.nav.whatsapp}
          </a>
        </li>
      </ul>
    </nav>
  );
}
