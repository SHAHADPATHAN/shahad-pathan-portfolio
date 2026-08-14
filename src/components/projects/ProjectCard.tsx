import { ArrowUpRight, Github, ImageOff } from "lucide-react";
import type { Project } from "@/data/projects";
import { isProjectPlaceholder } from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectImage({ project, className }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? `${project.title} project screenshot`}
        loading="lazy"
        decoding="async"
        className={cn(
          "size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "grid-backdrop flex size-full flex-col items-center justify-center gap-2 bg-surface-2",
        className,
      )}
      role="img"
      aria-label="Project image not added yet"
    >
      <ImageOff className="size-5 text-muted-foreground" aria-hidden="true" />
      <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted-foreground">
        [ADD IMAGE]
      </span>
    </div>
  );
}

function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <li
          key={tech}
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] uppercase transition-colors duration-300",
            isProjectPlaceholder(tech)
              ? "border-dashed border-border text-muted-foreground"
              : "border-border bg-surface-2 text-foreground/80 group-hover:border-primary/50 group-hover:text-primary-bright",
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
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {hasGithub ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
        >
          <Github className="size-4" aria-hidden="true" />
          GitHub
          <span className="sr-only"> repository for {project.title}</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3.5 py-2 text-sm text-muted-foreground">
          <Github className="size-4" aria-hidden="true" />
          [ADD GITHUB]
        </span>
      )}

      {hasLive ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="group/live inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
        >
          Live demo
          <span className="sr-only"> of {project.title}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3.5 py-2 text-sm text-muted-foreground">
          [ADD LIVE DEMO]
        </span>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  variant = "default",
}: {
  project: Project;
  variant?: "default" | "featured";
}) {
  const untitled = isProjectPlaceholder(project.title);
  const featured = variant === "featured";

  return (
    <article
      className={cn(
        "surface-panel group relative overflow-hidden rounded-2xl transition-all duration-300 hover:border-border-strong hover:shadow-[0_28px_80px_-40px_var(--glow)]",
        featured ? "lg:grid lg:grid-cols-2 lg:items-stretch" : "flex flex-col",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-border",
          featured ? "aspect-16/10 lg:aspect-auto lg:border-r lg:border-b-0" : "aspect-16/10",
        )}
      >
        <ProjectImage project={project} />
      </div>

      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-8")}>
        <div className="flex items-center gap-3">
          <span className="eyebrow">{project.category}</span>
          {featured ? (
            <span className="rounded-full border border-primary/40 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase text-primary-bright">
              Featured
            </span>
          ) : null}
        </div>

        <h3
          className={cn(
            "mt-3 font-display font-semibold",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
            untitled && "text-muted-foreground",
          )}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {isProjectPlaceholder(project.shortDescription)
            ? "[ADD DESCRIPTION] — project details will be added here."
            : project.shortDescription}
        </p>

        <div className="mt-5">
          <TechTags items={project.technologies} />
        </div>

        <div className="mt-auto">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
