import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "whatsapp" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.985] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white hover:bg-navy-800 shadow-[var(--shadow-card)]",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[var(--shadow-card)]",
  outline: "border border-line-strong bg-surface text-ink hover:bg-surface-muted hover:border-ink-subtle",
  ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

export function buttonClass({ variant = "primary", size = "md", fullWidth, className }: Omit<StyleProps, "children">) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<"button">) {
  return (
    <button className={buttonClass({ variant, size, fullWidth, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size, fullWidth, className })} {...props}>
      {children}
    </Link>
  );
}

/** External links (WhatsApp, socials) — always opened in a new tab. */
export function ButtonAnchor({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: StyleProps & ComponentProps<"a">) {
  return (
    <a
      className={buttonClass({ variant, size, fullWidth, className })}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
