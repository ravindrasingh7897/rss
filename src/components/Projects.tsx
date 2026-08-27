import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltCard } from "@/components/TiltCard";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow="Selected work" title="Projects" />

      <div className="mt-16 space-y-6">
        {projects.map((project) => (
          <Reveal key={project.title}>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="block cursor-pointer"
            >
              <TiltCard className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {project.label}
                      </span>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        <ArrowUpRight
                          size={18}
                          className="transition-transform group-hover:rotate-45"
                        />
                      </div>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-border md:w-2/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </TiltCard>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
