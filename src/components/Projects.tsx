"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ui/project-card";

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-project-card]") as HTMLElement | null;
    const distance = (card?.offsetWidth ?? 360) + 24;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Selected work" title="Projects" />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll projects left"
            data-cursor-hover
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll projects right"
            data-cursor-hover
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Reveal>
        <div
          ref={scrollerRef}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              data-project-card
              label={project.label}
              title={project.title}
              description={project.description}
              imgSrc={project.image}
              link={project.link}
              className="w-75 shrink-0 snap-start sm:w-90 md:w-100"
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
