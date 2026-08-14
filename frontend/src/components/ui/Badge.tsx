"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ProductStatus } from "@/lib/types";
import { useI18n } from "@/lib/i18n/locale";

type Tone = "neutral" | "success" | "warn" | "danger" | "accent" | "dark";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-sunken text-ink-muted",
  success: "bg-whatsapp/12 text-whatsapp-dark",
  warn: "bg-amber-100 text-warn",
  danger: "bg-red-50 text-danger",
  accent: "bg-blue-soft text-navy-800",
  dark: "bg-navy-900 text-white",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusTones: Record<ProductStatus, Tone> = {
  in_stock: "success",
  pre_order: "warn",
  out_of_stock: "danger",
};

export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  const { t } = useI18n();

  return (
    <Badge tone={statusTones[status]} className={className}>
      {t.status[status]}
    </Badge>
  );
}
