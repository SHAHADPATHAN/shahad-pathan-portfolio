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
    role: "Bachelor of Engineering (B.E.), Computer Engineering",
    organization: "Gujarat Technological University (GTU) - School of Engineering and Technology",
    period: "June 2024 – May 2028",
    location: "Ahmedabad, Gujarat, India",
    type: "education",
    badgeLabel: "Degree Program",
    description:
      "Undergraduate engineering degree focused on Artificial Intelligence, Data Science, Core Computing Systems, and Applied Software Engineering.",
    highlights: [
      "Specialized in Artificial Intelligence, Machine Learning, Data Science pipelines, and Computer Vision.",
      "Core Foundations: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Linux.",
      "Graduation Target: Class of 2028 (GTU '28).",
    ],
    skills: ["AI & Machine Learning", "Python", "Data Structures", "Algorithms", "Database Systems"],
  },
  {
    id: "hsc-ssc-school",
    role: "S.S.C and H.S.C (Secondary & Higher Secondary)",
    organization: "Shri J.M. Chaudhary Sarvajanik Vidyalaya",
    period: "June 2020 – March 2024",
    location: "Mehsana, Gujarat, India",
    type: "education",
    badgeLabel: "High School",
    description:
      "Completed secondary (S.S.C) and higher secondary (H.S.C) education with deep focus on Science and Mathematics foundation.",
    highlights: [
      "Rigorous foundation in Mathematics, Physics, and Computer Science fundamentals.",
      "Participated in STEM exhibitions, technical competitions, and academic events.",
    ],
    skills: ["Mathematics", "Physics", "Computer Science", "Analytical Thinking"],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    id: "oasis-web-intern",
    role: "Web Development Intern",
    organization: "Oasis Infobyte",
    period: "September 2025 – October 2025",
    location: "India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Web Dev Internship",
    description:
      "Built responsive, user-friendly websites and digital experiences applying modern web development technologies and design practices.",
    highlights: [
      "Built responsive, user-friendly websites by applying modern web development technologies and design practices.",
      "Strengthened problem-solving skills through practical, project-based development work.",
      "Applied theoretical knowledge to real-world web development challenges.",
    ],
    skills: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
  },
  {
    id: "internshala-isp",
    role: "Internshala Student Partner (ISP)",
    organization: "Internshala",
    period: "April 2025 – November 2025 · 8 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Student Partner (8 mos)",
    description:
      "Represented Internshala on campus, driving internship awareness, career opportunities, and skill development programs.",
    highlights: [
      "Represented Internshala on campus, promoting internship and training opportunities to fellow students.",
      "Coordinated outreach initiatives to drive student engagement over an 8-month partnership.",
      "Organized student workshops and digital engagement campaigns across student networks.",
    ],
    skills: ["Community Outreach", "Digital Marketing", "Student Engagement", "Communication"],
  },
  {
    id: "agnirva-space-intern",
    role: "Internship Trainee",
    organization: "Agnirva.com Space Community (ISRO Affiliated)",
    period: "November 2024 – January 2025 · 3 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Space Internship",
    description:
      "Completed a space technology internship affiliated with ISRO, contributing to innovative space research projects and data workflows.",
    highlights: [
      "Completed a space technology internship affiliated with ISRO, contributing to innovative space research projects.",
      "Performed hands-on data analysis and supported project management within a dynamic startup environment.",
      "Collaborated with cross-functional teams to advance space exploration initiatives.",
    ],
    skills: ["Space Systems", "Data Analysis", "Python", "Project Management", "Research"],
  },
  {
    id: "rotary-intern",
    role: "Social Work Intern",
    organization: "Rotary International",
    period: "June 2026 – July 2026 · 2 mos",
    location: "Visnagar, Gujarat, India",
    workType: "On-site",
    type: "internship",
    badgeLabel: "Social Internship",
    description:
      "Participated in on-site community initiatives, social welfare coordination, and collaborative project execution with Rotary International.",
    highlights: [
      "Assisted in local community development programs and social engagement initiatives.",
      "Coordinated with volunteer groups and managed on-ground event operations.",
    ],
    skills: ["Community Outreach", "Coordination", "Public Relations"],
  },
];

// Unified journey combining Education and all Experience in structured order
export const allJourneyItems: ExperienceItem[] = [
  ...educationList,
  ...experienceList,
];
