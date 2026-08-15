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
  // AI & Data (Data Scientist & AI Engineer Focus)
  { name: "Machine Learning", icon: Brain, category: "AI & Data", level: "Production", description: "Supervised & unsupervised predictive modeling & pipelines" },
  { name: "Computer Vision", icon: Cpu, category: "AI & Data", level: "Production", description: "OpenCV, frame segmentation & neural matting" },
  { name: "Pandas", icon: Table2, category: "AI & Data", level: "Production", description: "Data cleaning, ETL pipelines & statistical EDA" },
  { name: "NumPy", icon: Sigma, category: "AI & Data", level: "Production", description: "Vectorized mathematical computing & numerical tensors" },
  { name: "Scikit-Learn", icon: Brain, category: "AI & Data", level: "Production", description: "Model selection, training pipelines & validation" },
  { name: "Generative AI", icon: Sparkles, category: "AI & Data", level: "Advanced", description: "LLMs, prompt engineering & multimodal AI workflows" },

  // Languages (AI, Data Science & Full-Stack Development)
  { name: "Python", icon: Terminal, category: "Languages", level: "Production", description: "Core AI/Data science, FastAPI & automation stack" },
  { name: "SQL", icon: Database, category: "Languages", level: "Production", description: "Relational queries, analytical aggregations & indexing" },
  { name: "TypeScript", icon: Braces, category: "Languages", level: "Production", description: "Typed web systems, interfaces & frontend architecture" },
  { name: "JavaScript", icon: Braces, category: "Languages", level: "Production", description: "Full-stack web logic, APIs & asynchronous flows" },
  { name: "C++", icon: Code2, category: "Languages", level: "Advanced", description: "Algorithms, data structures & performance computing" },
  { name: "C", icon: Code2, category: "Languages", level: "Advanced", description: "Systems programming, memory management & fundamentals" },

  // Frontend & UI Engineering
  { name: "React.js", icon: Layers, category: "Frontend", level: "Production", description: "Component architectures, custom hooks & state flows" },
  { name: "Next.js", icon: Boxes, category: "Frontend", level: "Production", description: "SSR, server components & modern web builds" },
  { name: "Vite", icon: Sparkles, category: "Frontend", level: "Production", description: "Lightning-fast frontend builds & module bundling" },
  { name: "Tailwind CSS", icon: Palette, category: "Frontend", level: "Production", description: "Modern design systems & responsive utility styling" },
  { name: "HTML5 / CSS3", icon: LayoutTemplate, category: "Frontend", level: "Production", description: "Semantic, accessible layouts & micro-interactions" },

  // Databases & Storage (Data & Backend)
  { name: "PostgreSQL", icon: Database, category: "Databases", level: "Production", description: "ACID transactions, relational schemas & JSON fields" },
  { name: "Supabase", icon: Database, category: "Databases", level: "Production", description: "Postgres-backed realtime DB & Auth backend" },
  { name: "MySQL", icon: Database, category: "Databases", level: "Production", description: "Relational schema design, indexes & queries" },
  { name: "MongoDB", icon: Database, category: "Databases", level: "Advanced", description: "Document collections & NoSQL data aggregation" },

  // Tools & DevOps (AI Engineering & Development)
  { name: "FastAPI", icon: Server, category: "Tools", level: "Production", description: "High-speed async Python REST APIs for ML inference" },
  { name: "Docker", icon: ContainerIcon, category: "Tools", level: "Production", description: "Containerized deployments for AI pipelines & apps" },
  { name: "Git", icon: GitBranch, category: "Tools", level: "Production", description: "Version control, branching & collaborative workflows" },
  { name: "GitHub", icon: Github, category: "Tools", level: "Production", description: "CI/CD automation, open-source repos & project tracking" },
  { name: "Linux", icon: Terminal, category: "Tools", level: "Advanced", description: "Shell scripting, security & production environments" },
  { name: "Vercel", icon: Server, category: "Tools", level: "Production", description: "Edge hosting, serverless CI/CD & web deployments" },
  { name: "Postman", icon: Wrench, category: "Tools", level: "Production", description: "API design, debugging & endpoint test suites" },
  { name: "n8n Automation", icon: Workflow, category: "Tools", level: "Advanced", description: "Automated workflow orchestration & AI integrations" },
  { name: "VS Code", icon: Code2, category: "Tools", level: "Production", description: "Primary IDE, extensions & debugging workflows" },
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

export const isSkillPlaceholder = (name: string) => name.startsWith("[ADD");
