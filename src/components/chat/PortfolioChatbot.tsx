import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Trash2,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { awards } from "@/data/awards";
import { projects } from "@/data/projects";
import { allSkillsList } from "@/data/skills";
import { experienceList, educationList } from "@/data/experience";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void; icon?: "mail" | "project" | "skill" }[];
}

const INITIAL_SUGGESTIONS = [
  "Who is Shahad Pathan?",
  "What is Google Gemini 2.0 & Antigravity?",
  "Explain Shahad's AI projects (Wriper & VidSnap)",
  "Tell me about his internships & certifications",
  "How does RAG and Vector Embeddings work?",
  "How can I contact or hire Shahad?",
];

function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        // Render code block fences
        if (line.startsWith("```")) {
          return null;
        }

        const parts = line.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
        return (
          <p key={lineIdx} className="leading-relaxed">
            {parts.map((part, partIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={partIdx} className="font-semibold text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith("`") && part.endsWith("`")) {
                return (
                  <code
                    key={partIdx}
                    className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-primary-bright border border-border/60"
                  >
                    {part.slice(1, -1)}
                  </code>
                );
              }
              if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <a
                      key={partIdx}
                      href={match[2]}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-primary-bright underline hover:text-primary transition-colors font-medium inline-flex items-center gap-0.5"
                    >
                      {match[1]}
                      <ArrowUpRight className="size-2.5 inline-block" />
                    </a>
                  );
                }
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reduced = useReducedMotion();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `👋 Hi! I'm **Shahad AI** — an advanced intelligent pair assistant trained on **Shahad Pathan's engineering portfolio**, **Google Gemini & DeepMind AI architectures**, **Data Science pipelines**, and **modern Full-Stack engineering**!\n\nHow can I help you today?`,
      timestamp: "Just now",
      quickActions: [
        {
          label: "👤 About Shahad",
          icon: "skill",
          action: () => handleSend("Who is Shahad Pathan?"),
        },
        {
          label: "✨ Google Gemini & AI",
          icon: "skill",
          action: () => handleSend("Tell me about Google Gemini and Agentic AI"),
        },
        {
          label: "🚀 Top AI Projects",
          icon: "project",
          action: () => handleSend("What are Shahad's top AI projects?"),
        },
        {
          label: "🏆 Certifications & Hackathons",
          icon: "project",
          action: () => handleSend("What certifications and hackathons does Shahad have?"),
        },
        {
          label: "📄 Download Resume",
          action: () => handleSend("Can I download Shahad's resume?"),
        },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Comprehensive Multi-Domain AI Response Engine
  const generateBotResponse = (userQuery: string): { text: string; quickActions?: ChatMessage["quickActions"] } => {
    const q = userQuery.toLowerCase().trim();

    // Helper token checkers
    const has = (...terms: string[]) => terms.some((t) => q.includes(t));
    const hasAll = (...terms: string[]) => terms.every((t) => q.includes(t));

    // -------------------------------------------------------------
    // SECTION 1: GOOGLE, GEMINI & DEEPMIND AI ECOSYSTEM
    // -------------------------------------------------------------

    // Google Gemini Models & Ecosystem
    if (has("gemini", "google gemini", "gemini 1.5", "gemini 2.0", "gemini flash", "gemini pro", "google ai studio", "vertex ai")) {
      return {
        text: `✨ **Google Gemini AI Ecosystem:**\n\nGoogle Gemini is Google's state-of-the-art multimodal AI model family designed from the ground up for native reasoning across text, code, images, audio, and video.\n\n• **Gemini 2.0 Flash / Pro**: Ultra-fast next-generation reasoning, agentic tool orchestration, and low-latency inference.\n• **Gemini 1.5 Pro & Flash**: Breakthrough **2-Million+ token context window** capable of processing hours of video, vast codebases, or massive datasets in a single prompt.\n• **Multimodal Native Architecture**: Simultaneously ingests audio, video, PDFs, images, and text without separate transcriber layers.\n• **Developer Tools**: Google AI Studio, Vertex AI, Function Calling / Tool Calling, Structured JSON Outputs, and Python/Node.js SDKs (\`@google/genai\`).\n• **Gemma 2**: Google's high-efficiency lightweight open-weights models (2B, 9B, 27B) built on Gemini research.`,
        quickActions: [
          {
            label: "🤖 What is Antigravity AI?",
            action: () => handleSend("What is Antigravity AI agent?"),
          },
          {
            label: "🧠 How does RAG work?",
            action: () => handleSend("Explain RAG and vector embeddings"),
          },
          {
            label: "🚀 Shahad's AI Projects",
            icon: "project",
            action: () => handleSend("What are Shahad's top AI projects?"),
          },
        ],
      };
    }

    // Google Antigravity & Agentic AI
    if (has("antigravity", "agentic", "ai agent", "deepmind", "tool calling", "subagent", "google deepmind")) {
      return {
        text: `🧠 **Google Antigravity & Agentic AI Architecture:**\n\n**Antigravity** represents advanced agentic pair-programming workflows developed by Google DeepMind researchers:\n\n• **Autonomous Planning & Execution**: Breaks complex software engineering objectives into structured implementation plans, executes tool calls, validates with compilers/tests, and summarizes outcomes.\n• **Tool-Calling Architecture**: Equips AI models with concrete abilities to read files, run shell commands, grep search codebases, query live web data, and manage background daemon tasks.\n• **Contextual Memory & KI**: Localized knowledge item (KI) storage and cron schedules for seamless long-running workflows.\n• **Pair Programming Intelligence**: Combines human intent with autonomous verification loops for rock-solid software delivery.`,
        quickActions: [
          {
            label: "✨ Tell me about Gemini Models",
            action: () => handleSend("Tell me about Google Gemini"),
          },
          {
            label: "⚡ Shahad's Tech Stack",
            icon: "skill",
            action: () => handleSend("What is Shahad's tech stack?"),
          },
        ],
      };
    }

    // Google Cloud, Firebase & Developer Tools
    if (has("google cloud", "gcp", "firebase", "cloud run", "bigquery", "colab", "flutter", "tensorflow", "jax")) {
      return {
        text: `☁️ **Google Developer & Cloud Ecosystem:**\n\n• **Google Cloud Platform (GCP)**: Enterprise cloud hosting, Cloud Run serverless containers, Google Kubernetes Engine (GKE), and BigQuery analytics.\n• **Firebase**: Realtime Database, Firestore, Authentication, Cloud Storage, and edge Cloud Functions for rapid application shipping.\n• **Google Colab**: Cloud-hosted Jupyter notebook environment offering GPU/TPU acceleration for deep learning pipelines and data science experimentation.\n• **TensorFlow & JAX**: Google's high-performance machine learning and numerical computing frameworks for neural network research.\n• **Flutter & Chrome DevTools**: Multi-platform UI toolkit and deep performance profiling for web applications.`,
      };
    }

    // -------------------------------------------------------------
    // SECTION 2: SHAHAD'S PORTFOLIO, BIO & EDUCATION
    // -------------------------------------------------------------

    // Who is Shahad / Bio / Tell me about yourself
    if (
      has("who is shahad", "tell me about yourself", "who are you", "about shahad", "bio", "introduce yourself", "profile", "background") ||
      (has("who", "what") && has("shahad", "pathan"))
    ) {
      return {
        text: `**Shahad Pathan** is a Computer Engineering student (Class of 2028) at **Gujarat Technological University (GTU) - School of Engineering and Technology**, specializing as a **Data Scientist**, **AI Engineer**, and **Full-Stack Developer**.\n\n✨ **Core Highlights:**\n• **Production AI Applications**: Built & launched **Wriper AI** (client-and-cloud AI background remover) and **VidSnap AI** (automated video intelligence platform).\n• **4 Hands-on Internships**: Including Web Development at **Oasis Infobyte**, **Internshala Student Partner (ISP)** (8 mos), Space Systems Trainee at **Agnirva (ISRO space community)**, and Social Work with **Rotary International**.\n• **11+ Verified Credentials & Hackathons**: Oracle Cloud AI 2025 Certified (\`325886566OCI25AICFA\`), National Road Safety Hackathon (NHAI/MoRTH), TechExpo IIT Guwahati, IBM Data Science, AWS Generative BI, and Cisco Networking Academy.\n• **Core Languages & Stack**: Python, TypeScript, React.js, Vite, Next.js, Scikit-Learn, OpenCV, PostgreSQL, Docker, FastAPI, Supabase, and Tailwind CSS.`,
        quickActions: [
          {
            label: "🚀 View Featured Projects",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "📄 Download Official Resume",
            action: () => handleSend("Can I download Shahad's resume?"),
          },
          {
            label: "📬 Contact Shahad",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
        ],
      };
    }

    // Education / University / GTU / Schooling
    if (has("education", "college", "university", "gtu", "gujarat technological", "degree", "graduation", "study", "engineering major", "academic", "school")) {
      return {
        text: `🎓 **Educational Background:**\n\n1. **Gujarat Technological University (GTU) - School of Engineering and Technology** (June 2024 – May 2028):\n   • **Degree**: Bachelor of Engineering (B.E.) in Computer Engineering\n   • **Focus**: Artificial Intelligence, Machine Learning pipelines, Data Structures & Algorithms, Computer Vision, and Full-Stack Software Engineering.\n\n2. **Shri J.M. Chaudhary Sarvajanik Vidyalaya** (June 2020 – March 2024):\n   • Completed Secondary (S.S.C) and Higher Secondary (H.S.C) with Science & Mathematics foundation.`,
        quickActions: [
          {
            label: "💼 View Experience & Journey",
            action: () => {
              setIsOpen(false);
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "⚡ View Skills & Tech Stack",
            icon: "skill",
            action: () => handleSend("What is Shahad's tech stack?"),
          },
        ],
      };
    }

    // Location / Availability / Hire
    if (has("location", "where do you live", "where are you from", "based in", "city", "mehsana", "mahesana", "gujarat", "address")) {
      return {
        text: `📍 **Location & Career Availability:**\n\nShahad is based in **Mahesana, Gujarat, India**.\n\n• **Status**: Open to software engineering internships, AI/ML roles, and collaborative projects.\n• **Work Modes**: Available for **Remote (Global / India)**, **Hybrid**, and **On-site** opportunities.\n• **Contact**: \`${profile.email}\` | \`${profile.phone}\``,
        quickActions: [
          {
            label: "📬 Send an Email",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
          {
            label: "📄 Download Resume",
            action: () => handleSend("Can I download Shahad's resume?"),
          },
        ],
      };
    }

    // Resume / CV / PDF Download
    if (has("resume", "cv", "curriculum vitae", "download cv", "download resume", "bio data", "pdf")) {
      return {
        text: `📄 **Shahad Pathan's Official Resume:**\n\nYou can view or download Shahad's official 1-page CV directly from the portfolio website.\n\n• **Direct Download**: [Download Resume (PDF)](/resume.pdf)\n• **Key Profile**: Computer Engineering @ GTU ('28) · Data Scientist · AI Engineer · Full-Stack Developer · 4 Internships · 11+ Certifications.`,
        quickActions: [
          {
            label: "📥 Open Resume (PDF)",
            action: () => {
              window.open("/resume.pdf", "_blank");
            },
          },
          {
            label: "🔍 Scroll to Resume Section",
            action: () => {
              setIsOpen(false);
              document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "📬 Contact Shahad",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
        ],
      };
    }

    // Contact / Email / Phone / Social
    if (has("contact", "email", "phone", "hire", "reach out", "collaborate", "opportunity", "message", "social", "linkedin", "github")) {
      return {
        text: `📬 **Get in Touch with Shahad Pathan:**\n\nShahad is **actively open to internships, AI/ML roles, and full-stack software development projects**!\n\n• **Email**: \`${profile.email}\`\n• **Phone**: \`${profile.phone}\`\n• **Location**: ${profile.location}\n• **GitHub**: [github.com/SHAHADPATHAN](${profile.github})\n• **LinkedIn**: [Shahad Pathan on LinkedIn](${profile.linkedin})\n• **Website**: [${profile.website}](${profile.website})`,
        quickActions: [
          {
            label: "📋 Copy Email Address",
            action: () => copyToClipboard(profile.email),
          },
          {
            label: "✉️ Go to Contact Form",
            icon: "mail",
            action: () => {
              setIsOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // SECTION 3: PROJECTS & SYSTEM ARCHITECTURE
    // -------------------------------------------------------------

    // Wriper AI
    if (has("wriper", "background remover", "background removal", "image segmentation", "wriper ai")) {
      return {
        text: `✨ **Wriper — AI Background Remover:**\n\n• **Overview**: High-performance client-and-cloud AI tool for rapid background removal and subject isolation in images.\n• **Tech Stack**: React, TypeScript, Tailwind CSS, Computer Vision, U2Net / Neural Matting, Vercel.\n• **Key Engineering**: Optimistic canvas preview rendering, alpha thresholding, client-side down-sampling for high-resolution image uploads, and lossless transparent PNG exports.\n• **Live Demo**: [wriper.vercel.app](https://wriper.vercel.app)\n• **GitHub**: [github.com/SHAHADPATHAN/wriper-ai-background-remover](https://github.com/SHAHADPATHAN/wriper-ai-background-remover)`,
        quickActions: [
          {
            label: "🌐 Open Wriper AI Live",
            action: () => window.open("https://wriper.vercel.app", "_blank"),
          },
          {
            label: "🚀 View All Projects",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // VidSnap AI
    if (has("vidsnap", "video intelligence", "frame extraction", "vidsnap ai", "video snapshot")) {
      return {
        text: `🎥 **VidSnap AI — Video Intelligence Tool:**\n\n• **Overview**: AI-driven video intelligence pipeline for automated keyframe extraction, scene transition detection, and media indexing.\n• **Tech Stack**: Python, OpenCV, FastAPI, Machine Learning, Render Cloud PaaS.\n• **Key Engineering**: Color histogram difference thresholding for scene boundaries, chunked video stream processing to optimize memory usage, and automated metadata tagging.\n• **Live Demo**: [vidsnapai-k36i.onrender.com](https://vidsnapai-k36i.onrender.com)\n• **GitHub**: [github.com/SHAHADPATHAN/VidsnapAi](https://github.com/SHAHADPATHAN/VidsnapAi)`,
        quickActions: [
          {
            label: "🌐 Open VidSnap AI",
            action: () => window.open("https://vidsnapai-k36i.onrender.com", "_blank"),
          },
        ],
      };
    }

    // VimaBazzar
    if (has("vimabazzar", "insurance", "policy comparison", "vima", "fintech")) {
      return {
        text: `🛡️ **VimaBazzar — Insurance & Financial Platform:**\n\n• **Overview**: Modern, mobile-first web platform for insurance discovery, policy comparison, and user consulting.\n• **Tech Stack**: HTML5, CSS3, JavaScript, Responsive UI, Vercel Edge Network.\n• **Key Engineering**: Fluid typography, dynamic interactive quote consultation forms, and sub-second page load times.\n• **Live Demo**: [vimabazzar.vercel.app](https://vimabazzar.vercel.app/)`,
        quickActions: [
          {
            label: "🌐 Open VimaBazzar",
            action: () => window.open("https://vimabazzar.vercel.app/", "_blank"),
          },
        ],
      };
    }

    // Practical Data Science & Statistical Analysis
    if (has("data science fundamentals", "pds", "practical data science", "eda", "statistical analysis", "pds-practical")) {
      return {
        text: `📊 **Practical Data Science & Statistical Analysis:**\n\n• **Overview**: End-to-end data manipulation, exploratory data analysis (EDA), and machine learning training pipelines.\n• **Tech Stack**: Python, Pandas, NumPy, Scikit-Learn, Matplotlib, Seaborn.\n• **Key Highlights**: Missing value imputation, categorical encoding, stratified cross-validation, outlier detection, and ROC-AUC evaluation curves.\n• **GitHub Repo**: [github.com/SHAHADPATHAN/PDS-PRACTICAL](https://github.com/SHAHADPATHAN/PDS-PRACTICAL)`,
      };
    }

    // Environment Variable Security
    if (has("env security", "environment variable", "exploit", "security audit", "defensive audit")) {
      return {
        text: `🔒 **Environment Variable Security & Defensive Audit:**\n\n• **Overview**: Security research and defensive proof-of-concept tool demonstrating environment variable misconfigurations, secret leakage vectors, and hardening safeguards.\n• **Tech Stack**: Python, Linux/POSIX, Bash, Security Auditing.\n• **GitHub Repo**: [github.com/SHAHADPATHAN/Environmental-Variable-Exploit](https://github.com/SHAHADPATHAN/Environmental-Variable-Exploit)`,
      };
    }

    // All Projects query
    if (has("project", "projects", "what did shahad build", "built", "showcase", "portfolio work", "apps")) {
      return {
        text: `🚀 **Shahad Pathan's Featured Projects:**\n\n1. **Wriper AI**: High-speed AI background removal tool ([wriper.vercel.app](https://wriper.vercel.app)).\n2. **VidSnap AI**: Automated video intelligence & frame extraction ([vidsnapai-k36i.onrender.com](https://vidsnapai-k36i.onrender.com)).\n3. **VimaBazzar**: Modern insurance comparison & policy portal ([vimabazzar.vercel.app](https://vimabazzar.vercel.app)).\n4. **Practical Data Science**: Modular Python data cleaning & ML pipelines ([github.com/SHAHADPATHAN/PDS-PRACTICAL](https://github.com/SHAHADPATHAN/PDS-PRACTICAL)).\n5. **Environment Variable Security**: Defensive audit & secret protection toolkit.\n6. **Developer Portfolio**: Ultra-fast web app built with TanStack Start, React 19, TypeScript, and Tailwind CSS.`,
        quickActions: [
          {
            label: "🚀 Scroll to Projects",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "⚡ Tech Stack",
            icon: "skill",
            action: () => handleSend("What is Shahad's tech stack?"),
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // SECTION 4: INTERNSHIPS, CERTIFICATIONS & HACKATHONS
    // -------------------------------------------------------------

    // Internships
    if (has("internship", "internships", "experience", "work history", "oasis", "internshala", "agnirva", "rotary", "space community")) {
      return {
        text: `💼 **Professional Internships & Experience:**\n\nShahad has completed **4 specialized internships**:\n\n1. **Oasis Infobyte** (Sep 2025 – Oct 2025):\n   • *Web Development Intern*: Built responsive, user-friendly web interfaces using modern frontend technologies and clean code principles.\n\n2. **Internshala** (Apr 2025 – Nov 2025 · 8 mos):\n   • *Internshala Student Partner (ISP)*: Campus outreach coordinator driving internship awareness, career opportunities, and skill campaigns.\n\n3. **Agnirva.com Space Community** (Nov 2024 – Jan 2025 · 3 mos):\n   • *Internship Trainee (ISRO Space Community)*: Completed space engineering internship covering satellite telemetry, data workflows, and aerospace research.\n\n4. **Rotary International** (Jun 2026 – Jul 2026 · 2 mos):\n   • *Social Work Intern*: On-site community project coordination and operational logistics.`,
        quickActions: [
          {
            label: "💼 View Experience Section",
            action: () => {
              setIsOpen(false);
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "🏆 View Certifications",
            action: () => handleSend("What certifications does Shahad have?"),
          },
        ],
      };
    }

    // Certifications & Hackathons
    if (has("certificate", "certificates", "certification", "certifications", "oracle", "ibm", "cisco", "isea", "aws", "hackathon", "nhai", "iit", "guwahati", "awards", "credentials")) {
      return {
        text: `🏆 **11+ Verified Certifications & Honors:**\n\n• **Oracle**: Cloud Infrastructure 2025 Certified AI Foundations Associate (\`325886566OCI25AICFA\`)\n• **National Hackathon**: NHAI & Ministry of Road Transport 2025 (\`NHAI-RSH-2025-SP\`)\n• **IIT Guwahati**: TechExpo Technical Project Exhibition (\`UNSTOP-IITG-TECHEXPO-SP\`)\n• **IBM (Coursera)**: What is Data Science? (\`ERHFN1IDMW5Y\`)\n• **AWS Training**: Generative BI with Amazon Q in QuickSight (\`AWS-TR-2026-QBI\`)\n• **ISRO / Agnirva**: Space Engineering & Satellite Internship (\`AGNIRVA-ISRO-2025-SP\`)\n• **Cisco Networking Academy**: Networking Basics & Routing Protocols (\`CISCO-NET-BASICS-2026\`)\n• **MeitY & C-DAC (Govt of India)**: National Cyber Security Pledge & Email Security Defense\n• **Microsoft Learn / TechVritti**: 5-Day Basics of AI Workshop\n• **CodeWithHarry**: Complete Python Mastery Bootcamp`,
        quickActions: [
          {
            label: "🏆 Open Certificates Reel",
            action: () => {
              setIsOpen(false);
              document.getElementById("awards")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "📄 Download Resume",
            action: () => handleSend("Can I download Shahad's resume?"),
          },
        ],
      };
    }

    // Tech Stack & Skills Matrix
    if (has("stack", "skills", "technologies", "languages", "tools", "what does shahad know", "frameworks", "database skills", "level")) {
      return {
        text: `⚡ **Technical Skills Matrix (Data Scientist, AI Engineer & Developer):**\n\n• **AI & Data Science (Production)**: Machine Learning, Computer Vision, Pandas, NumPy, Scikit-Learn, PyTorch, Generative AI (LLMs & RAG), OpenCV.\n• **Programming Languages (Production & Advanced)**: Python, SQL, TypeScript, JavaScript, C++, C.\n• **Frontend & UI (Production)**: React.js, Next.js, Vite, Tailwind CSS, HTML5/CSS3, TanStack Router.\n• **Databases & Cloud (Production)**: PostgreSQL, Supabase, MySQL, MongoDB, Redis.\n• **Tools & DevOps (Production & Advanced)**: FastAPI, Docker, Git, GitHub, Linux, Vercel, Postman, n8n Automation, VS Code.`,
        quickActions: [
          {
            label: "⚡ View Interactive Skills Grid",
            icon: "skill",
            action: () => {
              setIsOpen(false);
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // SECTION 5: ADVANCED AI, DATA SCIENCE & MACHINE LEARNING
    // -------------------------------------------------------------

    // RAG & Vector Embeddings
    if (has("rag", "retrieval augmented", "vector database", "embedding", "embeddings", "pinecone", "chromadb", "pgvector")) {
      return {
        text: `🧠 **RAG (Retrieval-Augmented Generation) & Vector Embeddings:**\n\n**RAG** connects Large Language Models to private/custom knowledge bases without full retraining, mitigating hallucinations.\n\n• **Embedding Stage**: Text is converted into dense mathematical vectors (e.g. Google \`text-embedding-004\` or OpenAI \`text-embedding-3\`) capturing semantic meaning.\n• **Vector Storage**: Vectors are indexed in databases like **ChromaDB**, **Pinecone**, or **PostgreSQL with pgvector** using HNSW / IVFFlat indexing.\n• **Retrieval Stage**: User queries are vectorized, and **Cosine Similarity** / Euclidean distance finds top-$K$ most relevant context chunks.\n• **Generation Stage**: Retrieved context is injected into the LLM prompt to generate an accurate, source-grounded response.`,
      };
    }

    // Transformers & Self-Attention
    if (has("transformer", "attention mechanism", "self-attention", "llm", "large language model", "how do transformers work")) {
      return {
        text: `🔬 **Transformer Architecture & Self-Attention:**\n\nIntroduced in *Attention Is All You Need* (Vaswani et al., Google Brain), Transformers replaced recurrent networks by processing entire sequences in parallel.\n\n• **Self-Attention Formula**:\n  $$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n  - **Query ($Q$)**: What the token is looking for.\n  - **Key ($K$)**: What information the token holds.\n  - **Value ($V$)**: The actual content to pass forward.\n• **Multi-Head Attention**: Allows the model to attend to information from different representation subspaces simultaneously.\n• **Positional Encodings**: Injects sequence order without sequential processing.`,
      };
    }

    // Computer Vision & Image Segmentation
    if (has("computer vision", "cnn", "convolutional", "yolo", "opencv", "segmentation", "matting", "u2net")) {
      return {
        text: `👁️ **Computer Vision & Neural Segmentation:**\n\n• **CNNs**: Feature extraction layers with convolutions, pooling, and activation functions ($ReLU$).\n• **Image Segmentation (U2Net, Mask R-CNN)**: Pixel-level classification used in tools like **Wriper AI** to isolate subjects with continuous alpha channels (matting).\n• **Object Detection (YOLOv8 / YOLOv11)**: Single-shot neural networks that predict bounding boxes and class labels in real time at 60+ FPS.\n• **Key Libraries**: OpenCV, PyTorch TorchVision, Albumentations, PIL.`,
      };
    }

    // Data Science & Pandas/NumPy
    if (has("data science", "pandas", "numpy", "eda", "data cleaning", "feature engineering")) {
      return {
        text: `📊 **Data Science & Statistical Engineering:**\n\n• **NumPy**: $N$-dimensional arrays (\`ndarray\`) optimized with C-level memory buffers for vectorized linear algebra.\n• **Pandas**: Tabular data structures (\`DataFrame\`, \`Series\`) for filtering, aggregation (\`groupby\`), pivoting, and time-series.\n• **Data Cleaning Checklist**:\n  1. Handling missing data (imputation vs removal)\n  2. Outlier detection via IQR / Z-scores\n  3. Categorical encoding (One-Hot vs Target Encoding)\n  4. Feature scaling (StandardScaler vs MinMaxScaler)\n  5. Dimensionality reduction (PCA / t-SNE)`,
      };
    }

    // -------------------------------------------------------------
    // SECTION 6: ALGORITHMS & COMPUTER SCIENCE
    // -------------------------------------------------------------

    // Binary Search
    if (has("binary search", "binarysearch")) {
      return {
        text: `⚡ **Binary Search Algorithm (O(log n)):**\n\nSearches a **sorted collection** by halving search boundaries at each step.\n\n\`\`\`python\ndef binary_search(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\`\`\`\n\n• **Time Complexity**: **O(log n)**\n• **Space Complexity**: **O(1)**`,
      };
    }

    // Two Sum & Hash Maps
    if (has("two sum", "twosum", "hash map", "hashmap")) {
      return {
        text: `🧩 **Two Sum (Optimal O(n) Hash Map):**\n\n\`\`\`python\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}  # val -> index\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n\`\`\`\n\n• **Time Complexity**: **O(n)** single pass\n• **Space Complexity**: **O(n)**`,
      };
    }

    // QuickSort & Sorting
    if (has("quicksort", "merge sort", "sorting", "sort algorithm")) {
      return {
        text: `🔄 **Sorting Algorithms (QuickSort vs MergeSort):**\n\n• **QuickSort**: Divide-and-conquer pivot partition. Average **O(n log n)**, in-place **O(log n)** memory, cache-friendly.\n• **MergeSort**: Stable divide-and-conquer into equal halves. Guaranteed **O(n log n)**, requires **O(n)** auxiliary space.\n\n\`\`\`python\ndef quicksort(arr: list[int]) -> list[int]:\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    return quicksort([x for x in arr if x < pivot]) + \\\n           [x for x in arr if x == pivot] + \\\n           quicksort([x for x in arr if x > pivot])\n\`\`\``,
      };
    }

    // Dynamic Programming
    if (has("dynamic programming", "dp", "memoization", "tabulation", "knapsack")) {
      return {
        text: `📈 **Dynamic Programming (DP):**\n\nOptimizes problems with overlapping subproblems and optimal substructure.\n\n• **Memoization (Top-Down)**: Recursive with dictionary/array cache.\n• **Tabulation (Bottom-Up)**: Iterative filling of table state.\n\n\`\`\`python\n# 0/1 Knapsack Problem in Python\ndef knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][capacity]\n\`\`\``,
      };
    }

    // -------------------------------------------------------------
    // SECTION 7: FULL-STACK, CLOUD & WEB SYSTEMS
    // -------------------------------------------------------------

    // SQL vs NoSQL
    if (has("sql vs nosql", "nosql vs sql", "database", "postgres", "mysql", "mongodb", "acid")) {
      return {
        text: `🗄️ **SQL vs NoSQL Databases:**\n\n• **SQL (Relational - PostgreSQL, MySQL)**:\n  - Rigid tabular schema, ACID transaction guarantees, and complex relational \`JOIN\` operations.\n  - Best for: Financial records, relational user management, analytics.\n• **NoSQL (Document/Key-Value - MongoDB, Redis)**:\n  - Dynamic schema, horizontal sharding, and high-velocity reads/writes.\n  - Best for: Unstructured JSON, caching, realtime telemetry feeds.`,
      };
    }

    // React 19, Next.js & Frontend
    if (has("react", "next.js", "tanstack", "virtual dom", "hooks", "usestate", "useeffect", "frontend", "tailwind", "vite")) {
      return {
        text: `⚛️ **Modern Frontend Architecture:**\n\n• **React 19**: Actions (\`useActionState\`, \`useFormStatus\`), Server Components (RSC), and compiler optimizations.\n• **Next.js & TanStack Start**: Full-stack type-safe frameworks offering SSR, SSG, streaming layouts, and zero-bundle server logic.\n• **Tailwind CSS v4 & Vite**: High-speed Lightning CSS compilation with zero runtime overhead and dynamic dark-mode tokenization.`,
      };
    }

    // FastAPI, Docker & Backend
    if (has("fastapi", "docker", "kubernetes", "backend", "api", "microservice", "rest")) {
      return {
        text: `🚀 **Backend & Container Architecture:**\n\n• **FastAPI (Python)**: High-performance async REST framework built on Starlette and Pydantic with native OpenAPI docs. Ideal for ML inference endpoints.\n• **Docker**: Packages code, dependencies, and OS libraries into reproducible lightweight images, eliminating "it works on my machine" issues.\n• **REST vs gRPC**: REST uses JSON over HTTP/1.1; gRPC uses Protocol Buffers over HTTP/2 for ultra-low latency microservices.`,
      };
    }

    // -------------------------------------------------------------
    // SECTION 8: GREETINGS & CASUAL
    // -------------------------------------------------------------
    if (has("hi", "hello", "hey", "namaste", "good morning", "good evening", "how are you", "sup", "what's up")) {
      return {
        text: `Hello! 😊 Great to connect with you!\n\nI can answer questions on:\n1. **Shahad Pathan's Portfolio**: Projects (*Wriper AI*, *VidSnap AI*), 4 internships, 11+ verified certifications, resume, and contact.\n2. **Google & Gemini AI**: Gemini 1.5/2.0, DeepMind Antigravity, Multimodal AI, and Vertex AI.\n3. **Data Science & AI**: Machine Learning, PyTorch, Computer Vision, RAG, and Transformers.\n4. **Full-Stack Software**: Python, React 19, TypeScript, PostgreSQL, Docker, and Algorithms.\n\nWhat would you like to explore?`,
        quickActions: [
          {
            label: "🚀 Top AI Projects",
            action: () => handleSend("What are Shahad's top AI projects?"),
          },
          {
            label: "✨ Google Gemini & AI",
            action: () => handleSend("Tell me about Google Gemini and Agentic AI"),
          },
          {
            label: "🏆 Certifications & Awards",
            action: () => handleSend("What certifications does Shahad have?"),
          },
          {
            label: "📄 Download Resume",
            action: () => handleSend("Can I download Shahad's resume?"),
          },
        ],
      };
    }

    // Developer Joke
    if (has("joke", "funny", "laugh")) {
      return {
        text: `😄 Here's a developer joke for you:\n\n**Why do Python developers prefer dark mode?**\n*Because light attracts bugs!* 🐛\n\n**Why did the neural network go to school?**\n*To improve its weights and reduce loss!* 🧠`,
      };
    }

    // Thanks
    if (has("thanks", "thank you", "great", "awesome", "good job", "cool")) {
      return {
        text: `You're very welcome! 😊 Always happy to assist. Let me know if you'd like to explore more code, AI systems, or discuss a project with Shahad!`,
        quickActions: [
          {
            label: "📬 Contact Shahad",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
          {
            label: "📄 Download Resume",
            action: () => handleSend("Can I download Shahad's resume?"),
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // SECTION 9: CONTEXT-AWARE INTELLIGENT FALLBACK
    // -------------------------------------------------------------
    return {
      text: `🤖 **Answering regarding: "${userQuery}"**\n\nIn computer engineering, AI, and software systems, this topic can be analyzed through computational principles, system design, and algorithmic workflows.\n\nHere are some relevant technical domains I can explain in detail:\n• **Shahad's Portfolio**: Projects (*Wriper AI*, *VidSnap AI*, *VimaBazzar*), internships (Oasis Infobyte, Agnirva ISRO, Internshala), certifications (Oracle, NHAI, IBM, AWS), and resume.\n• **Google & Gemini AI**: Gemini 1.5/2.0 Pro/Flash, Antigravity AI agents, Multimodal models, and Vertex AI.\n• **Data Science & ML**: Computer Vision, OpenCV, PyTorch, Scikit-Learn, Pandas, Transformers, and RAG.\n• **Full-Stack & Cloud**: Python, React 19, TypeScript, PostgreSQL, Docker, FastAPI, and Git.`,
      quickActions: [
        {
          label: "🚀 Top AI Projects",
          icon: "project",
          action: () => handleSend("What are Shahad's top AI projects?"),
        },
        {
          label: "✨ Google Gemini & AI",
          action: () => handleSend("Tell me about Google Gemini and Agentic AI"),
        },
        {
          label: "⚡ Tech Stack",
          icon: "skill",
          action: () => handleSend("What is Shahad's tech stack?"),
        },
        {
          label: "🏆 Certifications",
          action: () => handleSend("What certifications does Shahad have?"),
        },
        {
          label: "📄 Download Resume",
          action: () => handleSend("Can I download Shahad's resume?"),
        },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend ?? input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: "Just now",
        ...(response.quickActions ? { quickActions: response.quickActions } : {}),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: `Chat cleared! ✨ Ask me anything about Google Gemini, AI algorithms, software engineering, or Shahad's projects.`,
        timestamp: "Just now",
        quickActions: INITIAL_SUGGESTIONS.slice(0, 4).map((prompt) => ({
          label: prompt,
          action: () => handleSend(prompt),
        })),
      },
    ]);
  };

  return (
    <>
      {/* Floating Right-Side Compact Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className="group relative flex size-11 items-center justify-center rounded-full border border-primary/40 bg-surface/95 text-primary-bright shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-surface-2 hover:shadow-[0_0_20px_var(--glow)] active:scale-95 sm:size-12"
          title={isOpen ? "Close AI Assistant" : "Open Shahad AI Assistant"}
        >
          {/* Subtle online pulse indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </span>

          <Bot className="size-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
        </button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed right-4 bottom-24 z-50 flex h-[540px] w-[calc(100vw-2rem)] sm:w-[420px] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/80 bg-surface/90 px-4 py-3.5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative flex size-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary-bright shadow-[0_0_12px_var(--glow)]">
                  <Bot className="size-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-1.5">
                    Shahad AI Assistant
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.2 font-mono text-[9px] text-primary-bright font-semibold">
                      Gemini + AI Engineer
                    </span>
                  </h3>
                  <p className="font-mono text-[10px] text-emerald-400">● Online · Gemini &amp; Portfolio Trained</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  aria-label="Close Assistant"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-start gap-2 max-w-[90%]">
                    {msg.sender === "bot" ? (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright mt-0.5">
                        <Bot className="size-3.5" />
                      </span>
                    ) : null}

                    <div
                      className={`rounded-2xl px-4 py-3 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground font-medium rounded-tr-xs shadow-md"
                          : "border border-border bg-surface text-foreground rounded-tl-xs shadow-xs"
                      }`}
                    >
                      <FormattedMessageText text={msg.text} />
                    </div>

                    {msg.sender === "user" ? (
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground mt-0.5">
                        <User className="size-3.5" />
                      </span>
                    ) : null}
                  </div>

                  {/* Dynamic Action Buttons for Bot Replies */}
                  {msg.quickActions && msg.quickActions.length > 0 ? (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
                      {msg.quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={action.action}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-foreground transition-all hover:border-primary/50 hover:bg-surface-2 hover:text-primary-bright active:scale-95"
                        >
                          {action.label}
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 pl-1">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary-bright">
                    <Bot className="size-3.5" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface px-3.5 py-2.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Chips */}
            {messages.length <= 2 && !isTyping && (
              <div className="border-t border-border/60 bg-surface/40 p-2.5">
                <p className="mb-1.5 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="size-3 text-primary" />
                  Try asking anything:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {INITIAL_SUGGESTIONS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-surface/90 p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gemini, AI, coding, or Shahad's portfolio..."
                className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
