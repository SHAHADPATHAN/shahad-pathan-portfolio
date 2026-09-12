import { useRef, useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Globe,
  Building2,
  Rocket,
  Code2,
  Users,
  HeartHandshake,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { experienceList, type ExperienceItem } from "@/data/experience";

// Map each specific experience to a representative icon
const experienceIconMap: Record<string, typeof Briefcase> = {
  "oasis-web-intern": Code2,
  "internshala-isp": Users,
  "agnirva-space-intern": Rocket,
  "rotary-intern": HeartHandshake,
};

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const Icon = experienceIconMap[item.id] ?? Briefcase;
  const isRemote = item.workType === "Remote";

  return (
    <article className="surface-panel glow-orange group relative flex min-h-[520px] sm:min-h-[500px] w-[86vw] max-w-[340px] xs:max-w-[360px] sm:w-[380px] md:w-[400px] lg:w-[420px] shrink-0 snap-start snap-always flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/90 p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-2 hover:shadow-[0_16px_40px_-16px_var(--glow)] select-none">
      {/* Top hover ambient glow line */}
      <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Top & Main Body Content */}
      <div>
        {/* Header Row: Icon, Category Badge & Work Type */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary-bright transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary/20">
            <Icon className="size-5.5" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {item.badgeLabel && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary-bright uppercase tracking-wider">
                {item.badgeLabel}
              </span>
            )}
            {item.workType && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                {isRemote ? (
                  <Globe className="size-2.5 text-primary" aria-hidden="true" />
                ) : (
                  <Building2 className="size-2.5 text-primary" aria-hidden="true" />
                )}
                <span>{item.workType}</span>
              </span>
            )}
          </div>
        </div>

        {/* Role & Company */}
        <div className="mt-4">
          <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-foreground transition-colors group-hover:text-primary-bright line-clamp-2">
            {item.role}
          </h3>
          <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-primary-bright">
            {item.organization}
          </p>

          {/* Date & Location Metas */}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
              <Calendar className="size-3 text-primary" aria-hidden="true" />
              {item.period}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2 py-0.5">
                <MapPin className="size-3 text-muted-foreground" aria-hidden="true" />
                {item.location}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
          {item.description}
        </p>

        {/* Key Achievements Bullet Points */}
        <div className="mt-4 border-t border-border/60 pt-3.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-bright/90">
            Key Contributions &amp; Impact
          </p>
          <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
            {item.highlights.slice(0, 3).map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 size-3.5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span className="leading-snug text-foreground/90 line-clamp-2">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills / Tech Stack Footer */}
      {item.skills && item.skills.length > 0 && (
        <div className="mt-5 border-t border-border/80 pt-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-surface/90 px-2 py-0.5 font-mono text-[10px] text-foreground/80 transition-colors group-hover:border-primary/30 group-hover:text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export function Experience() {
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
    const scrollAmount = Math.max(scrollRef.current.clientWidth * 0.75, 320);
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
      id="experience"
      className="relative scroll-mt-24 border-t border-border py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Subtle Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-40 size-[450px] rounded-full bg-primary/5 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-40 size-[450px] rounded-full bg-primary/5 blur-[120px]"
      />

      <Container>
        {/* Section Header with Left/Right Scroll Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Career & Industry Experience"
            title="Professional Experience"
            description="Verified engineering internships, space telemetry research with ISRO-affiliated organizations, responsive web application development, and campus leadership."
          />

          {/* Action & Carousel Controls */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline-block">
              {experienceList.length} Roles
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll experience left"
                className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll experience right"
                className="flex size-9 sm:size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
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
            aria-label="Horizontal scrollable list of professional experience"
            className="scrollbar-portfolio mt-10 flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 107, 0, 0.45) rgba(255, 255, 255, 0.04)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {experienceList.map((item) => (
              <ExperienceCard key={item.id} item={item} />
            ))}
          </div>
        </ScrollReveal>

        {/* Scroll Progress Bar & Helper Label */}
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-[11px] text-muted-foreground inline-flex items-center gap-1.5">
            <span>Scroll or drag horizontally to view all roles</span>
            <ArrowRight className="size-3 text-primary" />
          </span>

          <div className="relative h-1.5 w-28 sm:w-44 overflow-hidden rounded-full bg-surface-2 border border-border/60">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-bright rounded-full transition-all duration-150"
              style={{ width: `${Math.max(20, scrollProgress)}%` }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
