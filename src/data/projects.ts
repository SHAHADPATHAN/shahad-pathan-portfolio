/**
 * Reusable project data architecture.
 * Centralized source of truth for all projects and case studies.
 */

export const projectCategories = [
  "AI",
  "Data Science",
  "Web Development",
  "Software",
  "Other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectArchitectureNode = {
  layer: "frontend" | "api" | "backend" | "database" | "ai-model" | "external";
  title: string;
  technologies: string[];
  description?: string;
};

export type ProjectArchitecture = {
  summary?: string;
  nodes?: ProjectArchitectureNode[];
};

export type ProjectChallenge = {
  challenge: string;
  solution: string;
};

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: ProjectCategory;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  gallery?: ProjectGalleryItem[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: ProjectArchitecture | string;
  challenges?: ProjectChallenge[];
  results?: string[];
  lessonsLearned?: string[];
  futureImprovements?: string[];
};

export const projects: Project[] = [
  {
    id: "wriper-ai",
    slug: "wriper-ai",
    title: "Wriper — AI Background Remover",
    shortDescription:
      "High-performance client-and-cloud AI tool for rapid background removal and subject isolation in images.",
    description:
      "Wriper is an intelligent web application designed for fast, accurate background removal. It provides a seamless drag-and-drop workspace that segments foreground subjects with high fidelity, exporting transparent PNGs in seconds.",
    category: "AI",
    technologies: ["TypeScript", "React", "Tailwind CSS", "AI / ML", "Computer Vision"],
    image: "/projects/wriper-ai.png",
    imageAlt: "Wriper AI live web interface",
    gallery: [
      {
        src: "/projects/wriper-ai.png",
        alt: "Wriper AI live workspace with image processing tools",
        caption: "Wriper AI live application running on Vercel.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/SHAHADPATHAN/wriper-ai-background-remover",
    liveUrl: "https://wriper.vercel.app",
    problem:
      "Manual image masking and conventional photo editing tools are slow, tedious, and often require subscription software for simple background removal tasks.",
    solution:
      "Engineered an accessible web interface backed by modern segmentation models that automatically isolates subjects with precise alpha matting, running in-browser with optimistic UI updates.",
    features: [
      "Instant drag-and-drop image upload with real-time preview.",
      "High-precision AI edge detection and foreground masking.",
      "One-click high-resolution PNG export with transparent background.",
      "Responsive, clean dark-mode interface built for speed.",
    ],
    architecture: {
      summary: "Modern client-first architecture connected to high-throughput inference endpoints.",
      nodes: [
        {
          layer: "frontend",
          title: "Web Interface",
          technologies: ["React", "TypeScript", "Tailwind CSS"],
          description: "Canvas preview, image scaling, and interactive mask rendering.",
        },
        {
          layer: "api",
          title: "Inference API",
          technologies: ["REST API / Cloud Edge"],
          description: "Payload validation, base64 / blob streaming, and rate limiting.",
        },
        {
          layer: "ai-model",
          title: "Segmentation Engine",
          technologies: ["U2Net / Background Matting ML"],
          description: "Neural network model isolating subjects and computing alpha masks.",
        },
        {
          layer: "backend",
          title: "Post-Processing",
          technologies: ["Canvas API / Image Buffer"],
          description: "Alpha blending, feathering, and lossless PNG generation.",
        },
      ],
    },
    challenges: [
      {
        challenge: "Handling large resolution images without client-side lag or memory exhaustion.",
        solution: "Implemented client-side down-sampling for preview rendering while performing full-resolution processing during final export.",
      },
      {
        challenge: "Preserving fine details like hair and translucent glass edges.",
        solution: "Applied edge feathering filters and multi-stage thresholding on output masks.",
      },
    ],
    results: [
      "Successfully deployed on Vercel with responsive mobile and desktop support.",
      "Zero-dependency client rendering for preview state changes.",
    ],
    lessonsLearned: [
      "Optimizing client-side image transformations dramatically reduces backend payload sizes.",
      "Clean UI feedback during asynchronous model processing builds user trust.",
    ],
    futureImprovements: [
      "Batch image upload and multi-file background removal queue.",
      "Custom background replacement with color palettes and preset scenes.",
    ],
  },
  {
    id: "vidsnap-ai",
    slug: "vidsnap-ai",
    title: "Vidsnap AI — Video Intelligence Tool",
    shortDescription:
      "AI-driven video intelligence tool for automated frame analysis, snapshot processing, and media indexing.",
    description:
      "Vidsnap AI automates keyframe extraction, scene breakdown, and intelligent snapshot capture from video streams, allowing engineers and creators to index and analyze video content efficiently.",
    category: "AI",
    technologies: ["Python", "AI / ML", "FastAPI", "Computer Vision", "Render"],
    image: "/projects/vidsnap-ai.png",
    imageAlt: "Vidsnap AI live web platform",
    gallery: [
      {
        src: "/projects/vidsnap-ai.png",
        alt: "Vidsnap AI live application dashboard",
        caption: "Vidsnap AI live deployment hosted on Render.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/SHAHADPATHAN/VidsnapAi",
    liveUrl: "https://vidsnapai-k36i.onrender.com",
    problem:
      "Reviewing and capturing high-quality moments from long-form video files is time-consuming and often misses critical scene transitions.",
    solution:
      "Built an automated pipeline that parses video streams, calculates visual difference histograms, and isolates keyframes with intelligent scene categorization.",
    features: [
      "Automated video upload and frame decoding pipeline.",
      "Intelligent scene transition detection based on frame variance.",
      "High-definition snapshot extraction and metadata tagging.",
      "Deployed on Render cloud infrastructure for scalable processing.",
    ],
    architecture: {
      summary: "Python backend pipeline with computer vision processing and cloud hosting.",
      nodes: [
        {
          layer: "frontend",
          title: "Media Dashboard",
          technologies: ["HTML5", "CSS3", "JavaScript"],
          description: "Video player, timestamp markers, and snapshot grid.",
        },
        {
          layer: "api",
          title: "Service Endpoints",
          technologies: ["FastAPI / Python"],
          description: "Asynchronous task handling and video streaming endpoints.",
        },
        {
          layer: "backend",
          title: "Frame Processor",
          technologies: ["OpenCV / Python"],
          description: "Frame extraction, color histogram difference, and threshold filtering.",
        },
        {
          layer: "external",
          title: "Cloud Host",
          technologies: ["Render PaaS"],
          description: "Containerized deployment and static asset delivery.",
        },
      ],
    },
    challenges: [
      {
        challenge: "Managing CPU and RAM consumption during high-definition video decoding.",
        solution: "Streamed video chunks in intervals and processed sampled frames instead of loading complete video arrays into memory.",
      },
    ],
    results: [
      "Live deployment running on Render with active API endpoints.",
    ],
    lessonsLearned: [
      "Asynchronous background processing is essential for long-running video workloads.",
    ],
    futureImprovements: [
      "OCR text detection on extracted video frames.",
      "AI-powered automated summarization and key moment reel generation.",
    ],
  },
  {
    id: "vimabazzar",
    slug: "vimabazzar",
    title: "VimaBazzar — Insurance & Financial Platform",
    shortDescription:
      "Modern, responsive web platform for insurance discovery, policy comparison, and user consulting.",
    description:
      "A clean, responsive web application presenting insurance products, policy quotes, and financial consulting services with an intuitive user interface.",
    category: "Web Development",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "/projects/vimabazzar.png",
    imageAlt: "VimaBazzar live web platform",
    gallery: [
      {
        src: "/projects/vimabazzar.png",
        alt: "VimaBazzar live portal on Vercel",
        caption: "VimaBazzar live website hosted on Vercel.",
      },
    ],
    featured: true,
    githubUrl: "https://github.com/SHAHADPATHAN/vimabazzar",
    liveUrl: "https://vimabazzar.vercel.app/",
    problem:
      "Insurance information is frequently dense and difficult to navigate on mobile devices, leading to high drop-off rates.",
    solution:
      "Crafted an accessible, mobile-first web layout featuring interactive service cards, quote request forms, and rapid page load speeds.",
    features: [
      "Mobile-optimized responsive layout.",
      "Clear policy categorization and service overviews.",
      "Interactive contact and quote inquiry forms.",
    ],
    architecture: {
      summary: "Static web application optimized for fast delivery via global CDN.",
      nodes: [
        {
          layer: "frontend",
          title: "Client Pages",
          technologies: ["HTML5", "CSS3", "JavaScript"],
          description: "Semantic layouts and responsive grids.",
        },
        {
          layer: "external",
          title: "CDN Edge",
          technologies: ["Vercel Edge Network"],
          description: "Global asset caching and SSL termination.",
        },
      ],
    },
    challenges: [
      {
        challenge: "Ensuring 100% responsiveness across both small smartphones and large desktop monitors.",
        solution: "Utilized fluid CSS clamp typography and flexible grid systems.",
      },
    ],
    results: [
      "Successfully launched live on Vercel with smooth client performance.",
    ],
    lessonsLearned: [
      "Prioritizing semantic HTML and low-weight assets ensures instantaneous page loads.",
    ],
    futureImprovements: [
      "Integration of real-time premium calculator widget.",
    ],
  },
  {
    id: "pds-practical",
    slug: "pds-practical",
    title: "Practical Data Science & Statistical Analysis",
    shortDescription:
      "Comprehensive repository of data science workflows, exploratory data analysis (EDA), and machine learning pipelines.",
    description:
      "A structured suite of data science experiments and statistical models demonstrating end-to-end data manipulation, feature engineering, and predictive modeling using standard scientific Python libraries.",
    category: "Data Science",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib"],
    featured: false,
    githubUrl: "https://github.com/SHAHADPATHAN/PDS-PRACTICAL",
    // No liveUrl, so image & gallery are intentionally omitted as requested
    problem:
      "Raw real-world datasets often suffer from high sparsity, missing attributes, skewness, and dimensional redundancy that disrupt machine learning accuracy.",
    solution:
      "Implemented modular data cleaning pipelines, statistical correlation analysis, and regression/classification benchmarks with rigorous cross-validation.",
    features: [
      "Data preprocessing, missing value imputation, and categorical encoding.",
      "Exploratory statistical analysis with distribution visualizations.",
      "Supervised learning model training and hyperparameter optimization.",
      "Performance evaluation via confusion matrices, ROC-AUC, and precision-recall curves.",
    ],
    architecture: {
      summary: "Reproducible data science pipeline from raw ingestion to model evaluation.",
      nodes: [
        {
          layer: "external",
          title: "Raw Data Ingestion",
          technologies: ["CSV / Tabular Datasets"],
          description: "Schema validation and initial data integrity verification.",
        },
        {
          layer: "backend",
          title: "Feature Engineering",
          technologies: ["Pandas", "NumPy"],
          description: "Scaling, encoding, outlier filtering, and dimensionality management.",
        },
        {
          layer: "ai-model",
          title: "Machine Learning",
          technologies: ["Scikit-Learn"],
          description: "Model selection, training, and cross-validation pipelines.",
        },
        {
          layer: "frontend",
          title: "Visual Reports",
          technologies: ["Matplotlib / Seaborn"],
          description: "Statistical plots, correlation heatmaps, and metric tables.",
        },
      ],
    },
    challenges: [
      {
        challenge: "Handling severe class imbalance in classification datasets.",
        solution: "Applied stratified sampling, SMOTE oversampling, and balanced class weights during training.",
      },
    ],
    results: [
      "Modular Python workflows documented and publicly hosted on GitHub.",
    ],
    lessonsLearned: [
      "Feature engineering and domain data understanding provide significantly higher gains than algorithm tuning.",
    ],
    futureImprovements: [
      "Automated pipeline orchestration using DVC (Data Version Control).",
    ],
  },
  {
    id: "env-security",
    slug: "env-security",
    title: "Environment Variable Security & Defensive Audit",
    shortDescription:
      "Security research and defensive analysis demonstrating environment variable misconfigurations and hardening practices.",
    description:
      "A technical investigation into common software vulnerabilities related to environment variables, private token leaks, and system privilege escalation, along with defensive hardening safeguards.",
    category: "Software",
    technologies: ["Python", "Linux", "Security", "Bash", "Automation"],
    featured: false,
    githubUrl: "https://github.com/SHAHADPATHAN/Environmental-Variable-Exploit",
    // No liveUrl, so image & gallery are intentionally omitted as requested
    problem:
      "Improperly sanitized environment variables and inadvertent secret exposures in codebases create critical security vectors for privilege escalation and credential theft.",
    solution:
      "Constructed a proof-of-concept audit tool that scans for misconfigured environment variables, tests permission isolation, and suggests remediation protocols.",
    features: [
      "Automated inspection of environment variable scopes and file permissions.",
      "Demonstration of insecure subprocess inheritance vectors.",
      "Defensive guidelines and secure secret management recipes.",
    ],
    architecture: {
      summary: "Security audit tool running in isolated environments.",
      nodes: [
        {
          layer: "frontend",
          title: "CLI Reporter",
          technologies: ["Python CLI"],
          description: "Structured terminal output with severity indicators.",
        },
        {
          layer: "backend",
          title: "Audit Engine",
          technologies: ["Python / OS Module"],
          description: "Environment tree inspection and permission checking.",
        },
        {
          layer: "external",
          title: "OS Environment",
          technologies: ["Linux / POSIX"],
          description: "Process environment tables and process hierarchy.",
        },
      ],
    },
    challenges: [
      {
        challenge: "Safely demonstrating security vectors without triggering destructive system modifications.",
        solution: "Executed all proof-of-concept tests within isolated containerized sandboxes.",
      },
    ],
    results: [
      "Open-source security educational resource published on GitHub.",
    ],
    lessonsLearned: [
      "Principle of least privilege and strict secret encryption must be applied at every architectural boundary.",
    ],
    futureImprovements: [
      "Automated git pre-commit hook to scan repositories for hardcoded secrets.",
    ],
  },
];

export const isProjectPlaceholder = (value?: string) =>
  !value || value.trim().length === 0 || value.trim().startsWith("[ADD");

export const hasRealProjects = () => projects.some((p) => !isProjectPlaceholder(p.title));

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug || p.id === slug);

export const getRelatedProjects = (currentSlug: string, limit = 2): Project[] => {
  const current = getProjectBySlug(currentSlug);
  if (!current) return projects.slice(0, limit);

  const sameCategory = projects.filter(
    (p) => p.slug !== currentSlug && p.id !== currentSlug && p.category === current.category,
  );
  const differentCategory = projects.filter(
    (p) => p.slug !== currentSlug && p.id !== currentSlug && p.category !== current.category,
  );

  const combined = [...sameCategory, ...differentCategory];
  return combined.slice(0, limit);
};

export const featuredProjects = () => projects.slice(0, 3);

export const otherProjects = () => projects.slice(3);

export const usedCategories = (): ProjectCategory[] =>
  projectCategories.filter((c) => projects.some((p) => p.category === c));
