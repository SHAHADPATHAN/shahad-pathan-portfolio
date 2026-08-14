import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { credibilityMetrics } from "@/data/profile";

/**
 * Credibility structure only — real numbers appear once supplied in data/profile.ts.
 * Metrics with a null value render a neutral, honest placeholder instead of a fake figure.
 */
export function CredibilityStrip() {
  if (credibilityMetrics.length === 0) return null;

  return (
    <section aria-label="Portfolio highlights" className="border-y border-border bg-surface/40">
      <Container className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
        {credibilityMetrics.map((metric, i) => (
          <ScrollReveal key={metric.label} delay={i * 0.06} className="px-2 py-8 sm:px-6">
            <p className="font-display text-3xl font-semibold sm:text-4xl">
              {metric.value ?? (
                <span className="text-base font-normal text-muted-foreground/60">
                  {metric.hint ?? "—"}
                </span>
              )}
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
              {metric.label}
            </p>
          </ScrollReveal>
        ))}
      </Container>
    </section>
  );
}
