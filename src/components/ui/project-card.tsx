"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  label?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-cursor-hover
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_35px_-8px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]",
          className
        )}
        {...props}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          {label ? (
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          ) : null}
          <h3 className="mt-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-sm text-muted-foreground sm:text-base">{description}</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
