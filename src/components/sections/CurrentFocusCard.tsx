import { Check } from "lucide-react";
import type { FocusGroup } from "@/data/about";

export function CurrentFocusCard({ group }: { group: FocusGroup }) {
  return (
    <article className="surface-panel group h-full rounded-2xl p-6 transition-colors duration-300 hover:border-border-strong">
      <h4 className="font-display text-base font-semibold text-foreground">{group.title}</h4>
      <p className="mt-1.5 text-sm text-muted-foreground">{group.description}</p>
      <ul className="mt-5 space-y-2.5">
        {group.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
            <Check
              className="mt-0.5 size-4 shrink-0 text-primary-bright transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
