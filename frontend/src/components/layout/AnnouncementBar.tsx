"use client";

import { useI18n } from "@/lib/i18n/locale";

export function AnnouncementBar() {
  const { t } = useI18n();
  const points = [t.announcement.one, t.announcement.two, t.announcement.three];

  return (
    <div className="bg-navy-950 text-white">
      <div className="container-page flex h-9 items-center justify-center gap-3 text-[0.6875rem] font-medium tracking-wide sm:text-xs">
        {points.map((point, index) => (
          <span key={point} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden className="size-1 rounded-full bg-white/30" />}
            <span className={index > 0 ? "hidden sm:inline" : undefined}>{point}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
