import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ChevronRight, Github, Globe } from "lucide-react";
import type { Project } from "@/data/projects";
import { isProjectPlaceholder } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

export function ProjectHero({ project }: { project: Project }) {
  const hasGithub = !isProjectPlaceholder(project.githubUrl);
  const hasLive = !isProjectPlaceholder(project.liveUrl);
  const hasImage = Boolean(project.image);

  return (
    <header className="relative pt-28 pb-12 lg:pt-36 lg:pb-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-strong">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-foreground">
                Projects
              </Link>
            </li>
            <li aria-hidden="true" className="text-border-strong">
              <ChevronRight className="size-3.5" />
            </li>
            <li className="font-medium text-foreground" aria-current="page">
              <span className="line-clamp-1 max-w-[200px] sm:max-w-xs">{project.title}</span>
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          to="/projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to all projects
        </Link>

        <div
          className={cn(
            "grid gap-10 lg:items-start lg:gap-14",
            hasImage ? "lg:grid-cols-[1.1fr_0.9fr]" : "max-w-3xl",
          )}
        >
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">{project.category}</span>
              {project.featured ? (
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase text-primary-bright">
                  Featured Project
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {isProjectPlaceholder(project.shortDescription)
                ? "[ADD SHORT DESCRIPTION] — A high-level overview explaining what this project does and why it was created."
                : project.shortDescription}
            </p>

            {/* Technology tags */}
            <div className="mt-6">
              <p className="mb-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Stack &amp; Technologies
              </p>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-xs tracking-wider uppercase transition-colors",
                      isProjectPlaceholder(tech)
                        ? "border-dashed border-border text-muted-foreground"
                        : "border-border bg-surface-2 text-foreground/90 hover:border-primary/50 hover:text-primary-bright",
                    )}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {hasLive ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
                >
                  Live Demo
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ) : null}

              {hasGithub ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Github className="size-4" aria-hidden="true" />
                  GitHub Repository
                </a>
              ) : null}
            </div>
          </ScrollReveal>

          {/* Hero Visual — Framed and 100% visible with zero cropping */}
          {hasImage ? (
            <ScrollReveal delay={0.15}>
              <div className="surface-panel glow-orange relative overflow-hidden rounded-2xl border border-border bg-surface-2/60">
                {/* Browser bar */}
                <div className="flex items-center justify-between border-b border-border/60 bg-surface/90 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-500/70" />
                    <span className="size-2.5 rounded-full bg-amber-500/70" />
                    <span className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <Globe className="size-3.5 text-primary" />
                    <span className="truncate max-w-[200px]">
                      {project.liveUrl ? new URL(project.liveUrl).hostname : "live-preview"}
                    </span>
                  </div>
                  <span className="size-2.5 opacity-0" />
                </div>

                <div className="flex items-center justify-center bg-black/40 p-2 sm:p-4">
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? `${project.title} screenshot`}
                    className="max-h-[380px] w-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
