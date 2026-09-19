"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type PageTransitionContextValue = {
  navigateWithTransition: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const controls = useAnimationControls();

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (reduced) {
        router.push(href);
        return;
      }

      controls
        .start({ opacity: 1, transition: { duration: 0.25, ease: "easeInOut" } })
        .then(() => {
          router.push(href);
          return new Promise((resolve) => setTimeout(resolve, 150));
        })
        .then(() => controls.start({ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }));
    },
    [controls, reduced, router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-95 bg-background"
      />
    </PageTransitionContext.Provider>
  );
}
