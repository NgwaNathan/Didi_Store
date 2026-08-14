"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ProductCard } from "./ProductCard";

/**
 * Horizontal, snap-scrolling product rail — the shelf pattern used by most
 * storefronts for curated rows. The catalogue itself stays a vertical grid.
 */
/** The edge fades must match whatever surface the rail sits on. */
const fades = {
  canvas: { left: "from-canvas", right: "from-canvas" },
  surface: { left: "from-surface", right: "from-surface" },
} as const;

export function ProductRail({
  products,
  label,
  fade = "canvas",
}: {
  products: Product[];
  label: string;
  fade?: keyof typeof fades;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setEdges({
      start: track.scrollLeft > 4,
      // A 4px slack absorbs sub-pixel rounding at the far end.
      end: track.scrollLeft < maxScroll - 4,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // ResizeObserver fires once on observe, which gives the initial measurement
    // without calling setState synchronously inside the effect body.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const scrollBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrow =
    "grid size-9 place-items-center rounded-full border border-line bg-surface text-ink transition-[opacity,background-color] hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="relative min-w-0">
      <div className="absolute -top-12 right-0 hidden gap-2 md:flex">
        <button type="button" onClick={() => scrollBy(-1)} disabled={!edges.start} aria-label={`Scroll ${label} left`} className={arrow}>
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} disabled={!edges.end} aria-label={`Scroll ${label} right`} className={arrow}>
          <ChevronRight aria-hidden className="size-4" />
        </button>
      </div>

      {/* Fades hint that the row continues past the viewport edge. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r to-transparent transition-opacity",
          fades[fade].left,
          edges.start ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l to-transparent transition-opacity",
          fades[fade].right,
          edges.end ? "opacity-100" : "opacity-0",
        )}
      />

      <ul
        ref={trackRef}
        onScroll={measure}
        aria-label={label}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {products.map((product) => (
          <li key={product.id} className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem]">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
