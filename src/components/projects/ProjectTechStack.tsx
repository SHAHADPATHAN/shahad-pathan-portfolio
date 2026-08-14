import { Code2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { isProjectPlaceholder } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

export function ProjectTechStack({ project }: { project: Project }) {
  return (
    <section aria-labelledby="project-tech-heading" className="border-t border-border py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Technology Stack"
          title="Tools & frameworks used"
          description="Technologies selected specifically for the architecture and performance requirements of this project."
        />

        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {project.technologies.map((tech, i) => {
            const isPlaceholder = isProjectPlaceholder(tech);
            return (
              <ScrollReveal key={tech} delay={0.04 * i}>
                <div
                  className={cn(
                    "surface-panel group flex items-center gap-3 rounded-xl p-4 transition-all duration-300",
                    isPlaceholder
                      ? "border-dashed opacity-75"
                      : "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary-bright transition-colors",
                      !isPlaceholder && "group-hover:border-primary/40",
                    )}
                  >
                    <Code2 className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-medium text-foreground sm:text-sm">
                      {tech}
                    </p>
                    <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      {isPlaceholder ? "Pending" : "Integrated"}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
