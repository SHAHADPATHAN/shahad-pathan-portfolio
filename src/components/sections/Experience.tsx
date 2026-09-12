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
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { experienceList, type ExperienceItem } from "@/data/experience";
import { cn } from "@/lib/utils";

// Map each specific experience to a representative icon
const experienceIconMap: Record<string, typeof Briefcase> = {
  "oasis-web-intern": Code2,
  "internshala-isp": Users,
  "agnirva-space-intern": Rocket,
  "rotary-intern": HeartHandshake,
};

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const Icon = experienceIconMap[item.id] ?? Briefcase;
  const isRemote = item.workType === "Remote";

  return (
    <ScrollReveal delay={0.08 * index} className="h-full">
      <article className="surface-panel glow-orange group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-2 hover:shadow-[0_16px_40px_-16px_var(--glow)]">
        {/* Top hover ambient glow line */}
        <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top & Main Body Content */}
        <div>
          {/* Header Row: Icon, Category Badge & Work Type */}
          <div className="flex items-start justify-between gap-3">
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
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-primary-bright">
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
          <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          {/* Key Achievements Bullet Points */}
          <div className="mt-4 border-t border-border/60 pt-3.5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-primary-bright/90">
              Key Contributions &amp; Impact
            </p>
            <ul className="mt-2 space-y-2 text-xs sm:text-sm text-muted-foreground">
              {item.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 size-3.5 shrink-0 text-primary transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="leading-snug text-foreground/90">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills / Tech Stack Footer */}
        {item.skills && item.skills.length > 0 && (
          <div className="mt-6 border-t border-border/80 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-surface/90 px-2.5 py-1 font-mono text-[11px] text-foreground/80 transition-colors group-hover:border-primary/30 group-hover:text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </ScrollReveal>
  );
}

export function Experience() {
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
        {/* Section Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Career & Industry Experience"
            title="Professional Experience"
            description="Verified engineering internships, space telemetry research with ISRO-affiliated organizations, responsive web application development, and campus leadership."
          />

          {/* Quick Credibility Tags */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary-bright">
              <Briefcase className="size-3.5" />
              <span>{experienceList.length} Industry Roles</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
              <ShieldCheck className="size-3.5" />
              <span>Verified Experience</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Grid Showcase */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8 items-stretch">
          {experienceList.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
