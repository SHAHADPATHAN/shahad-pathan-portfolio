import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-surface/40 p-8 text-sm text-muted-foreground">
        No projects in this category yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <ScrollReveal key={project.id} delay={0.06 * i} className="h-full">
          <ProjectCard project={project} />
        </ScrollReveal>
      ))}
    </div>
  );
}
