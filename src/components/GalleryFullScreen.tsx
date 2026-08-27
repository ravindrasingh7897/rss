"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { HeroCarousel, type HeroCarouselItem } from "@/components/ui/hero-carousel";
import { gallery, site } from "@/data/content";

// Cyberpunk trio used across the site's 3D background — reused here so the
// gallery's per-slide colour grading stays on-brand instead of random hues.
const ACCENTS = ["#22c55e", "#7c3aed", "#06b6d4"];

export function GalleryFullScreen() {
  const router = useRouter();

  const items = useMemo<HeroCarouselItem[]>(
    () =>
      gallery.map((item, i) => ({
        id: i,
        title: item.caption,
        image: item.src,
        accent: ACCENTS[i % ACCENTS.length],
      })),
    []
  );

  return (
    <div data-lenis-prevent className="h-screen w-screen">
      <HeroCarousel
        items={items}
        brand={`${site.name.split(" ")[0]} — Gallery`}
        onBack={() => router.push("/")}
        className="h-full"
      />
    </div>
  );
}
