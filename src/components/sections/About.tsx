import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CurrentFocusCard } from "@/components/sections/CurrentFocusCard";
import { about, currentFocus } from "@/data/about";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.lead} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <ScrollReveal className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="surface-panel glow-orange rounded-2xl p-6 sm:p-7">
              <p className="eyebrow">Profile</p>
              <p className="mt-3 font-display text-xl font-semibold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
              <dl className="mt-6 divide-y divide-border">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                  >
                    <dt className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-foreground/90">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {currentFocus.map((group, i) => (
            <ScrollReveal key={group.id} delay={0.06 * i} className="h-full">
              <CurrentFocusCard group={group} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
