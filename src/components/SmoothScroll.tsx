"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_OFFSET = 50;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
        offset: SCROLL_OFFSET,
        duration: 1.2,
      });
    }
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(update);
      document.removeEventListener("click", onClick);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        prevent: (node: HTMLElement) => node.closest("[data-lenis-prevent]") !== null,
      }}
      onScroll={ScrollTrigger.update}
    >
      {children}
    </ReactLenis>
  );
}
