"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const glowBackground = useMotionTemplate`radial-gradient(200px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || shouldReduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    glowX.set(px * 100);
    glowY.set(py * 100);
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50",
        className
      )}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glowBackground }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span aria-hidden className="revolving-border" />
    </motion.div>
  );
}
