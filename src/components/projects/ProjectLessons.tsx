import { ArrowUpRight, BookOpen, Lightbulb } from "lucide-react";
import type { Project } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectLessons({ project }: { project: Project }) {
  const lessons = project.lessonsLearned && project.lessonsLearned.length > 0
    ? project.lessonsLearned
    : [
        "Importance of rigorous schema modeling prior to implementing UI workflows.",
        "Refactoring for modular separation of concerns simplifies testing and updates.",
      ];

  const improvements = project.futureImprovements && project.futureImprovements.length > 0
    ? project.futureImprovements
    : [
        "Integration of automated regression testing suites in CI pipelines.",
        "Extended caching mechanisms for reduced network overhead.",
      ];

  return (
    <section aria-labelledby="project-lessons-heading" className="border-t border-border bg-surface/30 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Retrospective"
          title="Lessons learned & future enhancements"
          description="Key takeaways from this build and planned technical improvements."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Lessons Learned */}
          <ScrollReveal className="h-full">
            <article className="surface-panel flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-border-strong">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Retrospective
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Lessons Learned
                  </h3>
                </div>
              </div>

              <ul className="mt-6 flex-1 space-y-3.5">
                {lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>

          {/* Future Improvements */}
          <ScrollReveal delay={0.1} className="h-full">
            <article className="surface-panel flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-border-strong">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright">
                  <Lightbulb className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    Roadmap
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    Future Improvements
                  </h3>
                </div>
              </div>

              <ul className="mt-6 flex-1 space-y-3.5">
                {improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
