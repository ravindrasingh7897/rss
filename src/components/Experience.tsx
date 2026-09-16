import { Award } from "lucide-react";
import { experience } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  const data = experience.map((item) => ({
    title: item.period,
    content: (
      <div key={item.company} className="rounded-2xl border border-border bg-card/40 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-foreground md:text-xl">{item.company}</h4>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              {item.role} · {item.location}
            </p>
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
            <li
              key={point}
              className="group flex gap-2.5 rounded-lg px-2 py-1 -mx-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground sm:text-base"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-150" />
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
    <section id="experience" className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:pb-16 sm:pt-36">
      <SectionHeading eyebrow="Where I've worked" title="Experience" />
      <Timeline data={data} />
    </section>
  );
}
