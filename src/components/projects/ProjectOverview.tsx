import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { isProjectPlaceholder } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section aria-labelledby="project-overview-heading" className="border-t border-border py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Overview"
          title="Understanding the challenge"
          description="Context, root problems, and the engineering rationale behind the solution."
        />

        {project.description ? (
          <ScrollReveal className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </ScrollReveal>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Problem Card */}
          <ScrollReveal className="h-full">
            <article className="surface-panel flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-border-strong">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 text-destructive-foreground">
                  <AlertCircle className="size-5 text-destructive" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                    The Problem
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Problem Statement
                  </h3>
                </div>
              </div>

              <div className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                <p>
                  {isProjectPlaceholder(project.problem)
                    ? "[ADD PROBLEM] — Outline the core constraints, manual workflows, data complexities, or performance challenges that required solving."
                    : project.problem}
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* Solution Card */}
          <ScrollReveal delay={0.1} className="h-full">
            <article className="surface-panel flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-border-strong">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary-bright">
                  <CheckCircle2 className="size-5 text-primary-bright" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary-bright">
                    The Solution
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Engineering Approach
                  </h3>
                </div>
              </div>

              <div className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                <p>
                  {isProjectPlaceholder(project.solution)
                    ? "[ADD SOLUTION] — Describe the architecture, algorithms, and interface decisions designed to resolve the stated problem."
                    : project.solution}
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
