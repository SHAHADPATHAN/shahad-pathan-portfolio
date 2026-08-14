import type { Skill } from "@/data/skills";
import { isSkillPlaceholder } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillCard({ skill }: { skill: Skill }) {
  const placeholder = isSkillPlaceholder(skill.name);
  const Icon = skill.icon;

  return (
    <li
      className={cn(
        "group flex items-center gap-2.5 rounded-xl border border-border bg-surface/60 px-3.5 py-3 transition-all duration-300",
        placeholder
          ? "border-dashed text-muted-foreground"
          : "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2",
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          placeholder ? "text-muted-foreground" : "text-primary-bright",
        )}
        aria-hidden="true"
      />
      <span className="text-sm text-foreground/90">{skill.name}</span>
    </li>
  );
}
