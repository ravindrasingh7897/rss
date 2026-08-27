import { Award } from "lucide-react";
import { experience } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  const data = experience.map((item) => ({
    title: item.company,
    content: (
      <div key={item.company}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground md:text-base">
              {item.role} <span className="font-normal text-muted-foreground">· {item.location}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{item.period}</p>
          </div>

          <a
            href={item.certificateUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Award size={13} />
            Certificate
          </a>
        </div>

        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm text-muted-foreground sm:text-base">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow="Where I've worked" title="Experience" />
      <Timeline data={data} />
    </section>
  );
}
