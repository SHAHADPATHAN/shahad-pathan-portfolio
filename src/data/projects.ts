/**
 * Reusable project data architecture.
 * Only `id`, `slug`, `title`, `shortDescription`, `category` and `technologies`
 * are required — every deep field is optional and filled in later (Phase 3).
 *
 * Placeholder convention: values starting with "[ADD" are treated as missing
 * and render as honest empty states instead of fake content.
 */

export const projectCategories = [
  "AI",
  "Data Science",
  "Web Development",
  "Software",
  "Other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  /** Imported image module or public path. Leave undefined for a placeholder visual. */
  image?: string;
  imageAlt?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  challenges?: string[];
  results?: string[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
};

/**
 * No real projects supplied yet — these are structural placeholders.
 * Replace the values below; do not add invented metrics or outcomes.
 */
export const projects: Project[] = [
  {
    id: "project-1",
    slug: "project-1",
    title: "[ADD PROJECT]",
    shortDescription: "[ADD DESCRIPTION]",
    category: "AI",
    technologies: ["Python", "[ADD TECH]"],
    featured: true,
  },
  {
    id: "project-2",
    slug: "project-2",
    title: "[ADD PROJECT]",
    shortDescription: "[ADD DESCRIPTION]",
    category: "Data Science",
    technologies: ["Python", "Pandas", "[ADD TECH]"],
  },
  {
    id: "project-3",
    slug: "project-3",
    title: "[ADD PROJECT]",
    shortDescription: "[ADD DESCRIPTION]",
    category: "Web Development",
    technologies: ["React", "TypeScript", "[ADD TECH]"],
  },
];

export const isProjectPlaceholder = (value?: string) =>
  !value || value.trim().length === 0 || value.trim().startsWith("[ADD");

export const hasRealProjects = () => projects.some((p) => !isProjectPlaceholder(p.title));

export const featuredProjects = () => {
  const flagged = projects.filter((p) => p.featured);
  return flagged.length > 0 ? flagged : projects.slice(0, 1);
};

export const otherProjects = () => projects.filter((p) => !featuredProjects().includes(p));

export const usedCategories = (): ProjectCategory[] =>
  projectCategories.filter((c) => projects.some((p) => p.category === c));
