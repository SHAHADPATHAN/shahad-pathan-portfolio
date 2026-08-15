/**
 * Centralized data for Awards, Certifications, Credentials, and Recognitions.
 * Extracted from official certificates in the portfolio.
 */

export const awardCategories = [
  "All",
  "Certification",
  "Award",
  "Academic",
  "Hackathon",
] as const;

export type AwardCategory = (typeof awardCategories)[number];

export const domainFilters = [
  "All",
  "AI & Cloud",
  "Data Science",
  "Cybersecurity",
  "Space & Tech",
  "Hackathons",
  "Programming",
] as const;

export type DomainFilter = (typeof domainFilters)[number];

export type AwardItem = {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  category: "Certification" | "Award" | "Academic" | "Hackathon";
  domain: "AI & Cloud" | "Data Science" | "Cybersecurity" | "Space & Tech" | "Hackathons" | "Programming";
  description: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  image: string;
  featured?: boolean;
  signatory?: string;
  badgeText?: string;
};

export const awards: AwardItem[] = [
  {
    id: "nhai-road-safety-hackathon",
    title: "National Road Safety Hackathon 2025",
    organization: "National Highways Authority of India (NHAI & MoRTH)",
    issueDate: "2025",
    category: "Hackathon",
    domain: "Hackathons",
    description:
      "Participated in the National Road Safety Hackathon 2025 jointly organized by NHAI (Ministry of Road Transport & Highways) and HOAI, building AI and data solutions for safer intelligent highways.",
    credentialId: "NHAI-RSH-2025-SP",
    verificationUrl: "https://unstop.com/certificate-preview/d47b9653-f084-46f2-a917-c910fcc38a4e",
    skills: ["AI Road Safety", "Computer Vision", "Intelligent Transportation", "IoT & Sensor Fusion", "NHAI"],
    image: "/certificates/nhai-road-safety-hackathon.jpg",
    featured: true,
    signatory: "NHAI & HOAI Organizing Committee",
    badgeText: "NHAI Hackathon",
  },
  {
    id: "iit-guwahati-tech-expo",
    title: "TechExpo — Indian Institute of Technology (IIT) Guwahati",
    organization: "IIT Guwahati & Unstop",
    issueDate: "2025",
    category: "Academic",
    domain: "Hackathons",
    description:
      "Certificate of participation in TechExpo organized by Indian Institute of Technology (IIT), Guwahati, representing Gujarat Technological University (GTU) with technical project exhibitions.",
    credentialId: "UNSTOP-IITG-TECHEXPO-SP",
    verificationUrl: "https://unstop.com/certificate-preview/2620a4b7-e723-42be-ac0f-85a7b60b9bdb",
    skills: ["Technical Exhibition", "Project Showcase", "IIT Guwahati", "Engineering Innovation", "Unstop"],
    image: "/certificates/iit-guwahati-tech-expo.jpg",
    featured: true,
    signatory: "IIT Guwahati TechExpo Committee",
    badgeText: "IIT Guwahati",
  },
  {
    id: "oracle-cloud-ai-2025",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    organization: "Oracle University",
    issueDate: "February 13, 2026",
    category: "Certification",
    domain: "AI & Cloud",
    description:
      "Recognized by Oracle Corporation for mastering core Artificial Intelligence concepts, Generative AI fundamentals, and Oracle Cloud Infrastructure (OCI) AI services.",
    credentialId: "325886566OCI25AICFA",
    verificationUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=325886566OCI25AICFA",
    skills: ["Oracle Cloud (OCI)", "Artificial Intelligence", "Generative AI", "Cloud Architecture", "Machine Learning"],
    image: "/certificates/oracle-cloud-ai-2025.jpg",
    featured: true,
    signatory: "Damien Carey, SVP Oracle University",
    badgeText: "Oracle Certified",
  },
  {
    id: "ibm-data-science",
    title: "What is Data Science?",
    organization: "IBM (via Coursera)",
    issueDate: "July 06, 2026",
    category: "Certification",
    domain: "Data Science",
    description:
      "Authorized by IBM and offered through Coursera. Explores foundational data science methodologies, big data analytics, statistical modeling, and modern AI algorithms.",
    credentialId: "ERHFN1IDMW5Y",
    verificationUrl: "https://coursera.org/verify/ERHFN1IDMW5Y",
    skills: ["Data Science", "Machine Learning", "Big Data Analytics", "Statistical Analysis", "Data Mining"],
    image: "/certificates/ibm-data-science.jpg",
    featured: true,
    signatory: "Rav Ahuja & Alex Aklson, Ph.D.",
    badgeText: "IBM Verified",
  },
  {
    id: "aws-generative-bi",
    title: "Generative BI with Amazon Q in QuickSight - Getting Started",
    organization: "Amazon Web Services (AWS)",
    issueDate: "February 05, 2026",
    category: "Certification",
    domain: "AI & Cloud",
    description:
      "Official AWS Training completion credential covering Generative BI workflows using Amazon Q inside Amazon QuickSight for natural language executive reporting.",
    credentialId: "AWS-TR-2026-QBI",
    verificationUrl: "https://aws.amazon.com/training/",
    skills: ["Generative BI", "Amazon Q", "AWS QuickSight", "Cloud Analytics", "Business Intelligence"],
    image: "/certificates/aws-generative-bi.jpg",
    featured: true,
    signatory: "Michelle Vaz, Director AWS Training",
    badgeText: "AWS Training",
  },
  {
    id: "isro-agnirva-space-internship",
    title: "The Agnirva Space Internship Program",
    organization: "Agnirva (ISRO Registered Space Tutor)",
    issueDate: "January 12, 2025",
    category: "Academic",
    domain: "Space & Tech",
    description:
      "Completed an intensive 8-week (80 hours, 440 steps) space engineering internship program under an ISRO Registered Space Tutor inaugurated by IN-SPACE (DPIIT Recognised).",
    credentialId: "AGNIRVA-ISRO-2025-SP",
    verificationUrl: "https://agnirva.com",
    skills: ["Space Technology", "Satellite Systems", "Orbital Mechanics", "Aerospace Data Analysis", "IN-SPACE"],
    image: "/certificates/isro-agnirva-space-internship.jpg",
    featured: true,
    signatory: "Framewirk Internet / Agnirva",
    badgeText: "ISRO Space Tutor",
  },
  {
    id: "cisco-networking-basics",
    title: "Networking Basics Course Completion",
    organization: "Cisco Networking Academy",
    issueDate: "August 01, 2026",
    category: "Certification",
    domain: "Cybersecurity",
    description:
      "Student-level credential from Cisco Networking Academy verifying proficiency in network communication architectures, IPv4/IPv6 addressing, routing protocols, and troubleshooting.",
    credentialId: "CISCO-NET-BASICS-2026",
    verificationUrl: "https://www.credly.com/badges/78e55acc-dd92-41a0-bed5-d37d734b90ed",
    skills: ["Computer Networks", "IPv4 / IPv6", "Ethernet Protocols", "Router Configuration", "Network Security"],
    image: "/certificates/cisco-networking-basics.jpg",
    featured: false,
    signatory: "Lynn Bloomer, Director Cisco Academy",
    badgeText: "Cisco Verified",
  },
  {
    id: "python-bootcamp-completion",
    title: "Complete 2026 Python Bootcamp: Learn Python from Scratch",
    organization: "CodeWithHarry",
    issueDate: "February 11, 2026",
    category: "Certification",
    domain: "Programming",
    description:
      "Comprehensive Python mastery curriculum encompassing Object-Oriented Programming (OOP), algorithmic thinking, data structures, and automation scripting.",
    credentialId: "CWH-COMPLETE-PYTHON-BOOTCAMP-LEARN-PYTHON-FROM-SCRATCH-L1T486L3",
    verificationUrl: "https://www.codewithharry.com",
    skills: ["Python 3", "OOP", "Data Structures", "Algorithms", "Backend Scripting"],
    image: "/certificates/python-bootcamp-completion.jpg",
    featured: false,
    signatory: "Harry (Instructor)",
    badgeText: "Python Certified",
  },
  {
    id: "microsoft-ai-workshop",
    title: "5-Day Basics of AI Workshop",
    organization: "TechVritti in partnership with Microsoft",
    issueDate: "November 08, 2024",
    category: "Academic",
    domain: "AI & Cloud",
    description:
      "Intensive Artificial Intelligence workshop conducted with Microsoft Learn Student Ambassadors covering core AI architectures, model fundamentals, and hands-on exercises.",
    credentialId: "MSFT-TECHVRITTI-AI-2024",
    verificationUrl: "https://learn.microsoft.com/credentials/",
    skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Applied AI", "Microsoft Learn"],
    image: "/certificates/microsoft-ai-workshop.jpg",
    featured: false,
    signatory: "K R Vivek, Shalini B H & K S Akshay",
    badgeText: "Microsoft Learn",
  },
  {
    id: "isea-cyber-security-pledge",
    title: "Cyber Security Pledge for Students",
    organization: "Ministry of Electronics & IT (MeitY) / ISEA & C-DAC",
    issueDate: "January 28, 2026",
    category: "Award",
    domain: "Cybersecurity",
    description:
      "National pledge and credential awarded by the Government of India (MeitY, ISEA & C-DAC) recognizing commitment to cyber vigilance, ethical computing, and threat prevention.",
    credentialId: "ISEA/PDG/STUDENT/068708",
    verificationUrl: "https://infosecawareness.in/validate-certificate?certid=ISEA/PDG/STUDENT/068708",
    skills: ["Cybersecurity", "Threat Awareness", "Digital Safety", "Information Security", "MeitY"],
    image: "/certificates/isea-cyber-security-pledge.jpg",
    featured: false,
    signatory: "Shri. Ch A S Murty, Coordinator ISEA",
    badgeText: "Govt. of India",
  },
  {
    id: "isea-email-security",
    title: "National Cyber Security Awareness - Email Security",
    organization: "Ministry of Electronics & IT (MeitY) / ISEA Phase-II",
    issueDate: "2026",
    category: "Award",
    domain: "Cybersecurity",
    description:
      "Successfully participated in the National Cyber Security Awareness initiative and secured 66% in the Email Security & Phishing Defense evaluation conducted by C-DAC and MeitY.",
    credentialId: "ISEA/NCSAM/EMLSEC/33731",
    verificationUrl: "https://infosecawareness.in/validate-certificate?certid=ISEA/NCSAM/EMLSEC/33731",
    skills: ["Email Security", "Phishing Prevention", "Authentication Protocols", "C-DAC", "Information Hygiene"],
    image: "/certificates/isea-email-security.jpg",
    featured: false,
    signatory: "ISEA Coordinator, PMU",
    badgeText: "National Award",
  },
];

export const isAwardPlaceholder = (item: AwardItem) =>
  item.title.startsWith("[ADD") || item.organization.startsWith("[ADD");
