/**
 * About + current focus content.
 */

export const about = {
  eyebrow: "About",
  title: "A little about me",
  lead: "I'm a Computer Engineering student @ GTU ('28) who builds intelligent, data-driven applications and modern web solutions.",
  paragraphs: [
    "I am pursuing a Bachelor of Engineering in Computer Engineering at Gujarat Technological University (GTU), graduating in 2028. My primary technical focus sits at the intersection of Artificial Intelligence, Data Science, and full-stack software engineering.",
    "Most of my work involves writing Python for machine learning models and data pipelines, building responsive web interfaces with React and TypeScript, and orchestrating robust backend APIs that serve real users.",
    "I have shipped live tools such as Wriper AI (background removal suite) and Vidsnap AI (automated video intelligence), continuously exploring modern system architecture, data processing, and scalable deployments.",
  ],
  facts: [
    { label: "Degree", value: "B.E. Computer Engineering (2024 – 2028)" },
    { label: "Institution", value: "Gujarat Technological University (GTU) - SET" },
    { label: "Schooling", value: "Shri J.M. Chaudhary Sarvajanik Vidyalaya (HSC/SSC)" },
    { label: "Location", value: "Mahesana, Gujarat, India" },
    { label: "Focus", value: "AI · Data Science · Software" },
    { label: "Status", value: "Open to Internships & AI/Data Roles" },
  ],
} as const;

export type FocusGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const currentFocus: FocusGroup[] = [
  {
    id: "learning",
    title: "Currently learning",
    description: "Deepening theoretical and applied engineering fundamentals.",
    items: ["Advanced Machine Learning", "Data Engineering Pipelines", "System Design", "Algorithms & Data Structures"],
  },
  {
    id: "building",
    title: "Currently building",
    description: "Production-ready software and intelligence tools.",
    items: ["AI-powered computer vision tools", "Full-stack React & TypeScript apps", "RESTful APIs with Python & FastAPI"],
  },
  {
    id: "exploring",
    title: "Currently exploring",
    description: "Emerging paradigms in AI and cloud architecture.",
    items: ["Generative AI & LLMs", "Vector Databases", "Cloud Deployments & Docker", "Automated Security Audits"],
  },
];
