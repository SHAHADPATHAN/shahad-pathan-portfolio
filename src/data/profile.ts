/**
 * Central profile data. Edit here — never inside components.
 */

export type CredibilityMetric = {
  label: string;
  value: string | null;
  hint?: string;
};

export const profile = {
  name: "Shahad Pathan",
  shortName: "Shahad",
  role: "Computer Engineer",
  tagline: "Computer Engineering Student @ GTU ('28) building AI, Data & Software solutions.",
  eyebrow: "Building the future with code",
  footerLine: "Computer Engineer • AI • Data Science • Software",
  summary:
    "I design and build practical, intelligent software — from data-driven models to modern web interfaces. My focus is turning real problems into solutions that are useful, measurable and well engineered.",
  location: "Mehsana, Gujarat, India",
  institution: "Gujarat Technological University (GTU)",
  graduationYear: "2028",
  email: "sahadpathan2697@gmail.com",
  phone: "+919913031752",
  github: "https://github.com/SHAHADPATHAN",
  linkedin: "https://www.linkedin.com/in/shahad-pathan/",
  website: "https://shahadpathan.vercel.app",
  resumePath: "/resume/shahad-pathan-resume.pdf",
  resumeAvailable: false,
  seo: {
    title: "Shahad Pathan",
    description:
      "Shahad Pathan is a Computer Engineering student @ GTU (Class of 2028) building AI, Data Science and modern software solutions.",
  },
} as const;

export const credibilityMetrics: CredibilityMetric[] = [
  { label: "Public Repositories", value: "10+", hint: "10+ Repositories" },
  { label: "Core Focus", value: "AI & Data", hint: "AI / Data Science" },
  { label: "Engineering Major", value: "GTU '28", hint: "Computer Engineering (2024–2028)" },
  { label: "Active Builds", value: "Live", hint: "Wriper & Vidsnap AI" },
];
