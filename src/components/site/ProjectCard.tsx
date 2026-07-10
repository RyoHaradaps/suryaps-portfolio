import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

const statusTone: Record<Project["status"], string> = {
  Production: "text-foreground",
  Completed: "text-foreground",
  "In Development": "text-foreground",
  Research: "text-foreground",
};

const statusDot: Record<Project["status"], string> = {
  Production: "bg-foreground",
  Completed: "bg-foreground/70",
  "In Development": "bg-foreground animate-pulse",
  Research: "bg-foreground/50",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface group relative flex h-full flex-col overflow-hidden p-8 md:p-10">
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="absolute inset-0 z-10"
        aria-label={`Read case study for ${project.name}`}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border border-border px-2.5 py-1 font-dot text-sm tracking-widest text-subtle">
            {project.category.toUpperCase()}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-dot text-sm tracking-widest ${statusTone[project.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
            {project.status.toUpperCase()}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 font-dot text-sm tracking-widest text-subtle">
            {project.difficulty.toUpperCase()}
          </span>
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} GitHub Repository`}
            className="relative z-20 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
      </div>

      <h3 className="mt-8 font-display text-3xl font-medium leading-[1.05] md:text-[2rem]">
        {project.name}
      </h3>
      <p className="mt-4 text-base text-secondary md:text-lg">{project.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border px-2.5 py-1 font-dot text-sm text-secondary"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}