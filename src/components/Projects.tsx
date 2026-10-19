"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ui/project-card";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LOOP_DURATION_MS = 30000;
const NUDGE_DURATION_MS = 450;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const nudgeRef = useRef<{ active: boolean; from: number; to: number; start: number }>({
    active: false,
    from: 0,
    to: 0,
    start: 0,
  });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const cards = track!.children;
      if (cards.length >= projects.length * 2) {
        const first = cards[0] as HTMLElement;
        const seam = cards[projects.length] as HTMLElement;
        halfWidthRef.current = seam.offsetLeft - first.offsetLeft;
      } else {
        halfWidthRef.current = track!.scrollWidth / 2;
      }
    }
    measure();
    window.addEventListener("resize", measure);

    let rafId: number;
    let lastTime: number | null = null;

    function tick(time: number) {
      rafId = requestAnimationFrame(tick);
      if (lastTime === null) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (nudgeRef.current.active) {
        const elapsed = time - nudgeRef.current.start;
        const t = Math.min(1, elapsed / NUDGE_DURATION_MS);
        const eased = easeOutCubic(t);
        offsetRef.current = nudgeRef.current.from + (nudgeRef.current.to - nudgeRef.current.from) * eased;
        if (t >= 1) {
          offsetRef.current = nudgeRef.current.to;
          nudgeRef.current.active = false;
        }
      } else if (!pausedRef.current && !reducedMotion && halfWidthRef.current > 0) {
        offsetRef.current -= (halfWidthRef.current / LOOP_DURATION_MS) * dt;
        if (offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
      }
      track!.style.transform = `translateX(${offsetRef.current}px)`;
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, [reducedMotion]);

  function nudge(direction: 1 | -1) {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = firstCard.getBoundingClientRect().width + gap;

    let from = offsetRef.current;
    let to = from - direction * step;

    if (halfWidthRef.current > 0) {
      if (to <= -halfWidthRef.current) {
        from += halfWidthRef.current;
        to += halfWidthRef.current;
      } else if (to > 0) {
        from -= halfWidthRef.current;
        to -= halfWidthRef.current;
      }
    }

    offsetRef.current = from;
    nudgeRef.current = { active: true, from, to, start: performance.now() };
  }

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
      <SectionHeading eyebrow="Selected work" title="Projects" />

      <Reveal>
        <div
          className="relative mt-16"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div ref={trackRef} className="flex w-max gap-6">
              {[...projects, ...projects].map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  label={project.label}
                  title={project.title}
                  description={project.description}
                  imgSrc={project.image}
                  link={project.link}
                  className="w-75 shrink-0 sm:w-90 md:w-100"
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll projects left"
            data-cursor-hover
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll projects right"
            data-cursor-hover
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
