import { AlertTriangle, CheckCircle } from "lucide-react";
import type { Project, ProjectChallenge } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectChallenges({ project }: { project: Project }) {
  const challenges: ProjectChallenge[] =
    project.challenges && project.challenges.length > 0
      ? project.challenges
      : [
          {
            challenge:
              "[ADD CHALLENGE 1] — Describe a performance bottleneck, data inconsistency, or integration constraint encountered.",
            solution:
              "[ADD SOLUTION 1] — Detail the engineering solution implemented to mitigate or resolve the issue.",
          },
          {
            challenge:
              "[ADD CHALLENGE 2] — Describe edge-case failure modes or asynchronous state race conditions.",
            solution:
              "[ADD SOLUTION 2] — Implemented defensive typing, caching strategies, and robust retry logic.",
          },
        ];

  return (
    <section aria-labelledby="project-challenges-heading" className="border-t border-border bg-surface/30 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Engineering"
          title="Challenges & solutions"
          description="Real engineering problems encountered during implementation and how they were systematically resolved."
        />

        <div className="mt-12 space-y-6">
          {challenges.map((item, i) => (
            <ScrollReveal key={i} delay={0.06 * i}>
              <div className="surface-panel grid rounded-2xl p-6 transition-colors hover:border-border-strong sm:p-8 lg:grid-cols-2 lg:gap-8">
                {/* Challenge Column */}
                <div className="pb-6 lg:border-r lg:border-border lg:pr-8 lg:pb-0">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
                      <AlertTriangle className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-destructive uppercase">
                      Challenge 0{i + 1}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
                    {item.challenge}
                  </p>
                </div>

                {/* Solution Column */}
                <div className="pt-6 border-t border-border lg:border-t-0 lg:pt-0 lg:pl-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright">
                      <CheckCircle className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-primary-bright uppercase">
                      Resolution
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.solution}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
