import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getRelatedProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedProjects(currentSlug, 2);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-projects-heading" className="border-t border-border py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="More Work"
            title="Related projects"
            description="Other technical solutions and exploratory builds from the portfolio."
          />

          <Link
            to="/projects"
            className="group hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            All projects
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {related.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.06 * i} className="h-full">
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back to all projects
          </Link>

          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to homepage
          </Link>
        </div>
      </Container>
    </section>
  );
}
