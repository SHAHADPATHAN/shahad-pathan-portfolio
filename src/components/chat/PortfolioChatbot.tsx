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
import { skillCategories } from "@/data/skills";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void; icon?: "mail" | "project" | "skill" }[];
}

const INITIAL_SUGGESTIONS = [
  "Who is Shahad Pathan?",
  "What are Shahad's top AI projects?",
  "Tell me about his certifications & hackathons",
  "Explain how Binary Search works",
  "What is the difference between SQL and NoSQL?",
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
      text: `👋 Hi there! I'm **Shahad AI** — your intelligent pair assistant trained on **Shahad Pathan's engineering portfolio** (projects, skills, internships, certifications, resume) and **broad computer science, AI, and software engineering topics**!\n\nWhat would you like to explore?`,
      timestamp: "Just now",
      quickActions: [
        {
          label: "👤 About Shahad",
          icon: "skill",
          action: () => handleSend("Who is Shahad Pathan?"),
        },
        {
          label: "🚀 Top AI Projects",
          icon: "project",
          action: () => handleSend("What are Shahad's top AI projects?"),
        },
        {
          label: "🏆 Certifications & Awards",
          icon: "project",
          action: () => handleSend("What certifications and awards does Shahad have?"),
        },
        {
          label: "💡 Coding / Algorithm Help",
          icon: "skill",
          action: () => handleSend("Explain how Binary Search works in Python"),
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
    // SECTION 1: SHAHAD'S PORTFOLIO, BIO & EDUCATION
    // -------------------------------------------------------------

    // Who is Shahad / Bio / Tell me about yourself
    if (
      has("who is shahad", "tell me about yourself", "who are you", "about shahad", "bio", "introduce yourself", "profile", "background") ||
      (has("who", "what") && has("shahad", "pathan"))
    ) {
      return {
        text: `**Shahad Pathan** is a Computer Engineering student (Class of 2028) at **Gujarat Technological University (GTU)**, specializing in **Artificial Intelligence, Data Science, and Scalable Full-Stack Web Architecture**.\n\n✨ **Key Highlights:**\n• **Shipped Production AI Systems**: Creator of **Wriper AI** (AI background removal) and **VidSnap AI** (automated video intelligence).\n• **4 Engineering Internships**: Hands-on technical experience with ISRO space tutor (Agnirva), AI modeling, and full-stack software.\n• **11+ Verified Credentials**: Including National Road Safety Hackathon (NHAI/MoRTH), TechExpo IIT Guwahati, Oracle Cloud Infrastructure AI 2025 Certified, IBM Data Science, and AWS Generative BI.\n• **Core Languages**: Python, TypeScript, React, Next.js, PyTorch, C++, and PostgreSQL.`,
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
            label: "📄 Download Resume",
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

    // Education / University / GTU / Degree / College
    if (has("education", "college", "university", "gtu", "gujarat technological", "degree", "graduation", "study", "engineering major", "academic")) {
      return {
        text: `🎓 **Education & Academic Background:**\n\n• **Degree**: Bachelor of Engineering (B.E.) in Computer Engineering (2024 – 2028, GTU '28).\n• **Institution**: Gujarat Technological University (GTU), Gujarat, India.\n• **Core Coursework**: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning Foundations, Operating Systems, and Computer Networks.\n• **Focus Areas**: Deep Learning, Computer Vision pipelines, Data Pipelines, and Full-Stack Engineering.`,
        quickActions: [
          {
            label: "Explore About Section",
            action: () => {
              setIsOpen(false);
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "View Skills & Tech Stack",
            icon: "skill",
            action: () => handleSend("What is Shahad's tech stack?"),
          },
        ],
      };
    }

    // Location / Where are you based
    if (has("location", "where do you live", "where are you from", "based in", "city", "mehsana", "gujarat", "address")) {
      return {
        text: `📍 **Location & Availability:**\n\nShahad is based in **Mehsana, Gujarat, India**.\n\nHe is available for:\n• **Remote Software & AI Engineering Internships** (Global & India)\n• **On-site / Hybrid Opportunities** across Gujarat and major tech hubs\n• **Freelance Full-Stack & AI Development Projects**`,
        quickActions: [
          {
            label: "📬 Send an Email",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
        ],
      };
    }

    // Resume / CV / Download
    if (has("resume", "cv", "curriculum vitae", "download cv", "download resume", "bio data")) {
      return {
        text: `📄 **Shahad Pathan's Official Resume:**\n\nYou can download or view Shahad's comprehensive CV containing full educational details, internship history, technical stack, and verified credentials.\n\n• **Resume File**: [Download Official Resume (PDF)](/resume.pdf)\n• **Quick Overview**: B.E. Computer Engineering (GTU '28) · 4 Internships · 11+ Certifications · AI & Full-Stack.`,
        quickActions: [
          {
            label: "📥 Open Resume Link",
            action: () => {
              window.open("/resume.pdf", "_blank");
            },
          },
          {
            label: "📬 Initiate Contact",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
        ],
      };
    }

    // Contact / Email / Phone / Hire / Internship Opportunities
    if (has("contact", "email", "phone", "hire", "reach out", "collaborate", "opportunity", "available for internship", "message")) {
      return {
        text: `📬 **Get in Touch with Shahad Pathan:**\n\nShahad is **actively open to software engineering internships, AI/ML roles, and collaborative projects**!\n\n• **Email**: \`${profile.email}\`\n• **Phone**: \`${profile.phone}\`\n• **Location**: ${profile.location}\n• **GitHub**: [github.com/sahadpathan](https://github.com/sahadpathan)\n• **LinkedIn**: [linkedin.com/in/sahad-pathan-758999335](https://www.linkedin.com/in/sahad-pathan-758999335/)`,
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

    // Social Links
    if (has("linkedin", "github", "social", "twitter", "x profile", "find me")) {
      return {
        text: `🌐 **Official Online Profiles:**\n\n• **GitHub**: [github.com/sahadpathan](https://github.com/sahadpathan) — Open-source repositories, AI pipelines, and web apps.\n• **LinkedIn**: [Shahad Pathan on LinkedIn](https://www.linkedin.com/in/sahad-pathan-758999335/) — Professional network, internship updates, and verified licenses.\n• **Email**: \`${profile.email}\``,
      };
    }

    // -------------------------------------------------------------
    // SECTION 2: SPECIFIC PROJECTS
    // -------------------------------------------------------------

    // Wriper AI
    if (has("wriper", "background removal", "image segmentation", "wriper ai")) {
      return {
        text: `✨ **Wriper AI (AI Background Removal Suite):**\n\n• **Description**: Ultra-fast image background removal and subject isolation tool powered by optimized Computer Vision segmentation models.\n• **Tech Stack**: React, TypeScript, Next.js, Python, OpenCV, Tailwind CSS, Vercel.\n• **Features**: Instant drag-and-drop, client-side batch processing, high-resolution PNG exports, and zero latency.\n• **Live Demo**: [wriper.vercel.app](https://wriper.vercel.app)`,
        quickActions: [
          {
            label: "🌐 Open Wriper AI Live Demo",
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
    if (has("vidsnap", "video intelligence", "frame extraction", "vidsnap ai")) {
      return {
        text: `🎥 **VidSnap AI (Automated Video Intelligence):**\n\n• **Description**: Automated platform for extracting keyframes, indexing media, and summarizing video content using machine learning.\n• **Tech Stack**: Python, OpenCV, FastAPI, PyTorch, React, Tailwind CSS.\n• **Features**: Temporal scene boundary detection, OCR metadata extraction from video slides, and smart audio-visual indexing.`,
        quickActions: [
          {
            label: "🚀 View Project in Showcase",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // VimaBazzar
    if (has("vimabazzar", "insurance", "policy comparison", "vima")) {
      return {
        text: `🛡️ **VimaBazzar (Insurance Discovery Platform):**\n\n• **Description**: Responsive fintech web application for exploring, calculating, and comparing insurance policies seamlessly.\n• **Tech Stack**: React, TypeScript, Tailwind CSS, Vite, REST APIs.\n• **Live Demo**: [vimabazzar.vercel.app](https://vimabazzar.vercel.app)`,
        quickActions: [
          {
            label: "🌐 Open VimaBazzar Live",
            action: () => window.open("https://vimabazzar.vercel.app", "_blank"),
          },
        ],
      };
    }

    // All Projects query
    if (has("project", "projects", "what did shahad build", "built", "showcase", "portfolio work", "apps")) {
      return {
        text: `🚀 **Featured Engineering Projects:**\n\n1. **Wriper AI**: High-performance AI background removal & image segmentation suite ([wriper.vercel.app](https://wriper.vercel.app)).\n2. **VidSnap AI**: Automated video intelligence, frame extraction, and temporal video analysis.\n3. **VimaBazzar**: Modern insurance comparison & policy discovery platform ([vimabazzar.vercel.app](https://vimabazzar.vercel.app)).\n4. **Developer Portfolio**: High-performance interactive portfolio built with TanStack Start, React 19, TypeScript, and Tailwind CSS v4.`,
        quickActions: [
          {
            label: "🚀 Explore Projects Grid",
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
    // SECTION 3: CERTIFICATIONS, HACKATHONS & INTERNSHIPS
    // -------------------------------------------------------------

    // Hackathons & Competitions (NHAI, IIT Guwahati)
    if (has("hackathon", "nhai", "road safety", "iit", "guwahati", "techexpo", "competition")) {
      return {
        text: `🏆 **Hackathons & Technical Exhibitions:**\n\n1. **National Road Safety Hackathon 2025 (NHAI & MoRTH)**:\n   • Organized jointly by National Highways Authority of India & HOAI.\n   • Engineered AI & sensor fusion concepts for intelligent road safety.\n   • Credential ID: \`NHAI-RSH-2025-SP\`\n\n2. **TechExpo — Indian Institute of Technology (IIT) Guwahati**:\n   • Represented Gujarat Technological University (GTU) showcasing engineering innovation.\n   • Credential ID: \`UNSTOP-IITG-TECHEXPO-SP\``,
        quickActions: [
          {
            label: "🏆 View Certificates Reel",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("awards")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // Certifications in detail (Oracle, IBM, AWS, Cisco, ISRO, ISEA)
    if (has("certificate", "certificates", "certification", "certifications", "oracle", "ibm", "cisco", "isea", "aws", "awards", "credentials")) {
      return {
        text: `📜 **11+ Verified Certifications & Honors:**\n\n• **Oracle**: Cloud Infrastructure 2025 Certified AI Foundations Associate (\`325886566OCI25AICFA\`)\n• **National Hackathon**: NHAI & Ministry of Road Transport 2025 (\`NHAI-RSH-2025-SP\`)\n• **IIT Guwahati**: TechExpo Technical Project Exhibition\n• **IBM (Coursera)**: What is Data Science? (\`ERHFN1IDMW5Y\`)\n• **AWS Training**: Generative BI with Amazon Q in QuickSight\n• **ISRO / Agnirva**: Space Engineering & Satellite Internship Program\n• **Cisco Networking Academy**: Networking Basics & Packet Routing\n• **Govt of India (MeitY / C-DAC)**: National Cyber Security Pledge & Email Security Defense\n• **CodeWithHarry**: Complete Python Mastery Bootcamp`,
        quickActions: [
          {
            label: "🏆 Open Certificates Lightbox",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("awards")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // Internships & Work Experience
    if (has("internship", "internships", "experience", "work history", "jobs", "rotary", "agnirva", "internshala", "techvritti")) {
      return {
        text: `💼 **Engineering Internships & Work Experience:**\n\nShahad has completed **4 hands-on internships**:\n\n1. **Agnirva (ISRO Registered Space Tutor)**: Space engineering internship covering satellite systems, orbital telemetry, and aerospace data analysis.\n2. **Rotary International**: On-site community project coordination and operational logistics.\n3. **Internshala Student Partner (ISP)**: Community outreach and developer engagement.\n4. **TechVritti (in partnership with Microsoft)**: Applied AI workshop and model engineering.`,
        quickActions: [
          {
            label: "💼 View Experience Section",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    // Tech Stack & Skills
    if (has("stack", "skills", "technologies", "languages", "tools", "what does shahad know", "frameworks", "database skills")) {
      return {
        text: `⚡ **Technical Skills & Stack:**\n\n• **Programming Languages**: Python, TypeScript, JavaScript, C++, C, SQL, HTML5/CSS3\n• **AI & Machine Learning**: PyTorch, OpenCV, Computer Vision, Scikit-Learn, Pandas, NumPy, FastAI\n• **Frontend Engineering**: React 19, Next.js, TanStack Start, Tailwind CSS, Vite, Radix UI\n• **Backend & Cloud**: Node.js, FastAPI, PostgreSQL, MySQL, Supabase, Redis, Docker, Git, Linux, Vercel`,
        quickActions: [
          {
            label: "⚡ View Interactive Skills Matrix",
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
    // SECTION 4: COMPUTER SCIENCE, ALGORITHMS & CODING
    // -------------------------------------------------------------

    // Binary Search
    if (has("binary search", "binarysearch")) {
      return {
        text: `**Binary Search Algorithm (O(log n)):**\n\nBinary Search efficiently locates a target value within a **sorted array** by repeatedly halving the search interval.\n\n\`\`\`python\ndef binary_search(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1  # Target not found\n\`\`\`\n\n• **Time Complexity**: Best O(1), Average/Worst **O(log n)**\n• **Space Complexity**: **O(1)** (Iterative)`,
      };
    }

    // Two Sum / Arrays
    if (has("two sum", "twosum")) {
      return {
        text: `**Two Sum (Optimal O(n) Hash Map Approach):**\n\n\`\`\`python\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\`\`\`\n\n• **Time Complexity**: **O(n)** single pass\n• **Space Complexity**: **O(n)** for hash map lookup`,
      };
    }

    // QuickSort / MergeSort / Sorting
    if (has("quicksort", "merge sort", "sorting algorithm", "sort array")) {
      return {
        text: `**Sorting Algorithms Comparison:**\n\n• **QuickSort**: Divide-and-conquer using a pivot element. Average time **O(n log n)**, in-place **O(log n)** space, cache-friendly.\n• **MergeSort**: Stable divide-and-conquer dividing into equal halves. Guaranteed **O(n log n)** time, requires **O(n)** auxiliary space.\n\n\`\`\`python\n# QuickSort in Python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\`\`\``,
      };
    }

    // Big-O / Time Complexity
    if (has("big o", "time complexity", "space complexity", "asymptotic")) {
      return {
        text: `**Big-O Complexity Cheat Sheet:**\n\n• **O(1) Constant**: Hash map lookup, array index access.\n• **O(log n) Logarithmic**: Binary Search, Balanced BST operations.\n• **O(n) Linear**: Single array traversal, linear search.\n• **O(n log n) Linearithmic**: MergeSort, QuickSort (average), HeapSort.\n• **O(n²) Quadratic**: Nested loops (Bubble Sort, Selection Sort).\n• **O(2ⁿ) Exponential**: Recursive Fibonacci without memoization.\n• **O(n!) Factorial**: Traveling Salesperson brute force.`,
      };
    }

    // BFS vs DFS / Graphs / Trees
    if (has("bfs", "dfs", "breadth first", "depth first", "graph traversal", "tree traversal")) {
      return {
        text: `**BFS vs DFS (Graph & Tree Traversal):**\n\n• **BFS (Breadth-First Search)**: Explores neighbor-by-neighbor level-wise using a **Queue (FIFO)**. Best for shortest path in unweighted graphs.\n• **DFS (Depth-First Search)**: Explores as deep as possible along each branch using a **Stack (LIFO)** or recursion. Best for cycle detection, topological sorting, and maze exploration.\n\n• **Time Complexity**: **O(V + E)** for graphs, **O(N)** for trees.`,
      };
    }

    // Dynamic Programming
    if (has("dynamic programming", "memoization", "dp", "tabulation", "knapsack")) {
      return {
        text: `**Dynamic Programming (DP):**\n\nAn optimization technique that solves complex problems by breaking them into overlapping subproblems and storing subproblem results (avoiding redundant calculations).\n\n• **Two Core Approaches:**\n  1. **Top-Down with Memoization**: Recursion + Cache.\n  2. **Bottom-Up with Tabulation**: Iterative table filling.\n\n\`\`\`python\n# Fibonacci with Tabulation O(n) time, O(1) space\ndef fib(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\`\`\``,
      };
    }

    // -------------------------------------------------------------
    // SECTION 5: ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
    // -------------------------------------------------------------

    // Machine Learning / Supervised vs Unsupervised
    if (has("machine learning", "supervised", "unsupervised", "what is ml", "reinforcement learning")) {
      return {
        text: `**Machine Learning Paradigms:**\n\n1. **Supervised Learning**: Model learns mapping from labeled input-output pairs $(X \to y)$. Examples: Linear Regression, Random Forests, Neural Networks.\n2. **Unsupervised Learning**: Finds hidden patterns/clusters in unlabeled data $(X)$. Examples: K-Means, PCA, Autoencoders.\n3. **Reinforcement Learning (RL)**: Agent learns optimal policy through trial-and-error rewards and penalties in an environment (Q-Learning, PPO).`,
      };
    }

    // PyTorch vs TensorFlow
    if (has("pytorch", "tensorflow", "keras", "deep learning framework")) {
      return {
        text: `**PyTorch vs TensorFlow:**\n\n• **PyTorch (Meta AI)**: Features dynamic computation graphs (*eager execution*), Pythonic syntax, and first-class GPU tensor acceleration with CUDA. Preferred in research, Generative AI, and computer vision.\n• **TensorFlow (Google)**: Strong ecosystem with TFLite (edge deployment), TensorFlow Serving, and TF.js for production pipelines.\n\nShahad primarily utilizes **PyTorch** for computer vision and custom deep learning pipelines.`,
      };
    }

    // Computer Vision / CNNs / YOLO / Segmentation
    if (has("computer vision", "cnn", "convolutional", "yolo", "opencv", "segmentation")) {
      return {
        text: `**Computer Vision & Visual AI:**\n\n• **CNNs (Convolutional Neural Networks)**: Use spatial convolutional kernels/filters to extract local feature maps (edges $\to$ textures $\to$ object parts).\n• **Semantic & Instance Segmentation**: Classifying pixels individually (e.g. in *Wriper AI* for clean background removal).\n• **Object Detection (YOLO, Faster R-CNN)**: Simultaneously predicts bounding boxes and class probabilities in real-time.\n• **Key Libraries**: OpenCV, PyTorch TorchVision, Albumentations, PIL.`,
      };
    }

    // LLMs, Transformers & RAG
    if (has("llm", "large language model", "transformer", "rag", "retrieval augmented", "attention mechanism", "generative ai", "genai", "prompt engineering")) {
      return {
        text: `**Modern Generative AI & Large Language Models:**\n\n• **Transformer Architecture**: Relies on **Self-Attention** mechanisms $(Q, K, V)$ to capture long-range contextual relationships in parallel without recurrence.\n• **RAG (Retrieval-Augmented Generation)**: Combines LLMs with external knowledge bases via vector embeddings (\`pgvector\`, Pinecone) to eliminate hallucinations and provide grounded responses.\n• **Fine-Tuning (LoRA/QLoRA)**: Efficiently adapts pre-trained weights for specialized domain tasks with minimal compute.`,
      };
    }

    // -------------------------------------------------------------
    // SECTION 6: WEB, BACKEND & DATABASES
    // -------------------------------------------------------------

    // SQL vs NoSQL / Databases / ACID
    if (has("sql vs nosql", "nosql vs sql", "database", "postgres", "mongodb", "redis", "acid", "sql")) {
      return {
        text: `**SQL vs NoSQL Databases:**\n\n• **SQL (Relational)**: Structured tables, schemas, relationships, and **ACID** transaction guarantees (Atomicity, Consistency, Isolation, Durability). Examples: PostgreSQL, MySQL, SQLite. Best for structured finance, relational data, and complex JOINs.\n\n• **NoSQL (Non-Relational)**: Flexible schema with Document (MongoDB), Key-Value (Redis), or Graph formats. Best for high-velocity writes, unstructured JSON data, and horizontal scaling.`,
      };
    }

    // React, Next.js, TanStack Start & Frontend
    if (has("react", "next.js", "tanstack", "virtual dom", "hooks", "usestate", "useeffect", "frontend", "tailwind")) {
      return {
        text: `**Modern Frontend Architecture:**\n\n• **React 19 & Hooks**: Declarative UI powered by hooks (\`useState\`, \`useEffect\`, \`useMemo\`, \`useCallback\`, \`useRef\`) and unified Server Actions.\n• **TanStack Start & Next.js**: Full-stack type-safe frameworks offering Server-Side Rendering (SSR), Static Site Generation (SSG), and streamable layouts.\n• **Tailwind CSS**: Utility-first CSS engine enabling rapid styling with zero runtime overhead and dynamic dark-mode tokenization.`,
      };
    }

    // REST vs GraphQL vs gRPC / APIs
    if (has("rest", "graphql", "grpc", "api", "http status", "websocket")) {
      return {
        text: `**API Protocols & Communication:**\n\n• **REST**: Resource-based URLs using standard HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`). Stateless, cacheable, and universally supported.\n• **GraphQL**: Single endpoint allowing clients to query exactly the fields needed, eliminating over-fetching and under-fetching.\n• **gRPC**: High-performance RPC protocol using HTTP/2 and Protocol Buffers (Protobuf) for ultra-low latency microservice communication.\n• **WebSockets**: Full-duplex persistent TCP connections for real-time live events.`,
      };
    }

    // Docker & DevOps
    if (has("docker", "kubernetes", "container", "devops", "ci/cd", "git")) {
      return {
        text: `**DevOps & Containerization:**\n\n• **Docker Containers**: Package application code, runtime, and system dependencies together into lightweight, isolated containers that execute consistently across all environments.\n• **Containers vs VMs**: Containers share the host OS kernel (boot in milliseconds, minimal RAM), whereas VMs require a full hypervisor and guest OS.\n• **Git Fundamentals**: \`git rebase\` keeps a clean linear commit history; \`git merge\` preserves exact branch branching context.`,
      };
    }

    // Cybersecurity / Security
    if (has("security", "cybersecurity", "sql injection", "xss", "csrf", "jwt", "auth", "phishing")) {
      return {
        text: `**Core Web Security Principles:**\n\n• **SQL Injection Defense**: Always use parameterized queries / prepared statements (or ORMs) instead of string concatenation.\n• **XSS (Cross-Site Scripting)**: Sanitize user input and escape HTML before rendering.\n• **CSRF (Cross-Site Request Forgery)**: Implement Anti-CSRF tokens and \`SameSite=Lax/Strict\` cookie headers.\n• **JWT vs Session Auth**: JWTs are stateless cryptographically signed tokens; sessions store state on server/Redis.`,
      };
    }

    // -------------------------------------------------------------
    // SECTION 7: GREETINGS & CASUAL
    // -------------------------------------------------------------
    if (has("hi", "hello", "hey", "namaste", "good morning", "good evening", "how are you", "sup", "what's up")) {
      return {
        text: `Hello! 😊 It's great to connect with you!\n\nI can assist you with:\n1. **Shahad Pathan's Portfolio**: Projects (*Wriper AI*, *VidSnap AI*), internships, certifications, and contact details.\n2. **Software Engineering & Coding**: Python, React, Algorithms, Data Structures, Machine Learning, and System Design.\n\nWhat would you like to explore today?`,
        quickActions: [
          {
            label: "🚀 Shahad's Top AI Projects",
            action: () => handleSend("What are Shahad's top AI projects?"),
          },
          {
            label: "🏆 Certifications & Awards",
            action: () => handleSend("What certifications does Shahad have?"),
          },
          {
            label: "💡 Explain Binary Search",
            action: () => handleSend("Explain how Binary Search works"),
          },
        ],
      };
    }

    // Jokes / Fun
    if (has("joke", "funny", "laugh")) {
      return {
        text: `😄 Here's a classic developer joke for you:\n\n**Why do programmers prefer dark mode?**\n*Because light attracts bugs!* 🐛\n\n**Why do Java developers wear glasses?**\n*Because they don't C#!* ☕\n\nAsk me anything else about coding, algorithms, or Shahad's portfolio!`,
      };
    }

    // Thanks / Appreciation
    if (has("thanks", "thank you", "great", "awesome", "good job", "cool")) {
      return {
        text: `You're very welcome! 😊 Always happy to help. Let me know if you have any more questions about Shahad's work, code, or technical systems!`,
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
    // SECTION 8: CONTEXT-AWARE INTELLIGENT FALLBACK
    // -------------------------------------------------------------
    return {
      text: `🤖 **Answering regarding: "${userQuery}"**\n\nIn computer engineering and software systems, queries like this can be analyzed through computational principles, modular architecture, and algorithmic design.\n\nHere are some relevant technical domains I can explain in depth:\n• **Shahad's Portfolio**: Projects (*Wriper AI*, *VidSnap AI*, *VimaBazzar*), internships (ISRO space tutor Agnirva), certifications (NHAI, IIT Guwahati, Oracle, IBM, AWS), and contact details.\n• **Algorithms & Data Structures**: Binary Search, QuickSort, Dynamic Programming, Two Sum, Graphs, Big-O.\n• **AI & Machine Learning**: Computer Vision, PyTorch, CNNs, Transformers, LLMs, RAG.\n• **Full-Stack & Cloud**: React 19, TypeScript, Next.js, PostgreSQL, Docker, and REST APIs.`,
      quickActions: [
        {
          label: "🚀 Top Projects",
          icon: "project",
          action: () => handleSend("What are Shahad's top AI projects?"),
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
          label: "📬 Contact Info",
          icon: "mail",
          action: () => handleSend("How can I contact Shahad?"),
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
    }, 550);
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
        text: `Chat cleared! ✨ Ask me anything about programming, algorithms, AI, or Shahad's projects.`,
        timestamp: "Just now",
        quickActions: INITIAL_SUGGESTIONS.slice(0, 3).map((prompt) => ({
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
                      General + Portfolio
                    </span>
                  </h3>
                  <p className="font-mono text-[10px] text-emerald-400">● Online · Ready for any question</p>
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
                placeholder="Ask about coding, algorithms, tech, or Shahad..."
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
