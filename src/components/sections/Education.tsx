import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  Cpu,
  Binary,
  Sparkles,
  School,
  FileCheck2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { educationList } from "@/data/experience";

export function Education() {
  const gtuDegree = educationList.find((item) => item.id === "gtu-be-ce") ?? educationList[0]!;
  const highSchool = educationList.find((item) => item.id === "hsc-ssc-school") ?? educationList[1]!;

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
        {/* Section Header with Verified Milestones Badge */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Academic Foundation & Degrees"
            title="Education & Academics"
            description="Undergraduate computer engineering curriculum, artificial intelligence specialization, and rigorous STEM grounding at Gujarat Technological University (Class of 2028)."
          />

          {/* Academic Milestones Verification Badge */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-primary-bright">
              <GraduationCap className="size-4" />
              <span>2 Academic Milestones</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-muted-foreground">
              <span>GTU &apos;28 • B.E. Computer Engineering</span>
            </span>
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

        {/* Responsive Balanced 2-Column Academic Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-stretch">
          {/* ========================================================================= */}
          {/* CARD 1: Gujarat Technological University (GTU) B.E. Degree                */}
          {/* ========================================================================= */}
          <ScrollReveal delay={0.06} className="h-full">
            <article className="surface-panel glow-orange relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-b from-surface via-surface to-surface-2 p-6 sm:p-8 lg:p-9 shadow-2xl">
              {/* Top ambient glare line */}
              <div className="pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              <div>
                {/* Header: Meta Badges Row */}
                <div className="border-b border-border/80 pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                      </span>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-bright">
                        Undergraduate Degree · In Progress
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-primary-bright">
                        Class of 2028
                      </span>
                      <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                        4-Year Program
                      </span>
                    </div>
                  </div>

                  {/* Main Title Row: Icon + Full Width Degree Title */}
                  <div className="mt-4 flex items-start gap-3.5 sm:gap-4">
                    <div className="relative flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-surface shadow-md text-primary-bright">
                      <GraduationCap className="size-6 sm:size-7" />
                      <span className="absolute -bottom-1 -right-1 flex size-4.5 items-center justify-center rounded-full border border-border bg-surface text-[10px]">
                        🎓
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug">
                        {gtuDegree.role}
                      </h3>
                      <h4 className="mt-1 font-mono text-xs sm:text-sm font-semibold text-primary-bright">
                        {gtuDegree.organization}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Approved by AICTE • Government of Gujarat Technological University
                      </p>
                    </div>
                  </div>

                  {/* Date & Location Metas */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                      <Calendar className="size-3.5 text-primary" />
                      {gtuDegree.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      {gtuDegree.location}
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {gtuDegree.description}
                </p>

                {/* Dual-Column Academic Breakdown: Curriculum & Research Highlights */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 border-t border-border/80 pt-5">
                  {/* Column 1: Core Curriculum & Competencies */}
                  <div className="rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
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
                  </div>

                  {/* Column 2: Academic Distinctions & Engineering Honors */}
                  <div className="rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
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
              </div>

              {/* Skills & Coursework Pills */}
              <div className="mt-6 border-t border-border/80 pt-4">
                <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Core Engineering Disciplines
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {gtuDegree.skills?.map((skill) => (
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
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* CARD 2: High School & Higher Secondary (H.S.C & S.S.C)                    */}
          {/* ========================================================================= */}
          {highSchool && (
            <ScrollReveal delay={0.12} className="h-full">
              <article className="surface-panel group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-6 sm:p-8 lg:p-9 shadow-2xl transition-all duration-300 hover:border-border-strong hover:bg-surface-2">
                <div>
                  {/* Header: Meta Badges Row */}
                  <div className="border-b border-border/70 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-bright">
                        <Binary className="size-3.5 text-primary" />
                        <span>Science &amp; Mathematics Stream</span>
                      </div>

                      <span className="rounded-full border border-border bg-surface px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {highSchool.badgeLabel ?? "STEM Foundation"}
                      </span>
                    </div>

                    {/* Main Title Row: Icon + Full Width School Role */}
                    <div className="mt-4 flex items-start gap-3.5 sm:gap-4">
                      <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-foreground transition-transform duration-300 group-hover:scale-105 group-hover:text-primary-bright shadow-sm">
                        <BookOpen className="size-6 sm:size-7" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug group-hover:text-primary-bright transition-colors">
                          {highSchool.role}
                        </h3>
                        <h4 className="mt-1 font-mono text-xs sm:text-sm font-semibold text-primary-bright">
                          {highSchool.organization}
                        </h4>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          State Board Secondary &amp; Higher Secondary Science Education
                        </p>
                      </div>
                    </div>

                    {/* Date & Location Metas */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                        <Calendar className="size-3.5 text-primary" />
                        {highSchool.period}
                      </span>
                      {highSchool.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                          <MapPin className="size-3.5 text-muted-foreground" />
                          {highSchool.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Narrative Summary */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {highSchool.description}
                  </p>

                  {/* STEM Foundation Highlights Box */}
                  <div className="mt-6 rounded-xl border border-border/70 bg-surface/50 p-4 sm:p-5">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="size-3.5 text-primary" />
                      <span>STEM Foundation &amp; Rigor</span>
                    </div>

                    <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                      {highSchool.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                          <span className="text-foreground/90 leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Secondary Foundation Note */}
                  <div className="mt-4 rounded-xl border border-border/60 bg-surface/30 p-3.5 flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">
                      <School className="size-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      Comprehensive focus on advanced pre-engineering mathematics, calculus, mechanics, and physics principles.
                    </p>
                  </div>
                </div>

                {/* Skills */}
                {highSchool.skills && highSchool.skills.length > 0 && (
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Core Preparatory Subjects
                    </p>
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
            </ScrollReveal>
          )}
        </div>

        {/* Academic Credibility Verification Banner */}
        <ScrollReveal delay={0.16}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-border/70 bg-surface/40 px-5 py-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-foreground/90 font-medium">Verified Academic Track:</span>
              <span>Degree in progress with active academic hackathons &amp; capstone R&amp;D.</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1 text-primary-bright">
                <FileCheck2 className="size-3.5" />
                <span>AICTE Approved</span>
              </span>
              <span>•</span>
              <span>GTU-GSET Ahmedabad</span>
              <span>•</span>
              <span className="font-semibold text-foreground">Class of 2028</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
