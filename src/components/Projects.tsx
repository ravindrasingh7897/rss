import { projects } from "@/data/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ui/project-card";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow="Selected work" title="Projects" />

      <Reveal>
        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
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
      </Reveal>
    </section>
  );
}
