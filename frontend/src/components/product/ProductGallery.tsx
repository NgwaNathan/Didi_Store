"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/locale";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${name} — ${t.product.galleryView(active + 1, images.length)}`}
          fill
          priority
          sizes="(min-width: 1024px) 34rem, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={t.product.showImage(index + 1, images.length)}
                aria-pressed={index === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-surface transition-colors",
                  index === active ? "border-blue-accent" : "border-line hover:border-line-strong",
                )}
              >
                <Image src={image} alt="" fill sizes="8rem" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
