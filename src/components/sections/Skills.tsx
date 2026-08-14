import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SkillGroup } from "@/components/sections/SkillGroup";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-border bg-surface/30 py-20 lg:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow="Tech stack"
          title="Tools I build with"
          description="Grouped by how I actually use them — languages, interfaces, data and the workflow around the code."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, i) => (
            <ScrollReveal key={group.id} delay={0.05 * i} className="h-full">
              <SkillGroup group={group} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
