"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Point = { x: number; y: number };

type PageTransitionContextValue = {
  navigateWithTransition: (href: string, origin: Point) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

const EASE = [0.76, 0, 0.24, 1] as const;
const BASE_DIAMETER = 20;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const controls = useAnimationControls();
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 });

  const navigateWithTransition = useCallback(
    (href: string, point: Point) => {
      if (reduced) {
        router.push(href);
        return;
      }

      // Radius needed to cover the whole viewport regardless of where the
      // circle starts from — the diagonal is a safe upper bound from any point.
      const coverScale = (Math.hypot(window.innerWidth, window.innerHeight) * 1.15) / (BASE_DIAMETER / 2);

      setOrigin(point);
      controls
        .start({ scale: coverScale, transition: { duration: 0.6, ease: EASE } })
        .then(() => {
          router.push(href);
          // Give the new route a moment to paint before the iris re-opens.
          return new Promise((resolve) => setTimeout(resolve, 300));
        })
        .then(() => controls.start({ scale: 0, transition: { duration: 0.55, ease: EASE, delay: 0.05 } }));
    },
    [controls, reduced, router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <motion.div
        aria-hidden
        initial={{ scale: 0 }}
        animate={controls}
        className="pointer-events-none fixed z-[95] rounded-full bg-accent will-change-transform"
        style={{
          left: origin.x,
          top: origin.y,
          width: BASE_DIAMETER,
          height: BASE_DIAMETER,
          x: "-50%",
          y: "-50%",
        }}
      />
    </PageTransitionContext.Provider>
  );
}
