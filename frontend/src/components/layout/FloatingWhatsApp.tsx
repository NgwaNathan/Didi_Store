"use client";

import { generalOrderLink } from "@/lib/store";
import { useI18n } from "@/lib/i18n/locale";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Desktop-only: on mobile the bottom nav already carries a WhatsApp action. */
export function FloatingWhatsApp() {
  const { locale, t } = useI18n();

  return (
    <a
      href={generalOrderLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-whatsapp py-4 pl-4 pr-5 text-white shadow-[var(--shadow-float)] transition-[background-color,transform] hover:bg-whatsapp-dark hover:-translate-y-0.5 md:flex"
    >
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[14rem] group-hover:opacity-100">
        {t.whatsapp.chatWith}
      </span>
    </a>
  );
}
