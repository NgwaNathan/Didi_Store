import Link from "next/link";
import { cn } from "@/lib/cn";
import { store } from "@/lib/store";

export function Logo({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap", className)}
      aria-label={`${store.name} — home`}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-9 place-items-center rounded-lg font-display text-base font-bold tracking-tight transition-transform group-hover:-rotate-3",
          mono ? "bg-white text-navy-900" : "bg-navy-900 text-white",
        )}
      >
        D
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          mono ? "text-white" : "text-navy-900",
        )}
      >
        Didi<span className={mono ? "text-white/60" : "text-ink-subtle"}> Store</span>
      </span>
    </Link>
  );
}
