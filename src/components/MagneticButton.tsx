"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.4,
  radius = 70,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  radius?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const maxDistance = Math.max(rect.width, rect.height) / 2 + radius;
      const distance = Math.hypot(dx, dy);

      if (distance < maxDistance) {
        const pull = (1 - distance / maxDistance) * strength;
        gsap.to(el, { x: dx * pull, y: dy * pull, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, radius]);

  const Component = (href ? "a" : "button") as "a";

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      data-cursor-hover
      className={cn("inline-flex will-change-transform", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
