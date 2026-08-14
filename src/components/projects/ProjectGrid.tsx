import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="surface-panel rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        No projects in this category yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <ScrollReveal key={project.id} delay={0.06 * i} className="h-full">
          <ProjectCard project={project} />
        </ScrollReveal>
      ))}
    </div>
  );
}
