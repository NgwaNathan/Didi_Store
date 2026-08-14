import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight aria-hidden className="size-3.5 text-line-strong" />}
              {item.href && !last ? (
                <Link href={item.href} className="font-medium transition-colors hover:text-navy-900">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="font-medium text-ink-muted">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
