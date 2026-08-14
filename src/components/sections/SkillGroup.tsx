import type { SkillGroupData } from "@/data/skills";
import { SkillCard } from "@/components/sections/SkillCard";

export function SkillGroup({ group }: { group: SkillGroupData }) {
  const Icon = group.icon;

  return (
    <article className="surface-panel h-full rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary-bright">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold">{group.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-2.5">
        {group.skills.map((skill) => (
          <SkillCard key={`${group.id}-${skill.name}`} skill={skill} />
        ))}
      </ul>
    </article>
  );
}
