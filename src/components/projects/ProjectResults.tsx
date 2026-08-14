import { Award, Check } from "lucide-react";
import type { Project } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectResults({ project }: { project: Project }) {
  const results = project.results && project.results.length > 0 ? project.results : [];
  const isDefaultPending =
    results.length === 1 && results[0].toLowerCase().includes("will be added after");

  return (
    <section aria-labelledby="project-results-heading" className="border-t border-border py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Evaluation"
          title="Outcomes & verified results"
          description="Measurable impact and verified deliverables from project execution."
        />

        <div className="mt-10">
          {results.length > 0 && !isDefaultPending ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result, i) => (
                <ScrollReveal key={i} delay={0.06 * i}>
                  <div className="surface-panel flex items-start gap-3.5 rounded-xl p-5 transition-colors hover:border-border-strong">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-bright">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/90">{result}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="surface-panel flex items-center gap-4 rounded-2xl border border-dashed border-border p-6 text-muted-foreground sm:p-8">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright">
                  <Award className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">
                    Evaluation in Progress
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    Results and verified performance benchmarks will be added after formal testing and project evaluation.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
