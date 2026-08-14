import {
  Braces,
  Boxes,
  Brain,
  Code2,
  Database,
  GitBranch,
  Github,
  Layers,
  LayoutTemplate,
  Palette,
  Container as ContainerIcon,
  Sigma,
  Sparkles,
  Table2,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  icon: LucideIcon;
};

export type SkillGroupData = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
};

/**
 * Centralized, editable skill list. Add or remove entries here only.
 * Keep this list honest — remove anything you would not want to be asked about.
 */
export const skillGroups: SkillGroupData[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core languages I write day to day.",
    icon: Code2,
    skills: [
      { name: "Python", icon: Terminal },
      { name: "C", icon: Braces },
      { name: "C++", icon: Braces },
      { name: "JavaScript", icon: Braces },
      { name: "TypeScript", icon: Braces },
      { name: "SQL", icon: Database },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "Building accessible, responsive interfaces.",
    icon: LayoutTemplate,
    skills: [
      { name: "HTML", icon: LayoutTemplate },
      { name: "CSS", icon: Palette },
      { name: "React", icon: Layers },
      { name: "Next.js", icon: Boxes },
      { name: "Tailwind CSS", icon: Palette },
    ],
  },
  {
    id: "ai-data",
    title: "AI & Data",
    description: "Analysis, modelling and applied AI.",
    icon: Brain,
    skills: [
      { name: "Pandas", icon: Table2 },
      { name: "NumPy", icon: Sigma },
      { name: "Scikit-learn", icon: Brain },
      { name: "Machine Learning", icon: Brain },
      { name: "Generative AI", icon: Sparkles },
      { name: "LLMs", icon: Sparkles },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Storing and querying structured data.",
    icon: Database,
    skills: [
      { name: "SQL", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "[ADD DATABASE]", icon: Database },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "The workflow around the code.",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: Github },
      { name: "VS Code", icon: Code2 },
      { name: "Postman", icon: Wrench },
      { name: "Docker", icon: ContainerIcon },
      { name: "Linux", icon: Terminal },
    ],
  },
];

export const isSkillPlaceholder = (name: string) => name.trim().startsWith("[ADD");
