"use client";

import { useState } from "react";
import { Award, ChevronDown } from "lucide-react";
import type { ExperienceItem } from "@/data/content";
import { MagneticButton } from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = item.points.length > 2;

  return (
    <div className="group relative rounded-2xl border border-border bg-card/40 p-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <h4 className="text-lg font-semibold text-foreground md:text-xl">{item.company}</h4>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {item.role} · {item.location}
          </p>
        </div>

        <MagneticButton
          href={item.certificateUrl}
          target="_blank"
          rel="noreferrer"
          strength={0.4}
          radius={50}
          className="group/cert shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent transition-[box-shadow,border-color,background-color,color] duration-200 hover:border-accent hover:bg-accent/20 hover:text-foreground hover:shadow-[0_0_20px_-4px_color-mix(in_srgb,var(--color-accent)_55%,transparent)]"
        >
          <Award
            size={13}
            className="transition-transform duration-300 group-hover/cert:-rotate-12 group-hover/cert:scale-110"
          />
          Certificate
        </MagneticButton>
      </div>

      <ul className="mt-4 space-y-2">
        {item.points.map((point, i) => (
          <li
            key={point}
            className={cn(
              "group/point flex gap-2.5 rounded-lg px-2 py-1 -mx-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-accent sm:text-base",
              i >= 2 && !expanded && "hidden sm:flex"
            )}
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent transition-transform duration-200 group-hover/point:scale-150" />
            {point}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex items-center gap-1 text-xs font-medium text-accent sm:hidden"
        >
          {expanded ? "Show less" : "Show more"}
          <ChevronDown size={14} className={cn("transition-transform duration-200", expanded && "rotate-180")} />
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {item.tech.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </div>

      <span aria-hidden className="revolving-border" />
    </div>
  );
}
