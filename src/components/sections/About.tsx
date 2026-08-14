import { useState, useRef } from "react";
import {
  Brain,
  Code2,
  Cpu,
  GraduationCap,
  MapPin,
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  Award,
  Flame,
  Rocket,
  Compass,
  Laptop,
  Check,
  Copy,
  ExternalLink,
  ArrowRight,
  Database,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { about, currentFocus } from "@/data/about";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type AboutTab = "story" | "pillars" | "timeline";

const focusIcons: Record<string, typeof Brain> = {
  learning: Brain,
  building: Code2,
  exploring: Rocket,
};

const focusColors: Record<
  string,
  {
    border: string;
    bg: string;
    text: string;
    glow: string;
    badge: string;
  }
> = {
  learning: {
    border: "border-cyan-500/30 hover:border-cyan-500/60",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  },
  building: {
    border: "border-primary/30 hover:border-primary/60",
    bg: "bg-primary/10",
    text: "text-primary-bright",
    glow: "shadow-[0_0_20px_var(--glow)]",
    badge: "border-primary/30 bg-primary/10 text-primary-bright",
  },
  exploring: {
    border: "border-purple-500/30 hover:border-purple-500/60",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    badge: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  },
};

const pillars = [
  {
    id: "ai-vision",
    icon: Brain,
    title: "AI & Computer Vision",
    badge: "Core Specialization",
    description:
      "Developing machine learning architectures, automated image background removal, computer vision pipelines, and intelligent AI models.",
    tools: ["Python", "PyTorch", "OpenCV", "Machine Learning", "FastAPI"],
    highlight: "Shipped Wriper AI & Vidsnap AI",
    color: "from-orange-500/20 to-amber-500/5",
    accent: "text-primary-bright",
  },
  {
    id: "data-science",
    icon: Database,
    title: "Data Science & Analytics",
    badge: "Analytics & ETL",
    description:
      "Transforming raw datasets into actionable intelligence with statistical modeling, automated data pipelines, and predictive analytics.",
    tools: ["Data Pipelines", "Big Data Analytics", "Pandas", "Statistical Modeling", "ETL"],
    highlight: "IBM Verified Data Science Credential",
    color: "from-blue-500/20 to-cyan-500/5",
    accent: "text-cyan-400",
  },
  {
    id: "full-stack",
    icon: Layers,
    title: "Full-Stack Software",
    badge: "Systems & Cloud",
    description:
      "Architecting responsive, high-performance web interfaces paired with robust backend APIs, Docker containerization, and modern cloud deployment.",
    tools: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Docker", "REST APIs"],
    highlight: "10+ Public Production Repos",
    color: "from-emerald-500/20 to-teal-500/5",
    accent: "text-emerald-400",
  },
];

const timelineMilestones = [
  {
    period: "2024 – 2028",
    title: "B.E. in Computer Engineering",
    organization: "Gujarat Technological University (GTU)",
    description:
      "Pursuing bachelor's degree with a focus on advanced computing, algorithms, distributed systems, and artificial intelligence.",
    icon: GraduationCap,
    badge: "Academic Foundation",
  },
  {
    period: "2025 – 2026",
    title: "National Hackathons & Tech Expos",
    organization: "NHAI & IIT Guwahati (TechExpo)",
    description:
      "Participated in National Road Safety Hackathon (NHAI/MoRTH) and represented GTU at IIT Guwahati TechExpo showcasing intelligent software systems.",
    icon: Award,
    badge: "National Competitions",
  },
  {
    period: "2025",
    title: "Space Technology Internship",
    organization: "Agnirva (ISRO Registered Space Tutor)",
    description:
      "Completed an 80-hour space engineering program covering orbital mechanics, satellite systems, and aerospace telemetry analysis.",
    icon: Rocket,
    badge: "Specialized Research",
  },
  {
    period: "Ongoing",
    title: "AI Product Engineering",
    organization: "Wriper AI & Vidsnap AI",
    description:
      "Building and shipping production tools that solve real-world problems through AI computer vision, video intelligence, and scalable web apps.",
    icon: Laptop,
    badge: "Live SaaS Tools",
  },
];

export function About() {
  const [activeTab, setActiveTab] = useState<AboutTab>("story");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <section id="about" className="relative scroll-mt-24 py-20 lg:py-28 overflow-hidden">
      {/* Background Graphic Orbs & Matrix Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 size-[550px] rounded-full bg-primary/6 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 size-[450px] rounded-full bg-cyan-500/5 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.lead}
          />

          {/* Interactive Tab Switcher */}
          <div className="flex items-center rounded-xl border border-border bg-surface p-1 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("story")}
              className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTab === "story"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Terminal className="size-3.5" />
              <span>Story</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pillars")}
              className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTab === "pillars"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Layers className="size-3.5" />
              <span>Pillars</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("timeline")}
              className={cn(
                "relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTab === "timeline"
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Compass className="size-3.5" />
              <span>Journey</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid: Interactive Showcase + Holographic Passport Card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
          {/* ========================================================================= */}
          {/* LEFT: Dynamic Tabbed Content Panel (Story / Pillars / Timeline)          */}
          {/* ========================================================================= */}
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="tab-story"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Narrative Cards */}
                  <div className="surface-panel relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-8">
                    {/* Top graphic accent */}
                    <div className="absolute top-0 right-0 h-1 w-32 bg-gradient-to-l from-primary to-transparent" />

                    <div className="flex items-center gap-2 font-mono text-xs text-primary-bright font-semibold uppercase tracking-wider">
                      <Sparkles className="size-3.5" />
                      <span>Engineering Philosophy</span>
                    </div>

                    <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                      <p>
                        I am pursuing a Bachelor of Engineering in Computer
                        Engineering at{" "}
                        <strong className="text-foreground font-medium">
                          Gujarat Technological University (GTU)
                        </strong>
                        , graduating in 2028. My primary technical focus sits at
                        the intersection of{" "}
                        <span className="text-foreground font-medium underline decoration-primary/40 underline-offset-4">
                          Artificial Intelligence, Data Science
                        </span>
                        , and scalable full-stack software systems.
                      </p>

                      <p>
                        Most of my work involves writing Python for machine
                        learning models and automated data pipelines, building
                        ultra-responsive web interfaces with React and TypeScript,
                        and architecting robust backend APIs designed for real-world
                        utility.
                      </p>

                      <p>
                        I have engineered and deployed production tools including{" "}
                        <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary-bright">
                          Wriper AI
                        </span>{" "}
                        (AI background removal suite) and{" "}
                        <span className="inline-flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                          Vidsnap AI
                        </span>{" "}
                        (automated video intelligence), continuously exploring
                        modern system design, data telemetry, and cloud deployments.
                      </p>
                    </div>

                    {/* Highlighted Trait Badges */}
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground/90">
                        <Cpu className="size-3.5 text-primary-bright" />
                        <span>AI &amp; Neural Nets</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground/90">
                        <Database className="size-3.5 text-cyan-400" />
                        <span>Data Engineering</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground/90">
                        <Code2 className="size-3.5 text-emerald-400" />
                        <span>Full-Stack Architecture</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground/90">
                        <ShieldCheck className="size-3.5 text-amber-400" />
                        <span>Cybersecurity Vigilance</span>
                      </span>
                    </div>
                  </div>

                  {/* Fast Facts Callout Banner */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="surface-panel rounded-xl border border-border/80 bg-surface/60 p-3.5 text-center">
                      <p className="font-display text-xl font-bold text-primary-bright">11+</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground uppercase">Verified Certs</p>
                    </div>
                    <div className="surface-panel rounded-xl border border-border/80 bg-surface/60 p-3.5 text-center">
                      <p className="font-display text-xl font-bold text-cyan-400">GTU &apos;28</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground uppercase">Major Major</p>
                    </div>
                    <div className="surface-panel rounded-xl border border-border/80 bg-surface/60 p-3.5 text-center">
                      <p className="font-display text-xl font-bold text-emerald-400">2 Live</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground uppercase">AI Apps Shipped</p>
                    </div>
                    <div className="surface-panel rounded-xl border border-border/80 bg-surface/60 p-3.5 text-center">
                      <p className="font-display text-xl font-bold text-purple-400">10+</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground uppercase">Public Repos</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "pillars" && (
                <motion.div
                  key="tab-pillars"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className={cn(
                          "surface-panel group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-5 sm:p-6 transition-all duration-300 hover:border-primary/50 hover:bg-surface-2",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l opacity-30 pointer-events-none",
                            pillar.color,
                          )}
                        />

                        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-3.5">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-foreground group-hover:border-primary/40 group-hover:text-primary-bright">
                              <Icon className="size-5" />
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary-bright">
                                  {pillar.title}
                                </h4>
                                <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                                  {pillar.badge}
                                </span>
                              </div>

                              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                                {pillar.description}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {pillar.tools.map((tool) => (
                                  <span
                                    key={tool}
                                    className="rounded-md border border-border/70 bg-surface/90 px-2 py-0.5 font-mono text-[10px] text-foreground/80"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {activeTab === "timeline" && (
                <motion.div
                  key="tab-timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="surface-panel relative rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-7"
                >
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
                    {timelineMilestones.map((m, idx) => {
                      const Icon = m.icon;
                      return (
                        <div key={m.title} className="relative group">
                          {/* Timeline node */}
                          <div className="absolute -left-6 top-1.5 flex size-4 items-center justify-center rounded-full border-2 border-primary bg-background ring-4 ring-background" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-primary-bright">
                              {m.period}
                            </span>
                            <span className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                              {m.badge}
                            </span>
                          </div>

                          <h4 className="mt-1 font-display text-base font-semibold text-foreground">
                            {m.title}
                          </h4>

                          <p className="font-mono text-xs text-muted-foreground">
                            {m.organization}
                          </p>

                          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">
                            {m.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: Holographic Developer Passport Profile Card                      */}
          {/* ========================================================================= */}
          <ScrollReveal delay={0.1}>
            <div className="surface-panel glow-orange relative overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-b from-surface via-surface to-surface-2 p-6 sm:p-8 shadow-2xl">
              {/* Top ambient glare line */}
              <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Status Header: Live Radar Beacon */}
              <div className="flex items-center justify-between border-b border-border/70 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-3">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Open to Opportunities
                  </span>
                </div>
              </div>

              {/* Profile Identity Bar */}
              <div className="mt-5 flex items-center gap-4">
                <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-surface shadow-lg text-primary-bright font-display text-xl font-bold">
                  SP
                  <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border border-border bg-surface text-[10px]">
                    ⚡
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="font-mono text-xs font-medium text-primary-bright">
                    {profile.role} • AI &amp; Software
                  </p>
                </div>
              </div>

              {/* Fact Sheet Spec Table */}
              <dl className="mt-6 divide-y divide-border/60 rounded-2xl border border-border/70 bg-surface/50 p-4 text-xs">
                <div className="flex items-center justify-between py-2.5">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <GraduationCap className="size-3.5 text-primary-bright" />
                    <span>Degree</span>
                  </dt>
                  <dd className="font-medium text-foreground text-right">
                    B.E. Computer Engineering (2024–2028)
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <Cpu className="size-3.5 text-cyan-400" />
                    <span>University</span>
                  </dt>
                  <dd className="font-medium text-foreground text-right">
                    Gujarat Technological University
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <MapPin className="size-3.5 text-emerald-400" />
                    <span>Location</span>
                  </dt>
                  <dd className="font-medium text-foreground text-right">
                    Mehsana, Gujarat, India
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3.5 text-purple-400" />
                    <span>Core Focus</span>
                  </dt>
                  <dd className="font-semibold text-primary-bright text-right">
                    AI · Data Science · Full-Stack
                  </dd>
                </div>
              </dl>

              {/* Interactive Quick Connect / Copy Email */}
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-2/80 px-4 py-2.5 text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-surface-2"
                >
                  <span className="font-mono text-muted-foreground truncate">
                    {profile.email}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-primary-bright font-semibold shrink-0">
                    {copiedEmail ? (
                      <>
                        <Check className="size-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </span>
                </button>

                <a
                  href="#contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-bright hover:shadow-glow"
                >
                  <span>Initiate Contact</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM: Current Focus Cards with Glowing Accents & Micro-Animations       */}
        {/* ========================================================================= */}
        <div className="mt-14 lg:mt-20">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="size-4 text-primary-bright" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Current Engineering Trajectory
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentFocus.map((group, i) => {
              const Icon = focusIcons[group.id] ?? Brain;
              const theme = focusColors[group.id] ?? focusColors.building;

              return (
                <ScrollReveal key={group.id} delay={0.06 * i} className="h-full">
                  <article
                    className={cn(
                      "surface-panel group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      theme.border,
                    )}
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-xl border",
                          theme.badge,
                        )}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                        Active Track
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-base font-semibold text-foreground group-hover:text-primary-bright">
                      {group.title}
                    </h4>

                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>

                    {/* Checklist */}
                    <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-4 flex-1">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90"
                        >
                          <CheckCircle2
                            className={cn(
                              "mt-0.5 size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                              theme.text,
                            )}
                            aria-hidden="true"
                          />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
