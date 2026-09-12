import { useRef, useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  Cpu,
  Brain,
  Binary,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { educationList } from "@/data/experience";

export function Education() {
  const gtuDegree = educationList.find((item) => item.id === "gtu-be-ce") ?? educationList[0]!;
  const highSchool = educationList.find((item) => item.id === "hsc-ssc-school") ?? educationList[1]!;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse Drag Tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const updateScrollProgress = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, [updateScrollProgress]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = Math.max(scrollRef.current.clientWidth * 0.75, 340);
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if ((e.target as HTMLElement).closest("button, a")) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.removeProperty("user-select");
    }
  };

  return (
    <section
      id="education"
      className="relative scroll-mt-24 border-t border-border py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 size-[500px] rounded-full bg-primary/6 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 size-[450px] rounded-full bg-cyan-500/5 blur-[130px]"
      />

      <Container>
        {/* Section Header with Left/Right Scroll Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Academic Foundation & Degrees"
            title="Education & Academics"
            description="Undergraduate computer engineering curriculum, artificial intelligence specialization, and rigorous STEM grounding at Gujarat Technological University (Class of 2028)."
          />

          {/* Controls & Milestones Count */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline-block">
              2 Academic Milestones
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll education left"
                className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll education right"
                className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Academic Highlights Stat Strip */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-3.5 sm:p-4 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-primary-bright">GTU &apos;28</p>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider">
              Graduation Target
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-3.5 sm:p-4 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-cyan-400">B.E. CE</p>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider">
              Computer Engineering
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-3.5 sm:p-4 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-emerald-400">AI &amp; ML</p>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider">
              Specialized Track
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-3.5 sm:p-4 text-center">
            <p className="font-display text-xl sm:text-2xl font-bold text-purple-400">State Govt</p>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider">
              University Affiliation
            </p>
          </div>
        </div>

        {/* Horizontal Scrollable Track with Styled Scrollbar */}
        <ScrollReveal delay={0.08}>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            tabIndex={0}
            aria-label="Horizontal scrollable list of education credentials"
            className="scrollbar-portfolio mt-8 flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 107, 0, 0.45) rgba(255, 255, 255, 0.04)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* ========================================================================= */}
            {/* CARD 1: Gujarat Technological University (GTU) B.E. Degree                */}
            {/* ========================================================================= */}
            <article className="surface-panel glow-orange relative flex min-h-[540px] w-[86vw] max-w-[340px] xs:max-w-[420px] sm:w-[560px] md:w-[680px] lg:w-[740px] shrink-0 snap-start snap-always flex-col justify-between overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-b from-surface via-surface to-surface-2 p-5 sm:p-8 lg:p-9 shadow-2xl select-none">
              {/* Top ambient glare line */}
              <div className="pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              <div>
                {/* Status Header: Live Degree Badge & University Info */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="relative flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-surface shadow-lg text-primary-bright">
                      <GraduationCap className="size-6 sm:size-7" />
                      <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border border-border bg-surface text-[10px]">
                        🎓
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                        </span>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-bright">
                          Undergraduate Degree · In Progress
                        </span>
                      </div>

                      <h3 className="mt-1 font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                        {gtuDegree.role}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold text-primary-bright">
                      Class of 2028
                    </span>
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
                      4-Year Program
                    </span>
                  </div>
                </div>

                {/* Institution Details & Metadata Chips */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-mono text-xs sm:text-sm font-semibold text-primary-bright">
                      {gtuDegree.organization}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Approved by AICTE • Government of Gujarat Technological University
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
                      <Calendar className="size-3 text-primary" />
                      {gtuDegree.period}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
                      <MapPin className="size-3 text-muted-foreground" />
                      {gtuDegree.location}
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">
                  {gtuDegree.description}
                </p>

                {/* Dual-Column Academic Breakdown: Curriculum & Research Highlights */}
                <div className="mt-6 grid gap-4 md:grid-cols-2 border-t border-border/80 pt-5">
                  {/* Column 1: Core Curriculum & Competencies */}
                  <div className="rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-primary-bright uppercase tracking-wider">
                      <Cpu className="size-3.5 text-primary" />
                      <span>Curriculum &amp; Specialization</span>
                    </div>

                    <ul className="mt-3 space-y-2 text-xs text-foreground/90">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>
                          <strong>AI &amp; ML:</strong> Neural networks, model training, computer vision pipelines.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>
                          <strong>Computing Systems:</strong> Data Structures &amp; Algorithms, OOP, Linux.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>
                          <strong>Data Engineering:</strong> Relational Database Management (SQL) &amp; schemas.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Academic Distinctions & Engineering Honors */}
                  <div className="rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                      <Award className="size-3.5 text-cyan-400" />
                      <span>Academic Distinctions</span>
                    </div>

                    <ul className="mt-3 space-y-2 text-xs text-foreground/90">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-400" />
                        <span>
                          <strong>IIT Guwahati TechExpo:</strong> Represented GTU exhibiting intelligent systems.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-400" />
                        <span>
                          <strong>NHAI National Hackathon:</strong> Computer vision safety telemetry models.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-400" />
                        <span>
                          <strong>Capstone Engineering:</strong> Lead developer on AegisAI and PRISM.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills & Coursework Pills */}
              <div className="mt-6 border-t border-border/80 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {gtuDegree.skills?.slice(0, 7).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] text-foreground transition-colors hover:border-primary/40 hover:text-primary-bright"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* ========================================================================= */}
            {/* CARD 2: High School & Higher Secondary (H.S.C & S.S.C)                    */}
            {/* ========================================================================= */}
            {highSchool && (
              <article className="surface-panel group relative flex min-h-[540px] w-[86vw] max-w-[340px] xs:max-w-[420px] sm:w-[560px] md:w-[680px] lg:w-[740px] shrink-0 snap-start snap-always flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-5 sm:p-8 lg:p-9 transition-all duration-300 hover:border-border-strong hover:bg-surface-2 select-none">
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-border/70 pb-5">
                    <div className="flex items-start gap-3.5">
                      <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-foreground transition-transform duration-300 group-hover:scale-105 group-hover:text-primary-bright">
                        <BookOpen className="size-6 sm:size-7" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary-bright transition-colors">
                            {highSchool.role}
                          </h3>
                          <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                            {highSchool.badgeLabel ?? "High School"}
                          </span>
                        </div>

                        <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-primary-bright">
                          {highSchool.organization}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
                            <Calendar className="size-3 text-primary" />
                            {highSchool.period}
                          </span>
                          {highSchool.location && (
                            <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
                              <MapPin className="size-3 text-muted-foreground" />
                              {highSchool.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground self-start sm:self-auto">
                      <Binary className="size-3 text-primary" />
                      <span>Science &amp; Mathematics Stream</span>
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {highSchool.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-6 rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      STEM Foundation &amp; Rigor
                    </p>
                    <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                      {highSchool.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span className="text-foreground/90">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                {highSchool.skills && highSchool.skills.length > 0 && (
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {highSchool.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-surface/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            )}
          </div>
        </ScrollReveal>

        {/* Scroll Progress Bar & Helper Label */}
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
            <span>Scroll horizontally to view all academic foundations</span>
            <ArrowRight className="size-3 text-primary" />
          </span>

          <div className="relative h-1.5 w-28 sm:w-44 overflow-hidden rounded-full bg-surface-2 border border-border/60">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-bright rounded-full transition-all duration-150"
              style={{ width: `${Math.max(35, scrollProgress)}%` }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
