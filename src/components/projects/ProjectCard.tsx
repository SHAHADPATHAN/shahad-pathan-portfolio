import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github, Code2, Terminal, Globe } from "lucide-react";
import type { Project } from "@/data/projects";
import { isProjectPlaceholder } from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectImage({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative w-full overflow-hidden border-b border-border bg-surface-2">
        {/* Subtle browser mockup header bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-surface/90 px-3.5 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500/70" />
            <span className="size-2 rounded-full bg-amber-500/70" />
            <span className="size-2 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Globe className="size-3 text-primary" />
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {project.liveUrl ? new URL(project.liveUrl).hostname : "live-preview"}
            </span>
          </div>
          <span className="size-2 opacity-0" />
        </div>

        {/* 100% Crisp, Uniform 16:9 Desktop Hero Screenshot */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-surface-2">
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} project screenshot`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  // If no image & no live website, render clean code header
  return (
    <div className="flex items-center justify-between border-b border-border bg-surface-2/60 px-6 py-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Terminal className="size-4 text-primary" aria-hidden="true" />
        <span className="font-mono text-xs text-foreground/80 font-medium">Source Repository</span>
      </div>
      <Code2 className="size-4 text-muted-foreground" aria-hidden="true" />
    </div>
  );
}

function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <li
          key={tech}
          className={cn(
            "rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors duration-300",
            isProjectPlaceholder(tech)
              ? "border-dashed border-border text-muted-foreground"
              : "border-border bg-surface text-foreground/80 group-hover:border-primary/40 group-hover:text-primary-bright",
          )}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const hasGithub = !isProjectPlaceholder(project.githubUrl);
  const hasLive = !isProjectPlaceholder(project.liveUrl);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-border/80 pt-4">
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="group/case inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
      >
        Case Study
        <ArrowRight
          className="size-3.5 transition-transform duration-300 group-hover/case:translate-x-1"
          aria-hidden="true"
        />
      </Link>

      {hasLive ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group/live inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary-bright"
        >
          Live Demo
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      ) : null}

      {hasGithub ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Github className="size-3.5" aria-hidden="true" />
          GitHub
        </a>
      ) : null}
    </div>
  );
}

export function ProjectCard({
  project,
}: {
  project: Project;
  variant?: "default" | "featured";
}) {
  const untitled = isProjectPlaceholder(project.title);

  return (
    <article className="surface-panel glow-orange group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2">
      {/* Visual Header / Full Hero Screenshot */}
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="relative block overflow-hidden"
      >
        <ProjectImage project={project} />
      </Link>

      {/* Body Content — Uniform Height Flex Container */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-semibold text-primary-bright uppercase tracking-wider">
              {project.category}
            </span>
            {project.featured ? (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase text-primary-bright font-medium">
                Featured
              </span>
            ) : null}
          </div>

          <h3
            className={cn(
              "mt-3 font-display text-lg font-bold sm:text-xl",
              untitled && "text-muted-foreground",
            )}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="transition-colors hover:text-primary-bright line-clamp-1"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {isProjectPlaceholder(project.shortDescription)
              ? "[ADD DESCRIPTION] — project details will be added here."
              : project.shortDescription}
          </p>

          <div className="mt-4">
            <TechTags items={project.technologies} />
          </div>
        </div>

        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
