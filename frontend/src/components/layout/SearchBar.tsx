"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/locale";

export function SearchBar({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const { t } = useI18n();
  const urlQuery = params.get("q") ?? "";

  // Adjusting state during render keeps the field in step with the URL when
  // filters are cleared elsewhere, without an effect-driven extra pass.
  const [draft, setDraft] = useState({ syncedWith: urlQuery, value: urlQuery });
  if (draft.syncedWith !== urlQuery) {
    setDraft({ syncedWith: urlQuery, value: urlQuery });
  }
  const value = draft.value;
  const setValue = (next: string) => setDraft({ syncedWith: urlQuery, value: next });

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = value.trim();
        router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
      }}
    >
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t.nav.searchPlaceholder}
        aria-label={t.nav.searchLabel}
        className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle hover:border-line-strong focus:border-blue-accent"
      />
    </form>
  );
}
