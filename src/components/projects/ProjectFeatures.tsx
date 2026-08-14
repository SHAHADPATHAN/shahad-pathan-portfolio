import { Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectFeatures({ project }: { project: Project }) {
  const features = project.features && project.features.length > 0
    ? project.features
    : [
        "[ADD FEATURE 1] — Core system capability, data flow or processing functionality.",
        "[ADD FEATURE 2] — Model inference, interface design, or user interaction workflow.",
        "[ADD FEATURE 3] — Performance optimization, state handling, or persistent storage.",
      ];

  return (
    <section aria-labelledby="project-features-heading" className="border-t border-border bg-surface/30 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Key features & system workflow"
          description="Specific engineering features implemented to deliver reliable results."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <ScrollReveal key={`${feature.slice(0, 20)}-${i}`} delay={0.06 * i} className="h-full">
              <article className="surface-panel group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:border-border-strong hover:bg-surface-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-primary-bright transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-foreground/90">
                  {feature}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
