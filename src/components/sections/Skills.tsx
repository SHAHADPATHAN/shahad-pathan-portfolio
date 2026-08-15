import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Wrench,
  Code2,
  Brain,
  Database,
  LayoutTemplate,
  X,
  Play,
  Pause,
  Terminal,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  allSkillsList,
  skillCategories,
  type SkillCategory,
  type SkillGroupData,
  type Skill,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const groupIconMap: Record<string, typeof Code2> = {
  Languages: Code2,
  "AI & Data": Brain,
  Frontend: LayoutTemplate,
  Databases: Database,
  Tools: Wrench,
};

const toolSnippets: Record<string, { cmd: string; benefit: string }> = {
  Python: { cmd: "import numpy as np, pandas as pd", benefit: "Primary engine for ML modeling and backend APIs." },
  TypeScript: { cmd: "interface Architecture<T> { ... }", benefit: "Strict static typing and robust full-stack contracts." },
  JavaScript: { cmd: "const res = await fetch('/api/stream');", benefit: "Async event loops and dynamic UI manipulation." },
  "C++": { cmd: "std::vector<int> pipeline(1024);", benefit: "High-throughput algorithms and low-level optimization." },
  C: { cmd: "void* mem = malloc(sizeof(Buffer));", benefit: "Direct memory management and POSIX systems logic." },
  SQL: { cmd: "SELECT * FROM models WHERE accuracy > 0.95;", benefit: "Relational indexing and ACID query execution." },
  Pandas: { cmd: "df = pd.read_csv('dataset.csv').clean()", benefit: "Tabular feature engineering and statistical EDA." },
  NumPy: { cmd: "matrix = np.dot(weights, inputs) + bias", benefit: "Vectorized linear algebra for deep learning models." },
  "Scikit-Learn": { cmd: "clf = RandomForestClassifier().fit(X, y)", benefit: "Predictive classification and regression pipelines." },
  "Computer Vision": { cmd: "frame = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)", benefit: "Real-time frame isolation and alpha edge matting." },
  "Machine Learning": { cmd: "model.evaluate(X_test, y_test)", benefit: "Supervised and unsupervised statistical modeling." },
  "Generative AI": { cmd: "const response = await ai.generateContent()", benefit: "LLM orchestration, vector embeddings & agents." },
  React: { cmd: "const [state, setState] = useState(initial);", benefit: "Declarative component trees and high-speed reactivity." },
  "Next.js": { cmd: "export default async function Page() { ... }", benefit: "SSR, edge rendering, and optimal Core Web Vitals." },
  "Tailwind CSS": { cmd: "@utility glow-orange { box-shadow: ... }", benefit: "Modern tokenized styling and responsive design systems." },
  "HTML5 / CSS3": { cmd: "<main class='semantic-grid'>", benefit: "Accessible, zero-layout-shift web architecture." },
  MySQL: { cmd: "SELECT * FROM users JOIN orders ON users.id = orders.user_id;", benefit: "Relational ACID transactions, indexed schemas & queries." },
  Supabase: { cmd: "const { data } = await supabase.from('records').select('*')", benefit: "Postgres-backed realtime database, Auth & Edge functions." },
  PostgreSQL: { cmd: "CREATE EXTENSION vector; SELECT ...", benefit: "Reliable database transactions and JSON operations." },
  MongoDB: { cmd: "db.collection.find({ active: true })", benefit: "Flexible JSON document stores and schema agility." },
  Git: { cmd: "git commit -m 'feat: optimize kernel'", benefit: "Version control, branching, and team collaboration." },
  GitHub: { cmd: "git push origin main --tags", benefit: "CI/CD automated testing and open source repos." },
  FastAPI: { cmd: "@app.get('/predict') async def infer():", benefit: "High-performance async Python REST microservices." },
  Docker: { cmd: "docker compose up -d --build", benefit: "Isolated multi-container production environments." },
  "Linux / POSIX": { cmd: "chmod +x audit.sh && ./audit.sh", benefit: "Shell automation, process permissions, and security." },
  Postman: { cmd: "pm.test('Status is 200', () => { ... })", benefit: "API endpoint validation and integration testing." },
  "VS Code": { cmd: "code . --enable-proposed-api", benefit: "High-productivity editor with intelligent debuggers." },
  "n8n / Automation": { cmd: "Execute Webhook -> AI Agent -> DB Node", benefit: "Automated event-driven backend workflows." },
};

function SkillTile({
  skill,
  isSelected,
  onSelect,
}: {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const Icon = skill.icon;
  const isCore = skill.level === "Core" || skill.level === "Production";

  return (
    <li
      onClick={onSelect}
      className={cn(
        "group/tile relative flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all duration-200",
        isSelected
          ? "border-primary bg-primary/15 shadow-[0_0_20px_rgba(255,107,0,0.25)]"
          : "border-border bg-surface/70 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-2 hover:shadow-[0_0_15px_rgba(255,107,0,0.15)]",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover/tile:scale-110",
            isSelected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-primary-bright",
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-display text-xs font-bold text-foreground sm:text-sm">
            {skill.name}
          </h4>
          {skill.description ? (
            <p className="line-clamp-1 font-mono text-[10px] text-muted-foreground">
              {skill.description}
            </p>
          ) : null}
        </div>
      </div>

      {skill.level ? (
        <span
          className={cn(
            "rounded-md px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider uppercase",
            isCore
              ? "border border-primary/30 bg-primary/10 text-primary-bright"
              : "border border-border bg-surface text-muted-foreground",
          )}
        >
          {skill.level}
        </span>
      ) : null}
    </li>
  );
}

function SkillGroupCard({
  group,
  selectedSkill,
  onSelectSkill,
}: {
  group: SkillGroupData;
  selectedSkill: Skill;
  onSelectSkill: (s: Skill) => void;
}) {
  const Icon = groupIconMap[group.title] ?? group.icon;

  return (
    <article className="surface-panel glow-orange group relative flex h-[500px] w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start snap-always flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2">
      <div>
        {/* Group Header */}
        <div className="flex items-start justify-between gap-3 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright transition-transform duration-300 group-hover:scale-105">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                {group.title}
              </h3>
              <p className="font-mono text-[11px] text-muted-foreground">
                {group.skills.length} Technologies
              </p>
            </div>
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-primary-bright uppercase tracking-wider">
            Active Stack
          </span>
        </div>

        <p className="mt-3.5 text-xs text-muted-foreground leading-relaxed">
          {group.description}
        </p>

        {/* Skills List in Scrollable Container */}
        <ul
          className="mt-4 space-y-2 overflow-y-auto max-h-[300px] pr-1"
          style={{ scrollbarWidth: "none" }}
        >
          {group.skills.map((skill) => (
            <SkillTile
              key={skill.name}
              skill={skill}
              isSelected={selectedSkill.name === skill.name}
              onSelect={() => onSelectSkill(skill)}
            />
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1 text-primary-bright">
          <Sparkles className="size-3" /> Click tool to inspect
        </span>
        <span>Core Stack</span>
      </div>
    </article>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill>(allSkillsList[0]!);
  const [autoScroll, setAutoScroll] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter skills by search query and category
  const filteredSkills = useMemo(() => {
    return allSkillsList.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group filtered skills
  const groupedSkills = useMemo(() => {
    const categories: ("Languages" | "AI & Data" | "Frontend" | "Databases" | "Tools")[] = [
      "Languages",
      "AI & Data",
      "Frontend",
      "Databases",
      "Tools",
    ];

    return categories
      .map((cat) => {
        const skillsInCat = filteredSkills.filter((s) => s.category === cat);
        return {
          id: cat.toLowerCase().replace(/\s+/g, "-"),
          title: cat,
          description:
            cat === "Languages"
              ? "Core programming languages used for systems, AI models, and web applications."
              : cat === "AI & Data"
                ? "Machine learning, computer vision, data engineering, and predictive pipelines."
                : cat === "Frontend"
                  ? "Responsive, accessible, and high-performance component systems."
                  : cat === "Databases"
                    ? "Relational schemas, NoSQL document stores, and indexing."
                    : "Development workflow, containerization, async APIs, and cloud services.",
          icon: groupIconMap[cat] ?? Code2,
          skills: skillsInCat,
        };
      })
      .filter((g) => g.skills.length > 0);
  }, [filteredSkills]);

  // Automatic gentle carousel timer
  useEffect(() => {
    if (!autoScroll || groupedSkills.length <= 1) return;

    const interval = setInterval(() => {
      if (isHoveredRef.current) return;

      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
          setActiveCardIndex(0);
        } else {
          scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
          setActiveCardIndex((prev) => (prev + 1) % groupedSkills.length);
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [autoScroll, groupedSkills.length]);

  const SelectedIcon = selectedSkill.icon;
  const currentSnippet = toolSnippets[selectedSkill.name] ?? {
    cmd: `// ${selectedSkill.name} integrated in production`,
    benefit: selectedSkill.description ?? "Engineering and development stack component.",
  };

  return (
    <section id="skills" className="scroll-mt-24 border-t border-border py-20 lg:py-28 overflow-hidden">
      <Container>
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Tech Stack & Arsenal"
            title="Tools I build with"
            description="Production languages, machine learning frameworks, databases, and developer tooling utilized across live builds."
          />

          {/* Action & Auto-scroll Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Auto-Scroll Toggle Button */}
            <button
              type="button"
              onClick={() => setAutoScroll((v) => !v)}
              aria-label={autoScroll ? "Pause auto-scroll" : "Start auto-scroll"}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-muted-foreground transition-all hover:border-primary hover:text-foreground"
            >
              {autoScroll ? (
                <>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <Pause className="size-3 text-primary-bright" />
                  <span>Auto-Slide ON</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-muted-foreground" />
                  <span>Auto-Slide OFF</span>
                </>
              )}
            </button>

            {/* Left/Right Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll tools left"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll tools right"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Switcher Tabs */}
          <div role="group" aria-label="Filter tools by category" className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_15px_var(--glow)] font-semibold"
                      : "border-border bg-surface/60 text-muted-foreground hover:border-border-strong hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Interactive Search Input */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. Python, Docker)..."
              className="w-full rounded-full border border-border bg-surface py-2 pl-10 pr-9 text-xs text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Unique Feature: Live Interactive Tool Inspector Terminal */}
        <ScrollReveal delay={0.08} className="mt-8">
          <div className="surface-panel glow-orange relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-surface via-surface-2 to-surface p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Tool Identity */}
              <div className="flex items-center gap-3.5">
                <span className="flex size-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary-bright shadow-[0_0_15px_var(--glow)]">
                  <SelectedIcon className="size-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-bold text-foreground">
                      {selectedSkill.name}
                    </h4>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-primary-bright uppercase">
                      {selectedSkill.level ?? "Verified"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentSnippet.benefit}</p>
                </div>
              </div>

              {/* Terminal Code Snippet Preview */}
              <div className="flex flex-1 max-w-lg items-center gap-3 rounded-xl border border-border bg-black/60 px-4 py-2.5 font-mono text-xs text-emerald-400">
                <Terminal className="size-4 shrink-0 text-primary" />
                <code className="truncate">{currentSnippet.cmd}</code>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scrollable Track */}
        <ScrollReveal delay={0.12}>
          {groupedSkills.length === 0 ? (
            <div className="surface-panel mt-8 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No tools found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
              tabIndex={0}
              aria-label="Horizontal scrollable list of tools and technologies"
              className="mt-8 flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 107, 0, 0.4) transparent",
              }}
            >
              {groupedSkills.map((group) => (
                <SkillGroupCard
                  key={group.id}
                  group={group}
                  selectedSkill={selectedSkill}
                  onSelectSkill={(s) => setSelectedSkill(s)}
                />
              ))}
            </div>
          )}
        </ScrollReveal>
      </Container>

      {/* Infinite Animated Marquee Ribbon */}
      <div className="mt-14 border-y border-border/80 bg-surface/40 py-4 overflow-hidden select-none">
        <div className="flex w-max animate-marquee gap-8 items-center">
          {[...allSkillsList, ...allSkillsList].map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={`${skill.name}-${index}`}
                onClick={() => setSelectedSkill(skill)}
                className="flex cursor-pointer items-center gap-2.5 rounded-full border border-border/70 bg-surface px-4 py-1.5 font-mono text-xs text-foreground/90 transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary-bright"
              >
                <Icon className="size-3.5 text-primary-bright" aria-hidden="true" />
                <span>{skill.name}</span>
                {skill.level === "Core" ? (
                  <span className="size-1.5 rounded-full bg-primary" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
