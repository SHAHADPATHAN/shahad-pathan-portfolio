/**
 * Experience & Education data.
 * Sourced directly from LinkedIn credentials & internships.
 */

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  workType?: "On-site" | "Remote" | "Hybrid" | "Part-time";
  description: string;
  highlights: string[];
  skills?: string[];
  type: "education" | "internship" | "work";
  badgeLabel?: string;
};

export const educationList: ExperienceItem[] = [
  {
    id: "gtu-be-ce",
    role: "Bachelor of Engineering (B.E.) — Computer Engineering",
    organization: "Gujarat Technological University (GTU)",
    period: "2024 – 2028",
    location: "Gujarat, India",
    type: "education",
    badgeLabel: "Degree Program",
    description:
      "Undergraduate engineering program focusing on computer science fundamentals, artificial intelligence, data systems, and software engineering.",
    highlights: [
      "Core Academics: Data Structures & Algorithms, OOP, Database Systems, Machine Learning, Operating Systems.",
      "Applied Engineering: Computer vision pipelines, automated video intelligence, and responsive web systems.",
      "Expected Graduation: Class of 2028 (GTU '28).",
    ],
    skills: ["Computer Engineering", "Data Structures", "Algorithms", "Python", "Database Systems"],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    id: "rotary-intern",
    role: "Social Work Intern",
    organization: "Rotary International",
    period: "Jun 2026 – Jul 2026 · 2 mos",
    location: "Visnagar, Gujarat, India",
    workType: "On-site",
    type: "internship",
    badgeLabel: "Internship",
    description:
      "Participated in on-site community initiatives, social welfare coordination, and collaborative project execution with Rotary International.",
    highlights: [
      "Assisted in local community development programs and social engagement initiatives.",
      "Coordinated with volunteer groups and managed on-ground event operations.",
    ],
    skills: ["Community Outreach", "Coordination", "Public Relations"],
  },
  {
    id: "internshala-isp",
    role: "Internshala Student Partner (ISP)",
    organization: "Internshala",
    period: "Apr 2025 – Nov 2025 · 8 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Internship (8 mos)",
    description:
      "Selected as student partner across consecutive cohorts (Jul–Nov 2025 & Apr–Jun 2025), leading campus outreach and digital marketing.",
    highlights: [
      "Promoted skill development programs and internship opportunities to student networks.",
      "Executed social media marketing campaigns and community engagement drives.",
      "Awarded Certificate of Participation and official Joining Letter credentials.",
    ],
    skills: ["Marketing", "Social Media Marketing", "Campaign Strategy", "Communication"],
  },
  {
    id: "oasis-web-intern",
    role: "Web Development Intern",
    organization: "Oasis Infobyte",
    period: "Sep 2025 – Oct 2025 · 2 mos",
    location: "India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Internship",
    description:
      "Engineered responsive web applications and dynamic user interfaces during a specialized web development and designing internship.",
    highlights: [
      "Developed interactive front-end web components using modern HTML5, CSS3, and JavaScript.",
      "Implemented mobile-first layouts, cross-browser compatibility, and clean code principles.",
      "Received internship completion and performance recognition certificates.",
    ],
    skills: ["Web Development", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
  },
  {
    id: "agnirva-space-intern",
    role: "Internship Trainee",
    organization: "Agnirva.com Space Community",
    period: "Nov 2024 – Jan 2025 · 3 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Space Internship",
    description:
      "Completed a space internship at Agnirva ISRO (Indian Space Research Organisation) space community, contributing to space systems research.",
    highlights: [
      "Engaged in space technology fundamentals, satellite systems architecture, and aerospace research.",
      "Collaborated on innovative technical workflows and space exploration project simulations.",
      "Awarded Certificate of Completion in Space Systems.",
    ],
    skills: ["Space Systems", "Research", "System Design", "Python"],
  },
];

// Unified journey combining Education and all Experience in structured order
export const allJourneyItems: ExperienceItem[] = [
  ...educationList,
  ...experienceList,
];
