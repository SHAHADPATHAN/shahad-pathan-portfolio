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
    organization: "Gujarat Technological University (GTU) — School of Engineering and Technology",
    period: "June 2024 – May 2028 (Expected)",
    location: "Ahmedabad, Gujarat, India",
    type: "education",
    badgeLabel: "Class of 2028 · In Progress",
    description:
      "Comprehensive 4-year undergraduate engineering degree specializing in Artificial Intelligence, Data Science, Core Computing Systems, and Applied Software Engineering.",
    highlights: [
      "Specialized in Artificial Intelligence, Machine Learning pipelines, Computer Vision architectures, and Predictive Modeling.",
      "Rigorous core curriculum: Data Structures & Algorithms, Object-Oriented Software Design, Database Management Systems, and Operating Systems.",
      "Academic representation: Represented GTU at IIT Guwahati TechExpo and NHAI National Road Safety Hackathon (MoRTH).",
      "Lead capstone builder for AegisAI (Autonomous Disaster & Emergency System) and PRISM (Surveillance Intelligence).",
    ],
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Python",
      "Data Structures & Algorithms",
      "Database Systems (SQL)",
      "C++",
      "Linux Systems",
    ],
  },
  {
    id: "hsc-ssc-school",
    role: "Higher Secondary (H.S.C) & Secondary (S.S.C) — Science Stream",
    organization: "Shri J.M. Chaudhary Sarvajanik Vidyalaya",
    period: "June 2020 – March 2024",
    location: "Mehsana, Gujarat, India",
    type: "education",
    badgeLabel: "STEM Foundation",
    description:
      "Completed secondary (S.S.C) and higher secondary (H.S.C) education in the Science stream with deep foundation in Advanced Mathematics, Physics, and Computer Science.",
    highlights: [
      "Built a solid mathematical and analytical foundation in Calculus, Linear Algebra, and Newtonian Physics.",
      "Active participant in state-level STEM exhibitions, technical competitions, and science symposiums.",
      "Graduated with honors in science and technology fundamentals.",
    ],
    skills: ["Advanced Mathematics", "Physics", "Computer Science Fundamentals", "Analytical Problem Solving"],
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
    badgeLabel: "Web Development",
    description:
      "Built responsive, accessible web applications and dynamic user interfaces applying modern frontend architectures and performance optimization.",
    highlights: [
      "Built responsive, user-friendly web applications by applying modern frontend frameworks and clean component architectures.",
      "Engineered cross-browser responsive layouts, interactive UI states, and mobile-first experiences.",
      "Strengthened practical problem-solving skills through rapid, project-based engineering development sprints.",
    ],
    skills: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3", "Responsive Design", "Git"],
  },
  {
    id: "internshala-isp",
    role: "Internshala Student Partner (ISP)",
    organization: "Internshala",
    period: "April 2025 – November 2025 · 8 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Campus Leadership · 8 mos",
    description:
      "Selected campus representative driving internship awareness, career opportunities, technical upskilling programs, and peer mentorship across university networks.",
    highlights: [
      "Represented Internshala across campus, connecting fellow engineering students with career opportunities and technical trainings.",
      "Coordinated high-impact student engagement campaigns and community outreach initiatives sustained over an 8-month tenure.",
      "Facilitated career readiness workshops, technical webinars, and digital engagement programs across student groups.",
    ],
    skills: ["Community Outreach", "Campus Leadership", "Digital Marketing", "Public Speaking", "Communication"],
  },
  {
    id: "agnirva-space-intern",
    role: "Internship Trainee — Space Systems",
    organization: "Agnirva Space Community (ISRO Registered Space Tutor)",
    period: "November 2024 – January 2025 · 3 mos",
    location: "Gujarat, India",
    workType: "Remote",
    type: "internship",
    badgeLabel: "Space Tech · ISRO Affiliated",
    description:
      "Completed an intensive space technology internship affiliated with ISRO, contributing to satellite architectures, orbital mechanics, and aerospace telemetry analysis.",
    highlights: [
      "Completed an 80-hour rigorous space technology training affiliated with ISRO, studying orbital mechanics and satellite telemetry.",
      "Performed hands-on data analysis using Python and supported project management workflows within a dynamic aerospace startup team.",
      "Collaborated with cross-functional engineering teams to explore orbital trajectories, payload systems, and space research workflows.",
    ],
    skills: ["Space Systems", "Telemetry Analysis", "Python", "Orbital Mechanics", "Project Management", "Data Analytics"],
  },
  {
    id: "rotary-intern",
    role: "Social Work & Community Intern",
    organization: "Rotary International",
    period: "June 2026 – July 2026 · 2 mos",
    location: "Visnagar, Gujarat, India",
    workType: "On-site",
    type: "internship",
    badgeLabel: "Community Welfare",
    description:
      "Spearheaded on-site community welfare initiatives, youth development programs, and collaborative project execution under Rotary International.",
    highlights: [
      "Assisted in local community development drives, educational outreach, and public welfare programs on-ground.",
      "Coordinated with volunteer cohorts and managed logistics for regional community engagement events.",
      "Fostered youth civic engagement and social awareness through structured grassroots initiatives.",
    ],
    skills: ["Community Welfare", "Event Coordination", "Public Relations", "Team Leadership", "Grassroots Operations"],
  },
];

// Unified journey combining Education and all Experience in structured order
export const allJourneyItems: ExperienceItem[] = [
  ...educationList,
  ...experienceList,
];
