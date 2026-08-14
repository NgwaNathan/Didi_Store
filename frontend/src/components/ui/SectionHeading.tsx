import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  align?: "center" | "start";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn(centered && "max-w-2xl")}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-accent">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors hover:text-blue-accent"
        >
          {action.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      )}
    </div>
  );
}
