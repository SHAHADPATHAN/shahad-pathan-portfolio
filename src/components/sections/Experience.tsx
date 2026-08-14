import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { allJourneyItems, type ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

function JourneyCard({ item }: { item: ExperienceItem }) {
  const isEducation = item.type === "education";
  const Icon = isEducation ? GraduationCap : Briefcase;

  return (
    <article
      className={cn(
        "surface-panel glow-orange group relative flex h-[500px] w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start snap-always flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-2",
        isEducation && "border-primary/40 bg-surface/90",
      )}
    >
      {/* Top Section */}
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright transition-transform duration-300 group-hover:scale-105">
            <Icon className="size-5" aria-hidden="true" />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {isEducation ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-primary-bright uppercase tracking-wider">
                <Sparkles className="size-3" />
                GTU &apos;28
              </span>
            ) : (
              <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {item.badgeLabel ?? "Internship"}
              </span>
            )}
          </div>
        </div>

        {/* Role & Organization */}
        <div className="mt-5">
          <h3 className="font-display text-lg font-bold text-foreground sm:text-xl line-clamp-2">
            {item.role}
          </h3>
          <p className="mt-1 font-mono text-xs font-semibold text-primary-bright">
            {item.organization}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3 text-primary" aria-hidden="true" />
              {item.period}
            </span>
            {item.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3 text-muted-foreground" aria-hidden="true" />
                {item.location}
              </span>
            ) : null}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Highlights */}
        <ul className="mt-3.5 space-y-1.5 text-xs text-muted-foreground">
          {item.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Skill Tags (Fixed to Bottom) */}
      {item.skills && item.skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/80 pt-3.5">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded border border-border bg-surface/60 px-2 py-0.5 font-mono text-[10px] text-foreground/80"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function Experience() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="experience" className="scroll-mt-24 border-t border-border py-20 lg:py-28">
      <Container>
        {/* Section Header with Left/Right Scroll Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Journey & Milestones"
            title="Experience & Education"
            description="Academic foundation at Gujarat Technological University (Class of 2028) alongside verified industry internships."
          />

          {/* Scroll Action Arrows */}
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline-block">
              {allJourneyItems.length} Milestones
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll experience left"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll experience right"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Track */}
        <ScrollReveal delay={0.1}>
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            aria-label="Horizontal scrollable list of education and experience cards"
            className="mt-10 flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 107, 0, 0.4) transparent",
            }}
          >
            {allJourneyItems.map((item) => (
              <JourneyCard key={item.id} item={item} />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
