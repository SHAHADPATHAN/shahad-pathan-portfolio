/**
 * Central profile data. Edit here — never inside components.
 * Values wrapped in [ADD ...] are placeholders awaiting real content.
 */

export type CredibilityMetric = {
  label: string;
  /** Real, verified value. Leave null to render a neutral placeholder. */
  value: string | null;
  hint?: string;
};

export const profile = {
  name: "Shahad Pathan",
  shortName: "Shahad",
  role: "Computer Engineer",
  tagline: "Computer Engineer building AI, Data & Software solutions.",
  eyebrow: "Building the future with code",
  footerLine: "Computer Engineer • AI • Data • Software",
  summary:
    "I design and build practical, intelligent software — from data-driven models to modern web interfaces. My focus is turning real problems into solutions that are useful, measurable and well engineered.",
  location: "[ADD LOCATION]",
  email: "[ADD EMAIL]",
  resumePath: "/resume/shahad-pathan-resume.pdf",
  /** Set to true once the PDF is actually placed in public/resume/. */
  resumeAvailable: false,
  seo: {
    title: "Shahad Pathan | Computer Engineer | AI & Data Science",
    description:
      "Shahad Pathan is a Computer Engineering student building AI, Data Science and modern software solutions.",
  },
} as const;

export const credibilityMetrics: CredibilityMetric[] = [
  { label: "Projects", value: null, hint: "[ADD PROJECT COUNT]" },
  { label: "Certifications", value: null, hint: "[ADD CERTIFICATE COUNT]" },
  { label: "Achievements", value: null, hint: "[ADD ACHIEVEMENT COUNT]" },
  { label: "GitHub Contributions", value: null, hint: "[ADD GITHUB DATA]" },
];
