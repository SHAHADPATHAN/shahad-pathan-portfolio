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
  "What are Shahad's top AI projects?",
  "Explain how Binary Search works",
  "What is the difference between SQL and NoSQL?",
  "How can I contact Shahad?",
];

function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, lineIdx) => {
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
      text: `👋 Hi there! I'm **Shahad AI** — an intelligent assistant here to help with both **Shahad's portfolio** (projects, skills, internships, contact) and **any general coding, AI, tech, or logic questions**!\n\nFeel free to ask anything!`,
      timestamp: "Just now",
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
          label: "💡 Coding / Tech Help",
          icon: "skill",
          action: () => handleSend("Explain how Binary Search works"),
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

    // -------------------------------------------------------------
    // 1. SPECIFIC PORTFOLIO QUERIES
    // -------------------------------------------------------------
    if (
      q.includes("project") ||
      q.includes("wriper") ||
      q.includes("vidsnap") ||
      q.includes("vimabazzar") ||
      q.includes("portfolio") ||
      q.includes("what did shahad build")
    ) {
      return {
        text: `Here are Shahad's core featured systems:\n\n1. **Wriper AI**: High-performance AI background removal and image segmentation tool built with React & Computer Vision models ([wriper.vercel.app](https://wriper.vercel.app)).\n2. **VidSnap AI**: AI-driven video intelligence platform for automated frame extraction, media indexing, and video processing.\n3. **VimaBazzar**: Modern, responsive insurance discovery and policy comparison platform ([vimabazzar.vercel.app](https://vimabazzar.vercel.app)).`,
        quickActions: [
          {
            label: "Explore Projects Section",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "Contact Shahad",
            icon: "mail",
            action: () => handleSend("How can I contact Shahad?"),
          },
        ],
      };
    }

    if (
      q.includes("shahad's stack") ||
      q.includes("shahad skills") ||
      q.includes("what does shahad know") ||
      q.includes("his tech stack")
    ) {
      return {
        text: `Shahad works across full-stack engineering and AI modeling:\n\n• **Languages**: Python, TypeScript, JavaScript, C++, C, SQL\n• **AI & Data Science**: PyTorch, OpenCV, FastAI, Scikit-Learn, Pandas, NumPy, Computer Vision\n• **Frontend & Web**: React, Next.js, TanStack Start, Tailwind CSS, Vite, HTML5/CSS3\n• **Databases & Cloud**: PostgreSQL, MySQL, Supabase, SQLite, Redis, Docker, Git, Linux, Vercel, Render`,
        quickActions: [
          {
            label: "View Interactive Tools Terminal",
            icon: "skill",
            action: () => {
              setIsOpen(false);
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    if (
      q.includes("experience") ||
      q.includes("internship") ||
      q.includes("education") ||
      q.includes("gtu") ||
      q.includes("college") ||
      q.includes("degree")
    ) {
      return {
        text: `🎓 **Education**:\n• **Gujarat Technological University (GTU)** — B.E. in Computer Engineering (2024 – 2028, GTU '28).\n\n💼 **Experience & Internships**:\nShahad has completed 4 hands-on engineering internships focused on AI algorithms, full-stack web applications, and data pipeline architectures.`,
        quickActions: [
          {
            label: "View Experience Carousel",
            icon: "project",
            action: () => {
              setIsOpen(false);
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            },
          },
        ],
      };
    }

    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("hire") ||
      q.includes("available for internship")
    ) {
      return {
        text: `Shahad is **actively open for software engineering internships, AI/ML roles, and collaborative projects**!\n\n📬 **Email**: \`${profile.email}\`\n📱 **Phone**: \`${profile.phone}\`\n📍 **Location**: ${profile.location}`,
        quickActions: [
          {
            label: "Open Direct Contact Form",
            icon: "mail",
            action: () => {
              setIsOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "Copy Email Address",
            action: () => copyToClipboard(profile.email),
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // 2. GENERAL CODING, AI, ALGORITHMS & TECH QUESTIONS
    // -------------------------------------------------------------

    // Binary Search / Sorting / Algorithms
    if (q.includes("binary search") || q.includes("search algorithm")) {
      return {
        text: `**Binary Search** is an efficient divide-and-conquer search algorithm with **O(log n)** time complexity.\n\n**How it works:**\n1. Requires a **sorted array**.\n2. Compares the target with the middle element.\n3. If target matches middle, return index.\n4. If target is smaller, search the left half; if larger, search the right half.\n\n\`\`\`python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\`\`\``,
      };
    }

    // SQL vs NoSQL / Databases
    if (q.includes("sql vs nosql") || q.includes("difference between sql and nosql") || q.includes("nosql vs sql")) {
      return {
        text: `**SQL vs NoSQL Databases:**\n\n• **SQL (Relational)**: Structured with fixed schemas, tables, rows, and ACID transactions. Examples: PostgreSQL, MySQL, SQLite. Best for relational data, finance, and complex JOIN queries.\n\n• **NoSQL (Non-Relational)**: Flexible schema with key-value, document (JSON), wide-column, or graph models. Examples: MongoDB, Redis, Cassandra. Best for rapid scaling, unstructured documents, and high write throughput.`,
      };
    }

    // PyTorch vs TensorFlow / Deep Learning
    if (q.includes("pytorch") || q.includes("tensorflow") || q.includes("deep learning framework")) {
      return {
        text: `**PyTorch** is a dynamic open-source machine learning framework developed by Meta AI and widely used in AI research and production.\n\n**Key Highlights:**\n• **Dynamic Computation Graphs (Eager execution)**: Intuitive debugging with standard Python flow.\n• **GPU Acceleration**: High-performance tensor computation via CUDA.\n• **Rich Ecosystem**: TorchVision for Computer Vision, HuggingFace Transformers for NLP, and PyTorch Lightning.`,
      };
    }

    // Computer Vision / CNNs
    if (q.includes("computer vision") || q.includes("cnn") || q.includes("convolutional")) {
      return {
        text: `**Computer Vision (CV)** enables computers to extract meaningful insights from digital images and videos.\n\n**Core Concepts:**\n• **CNNs (Convolutional Neural Networks)**: Use spatial filters/kernels to detect edges, textures, and object hierarchies.\n• **Segmentation (e.g. in Wriper AI)**: Classifying individual pixels as foreground subject vs background.\n• **Object Detection (YOLO, Faster R-CNN)**: Locating and classifying multiple bounding boxes in real time.`,
      };
    }

    // React / Next.js / Frontend
    if (q.includes("react") || q.includes("virtual dom") || q.includes("hooks") || q.includes("next.js")) {
      return {
        text: `**React** is a declarative, component-based UI library built on a Virtual DOM.\n\n**Key Concepts:**\n• **Components & Props**: Reusable UI blocks passing unidirectional data.\n• **State & Hooks**: \`useState\`, \`useEffect\`, \`useRef\`, \`useMemo\` to manage lifecycle and reactive UI.\n• **Modern Server Frameworks**: Next.js and TanStack Start for server-side rendering (SSR), streaming, and edge routing.`,
      };
    }

    // Docker / Containers
    if (q.includes("docker") || q.includes("container") || q.includes("kubernetes")) {
      return {
        text: `**Docker** packages applications and their dependencies into lightweight, standalone containers to ensure consistent execution across development and production.\n\n**Container vs Virtual Machine:**\n• Containers share the host OS kernel → lightweight, instant boot, minimal memory footprint.\n• VMs run full guest operating systems on a hypervisor → heavier overhead.`,
      };
    }

    // Supabase
    if (q.includes("supabase")) {
      return {
        text: `**Supabase** is an open-source Firebase alternative built on top of **PostgreSQL**.\n\n**Features:**\n• Instant RESTful & GraphQL APIs automatically generated from your schema.\n• Real-time WebSocket subscriptions on database row changes.\n• Built-in Auth, Row Level Security (RLS), and Vector Embeddings (\`pgvector\`).`,
      };
    }

    // Python questions / code help
    if (q.includes("python") || q.includes("reverse a string") || q.includes("list comprehension")) {
      return {
        text: `**Python Quick Snippets:**\n\n• **Reverse a string**: \`s[::-1]\`\n• **List comprehension**: \`[x * 2 for x in nums if x > 0]\`\n• **Dictionary comprehension**: \`{k: v for k, v in zip(keys, values)}\`\n• **Enumerate**: \`for i, val in enumerate(items):\`\n\nNeed help writing a specific algorithm or script? Just type your prompt!`,
      };
    }

    // Git / Version Control
    if (q.includes("git") || q.includes("git merge vs rebase") || q.includes("version control")) {
      return {
        text: `**Git Fundamentals:**\n\n• **Merge**: Combines two branches with a dedicated merge commit, preserving exact branch history.\n• **Rebase**: Moves or replays commits on top of the target base branch for a clean, linear git history.\n• **Cherry-pick**: Applies a specific commit from one branch to your current branch.`,
      };
    }

    // Jokes / Casual / Fun
    if (q.includes("joke") || q.includes("funny")) {
      return {
        text: `😄 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛\n\nAsk me anything else about coding, algorithms, or Shahad's systems!`,
      };
    }

    // General Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("namaste") || q.includes("good morning") || q.includes("good evening")) {
      return {
        text: `Hello! Great to meet you! 😊\n\nI can assist you with **any general software/coding/AI question**, as well as anything regarding **Shahad Pathan's portfolio and projects**. What would you like to discuss today?`,
        quickActions: [
          {
            label: "🚀 Top Projects",
            action: () => handleSend("What are Shahad's top AI projects?"),
          },
          {
            label: "💡 Explain Binary Search",
            action: () => handleSend("Explain how Binary Search works"),
          },
          {
            label: "⚡ Tech Stack",
            action: () => handleSend("What is Shahad's tech stack?"),
          },
        ],
      };
    }

    // -------------------------------------------------------------
    // 3. INTELLIGENT GENERAL FALLBACK ANSWER
    // -------------------------------------------------------------
    return {
      text: `🤖 **Answering your question:**\n\nRegarding "${userQuery}":\n\nIn software engineering & computer science, this is commonly approached by breaking down the problem into modular components, choosing optimal data structures, and ensuring computational efficiency with clean algorithmic design.\n\n• For **coding & algorithms**: I can provide code snippets in Python, TypeScript, C++, or SQL.\n• For **systems & architecture**: I can explain database schemas, AI model pipelines, and web frameworks.\n• For **Shahad's portfolio**: You can ask about his projects (*Wriper AI*, *VidSnap AI*), technical skills, or internship availability!`,
      quickActions: [
        {
          label: "Ask about AI & Python",
          action: () => handleSend("What is PyTorch and how does it work?"),
        },
        {
          label: "Ask about Databases",
          action: () => handleSend("What is the difference between SQL and NoSQL?"),
        },
        {
          label: "View Shahad's Projects",
          action: () => handleSend("What are Shahad's top AI projects?"),
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
        quickActions: response.quickActions,
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
