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
  Cpu,
  Workflow,
  Server,
  type LucideIcon,
} from "lucide-react";

export type SkillLevel = "Core" | "Advanced" | "Production" | "Exploring";

export type Skill = {
  name: string;
  icon: LucideIcon;
  category: "Languages" | "Frontend" | "AI & Data" | "Databases" | "Tools";
  level?: SkillLevel;
  description?: string;
};

export type SkillGroupData = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const allSkillsList: Skill[] = [
  // Languages
  { name: "Python", icon: Terminal, category: "Languages", level: "Core", description: "ML pipelines, FastAPI & Data modeling" },
  { name: "TypeScript", icon: Braces, category: "Languages", level: "Production", description: "Typed web systems & interfaces" },
  { name: "JavaScript", icon: Braces, category: "Languages", level: "Core", description: "Full-stack web logic & APIs" },
  { name: "C++", icon: Code2, category: "Languages", level: "Advanced", description: "Data structures, algorithms & performance" },
  { name: "C", icon: Code2, category: "Languages", level: "Advanced", description: "Systems programming & memory" },
  { name: "SQL", icon: Database, category: "Languages", level: "Production", description: "Relational queries & indexing" },

  // AI & Data
  { name: "Pandas", icon: Table2, category: "AI & Data", level: "Core", description: "Tabular data manipulation & EDA" },
  { name: "NumPy", icon: Sigma, category: "AI & Data", level: "Core", description: "Vectorized mathematical computing" },
  { name: "Scikit-Learn", icon: Brain, category: "AI & Data", level: "Production", description: "Supervised & unsupervised ML" },
  { name: "Computer Vision", icon: Cpu, category: "AI & Data", level: "Production", description: "OpenCV, frame analysis & matting" },
  { name: "Machine Learning", icon: Brain, category: "AI & Data", level: "Core", description: "Predictive modeling & classification" },
  { name: "Generative AI", icon: Sparkles, category: "AI & Data", level: "Exploring", description: "LLMs, prompting & embeddings" },

  // Frontend
  { name: "React", icon: Layers, category: "Frontend", level: "Core", description: "Component systems & state flows" },
  { name: "Next.js", icon: Boxes, category: "Frontend", level: "Production", description: "SSR, routing & modern web builds" },
  { name: "Tailwind CSS", icon: Palette, category: "Frontend", level: "Core", description: "Design systems & responsive styling" },
  { name: "HTML5 / CSS3", icon: LayoutTemplate, category: "Frontend", level: "Core", description: "Semantic, accessible layouts" },

  // Databases
  { name: "MySQL", icon: Database, category: "Databases", level: "Core", description: "Relational schema design, indexes & queries" },
  { name: "Supabase", icon: Database, category: "Databases", level: "Production", description: "Postgres-backed realtime DB & Auth backend" },
  { name: "PostgreSQL", icon: Database, category: "Databases", level: "Production", description: "ACID transactions & JSON fields" },
  { name: "MongoDB", icon: Database, category: "Databases", level: "Exploring", description: "Document store & NoSQL collections" },

  // Tools & DevOps
  { name: "Git", icon: GitBranch, category: "Tools", level: "Core", description: "Version control & collaboration" },
  { name: "GitHub", icon: Github, category: "Tools", level: "Core", description: "CI/CD, repos & open source" },
  { name: "FastAPI", icon: Server, category: "Tools", level: "Production", description: "High-speed async Python REST APIs" },
  { name: "Docker", icon: ContainerIcon, category: "Tools", level: "Production", description: "Containerized application packaging" },
  { name: "Linux / POSIX", icon: Terminal, category: "Tools", level: "Core", description: "Shell scripting, security & environments" },
  { name: "Postman", icon: Wrench, category: "Tools", level: "Core", description: "API design, debugging & testing" },
  { name: "VS Code", icon: Code2, category: "Tools", level: "Core", description: "Primary IDE & debugging workflow" },
  { name: "n8n / Automation", icon: Workflow, category: "Tools", level: "Exploring", description: "Automated workflow orchestration" },
];

export const skillCategories = [
  "All",
  "Languages",
  "AI & Data",
  "Frontend",
  "Databases",
  "Tools",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skillGroups: SkillGroupData[] = [
  {
    id: "languages",
    title: "Languages",
    description: "Core programming languages used for systems, AI models, and web builds.",
    icon: Code2,
    skills: allSkillsList.filter((s) => s.category === "Languages"),
  },
  {
    id: "ai-data",
    title: "AI & Data Science",
    description: "Machine learning, computer vision, data engineering and modeling.",
    icon: Brain,
    skills: allSkillsList.filter((s) => s.category === "AI & Data"),
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    description: "Modern, responsive, and high-performance user interfaces.",
    icon: LayoutTemplate,
    skills: allSkillsList.filter((s) => s.category === "Frontend"),
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Relational data structures, MySQL, Supabase, PostgreSQL and document storage.",
    icon: Database,
    skills: allSkillsList.filter((s) => s.category === "Databases"),
  },
  {
    id: "tools",
    title: "Developer Tools & APIs",
    description: "Workflow orchestration, containerization, and API backends.",
    icon: Wrench,
    skills: allSkillsList.filter((s) => s.category === "Tools"),
  },
];
