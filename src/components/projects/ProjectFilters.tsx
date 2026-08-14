import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export type FilterValue = "All" | ProjectCategory;

export function ProjectFilters({
  categories,
  value,
  onChange,
}: {
  categories: ProjectCategory[];
  value: FilterValue;
  onChange: (next: FilterValue) => void;
}) {
  const options: FilterValue[] = ["All", ...categories];

  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
