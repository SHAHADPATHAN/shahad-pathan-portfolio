import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  Sparkles,
  Cpu,
  Brain,
  Layers,
  ShieldCheck,
  Binary,
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
        {/* Section Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Academic Foundation & Degrees"
            title="Education & Academics"
            description="Undergraduate computer engineering curriculum, artificial intelligence specialization, and rigorous STEM grounding at Gujarat Technological University (Class of 2028)."
          />

          {/* Quick Academic Metric Badges */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary-bright">
              <GraduationCap className="size-3.5" />
              <span>GTU Class of 2028</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-semibold text-cyan-300">
              <Brain className="size-3.5" />
              <span>AI &amp; Data Track</span>
            </span>
          </div>
        </div>

        {/* Academic Highlights Stat Strip */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-4 text-center">
            <p className="font-display text-2xl font-bold text-primary-bright">GTU &apos;28</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              Graduation Target
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-4 text-center">
            <p className="font-display text-2xl font-bold text-cyan-400">B.E. CE</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              Computer Engineering
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-4 text-center">
            <p className="font-display text-2xl font-bold text-emerald-400">AI &amp; ML</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              Specialized Track
            </p>
          </div>

          <div className="surface-panel rounded-2xl border border-border/80 bg-surface/70 p-4 text-center">
            <p className="font-display text-2xl font-bold text-purple-400">State Govt</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              University Affiliation
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* ========================================================================= */}
          {/* PRIMARY SHOWCASE: Gujarat Technological University (GTU) B.E. Degree       */}
          {/* ========================================================================= */}
          <ScrollReveal delay={0.08}>
            <article className="surface-panel glow-orange relative overflow-hidden rounded-3xl border border-border/90 bg-gradient-to-b from-surface via-surface to-surface-2 p-6 sm:p-8 lg:p-10 shadow-2xl">
              {/* Top ambient glare line */}
              <div className="pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              {/* Status Header: Live Degree Badge & University Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-surface shadow-lg text-primary-bright">
                    <GraduationCap className="size-7" />
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
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary-bright">
                        Undergraduate Degree · In Progress
                      </span>
                    </div>

                    <h3 className="mt-1 font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                      {gtuDegree.role}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary-bright">
                    Class of 2028
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                    4-Year Program
                  </span>
                </div>
              </div>

              {/* Institution Details & Metadata Chips */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-mono text-sm sm:text-base font-semibold text-primary-bright">
                    {gtuDegree.organization}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Approved by AICTE • Government of Gujarat Technological University
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                    <Calendar className="size-3.5 text-primary" />
                    {gtuDegree.period}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface/60 px-2.5 py-1">
                    <MapPin className="size-3.5 text-muted-foreground" />
                    {gtuDegree.location}
                  </span>
                </div>
              </div>

              {/* Narrative Summary */}
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {gtuDegree.description}
              </p>

              {/* Dual-Column Academic Breakdown: Curriculum & Research Highlights */}
              <div className="mt-8 grid gap-6 md:grid-cols-2 border-t border-border/80 pt-6">
                {/* Column 1: Core Curriculum & Competencies */}
                <div className="rounded-2xl border border-border/70 bg-surface/50 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary-bright uppercase tracking-wider">
                    <Cpu className="size-4 text-primary" />
                    <span>Core Curriculum &amp; Specialization</span>
                  </div>

                  <ul className="mt-4 space-y-3 text-xs sm:text-sm text-foreground/90">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>
                        <strong>Artificial Intelligence &amp; Machine Learning:</strong> Neural networks, model training, computer vision pipelines, and predictive algorithms.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>
                        <strong>Systems &amp; Architecture:</strong> Data Structures &amp; Algorithms, Object-Oriented Software Design, and Linux systems.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>
                        <strong>Data Engineering:</strong> Relational Database Management Systems (SQL), schema design, and ACID transactions.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Academic Distinctions & Engineering Honors */}
                <div className="rounded-2xl border border-border/70 bg-surface/50 p-5 sm:p-6">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    <Award className="size-4 text-cyan-400" />
                    <span>Academic Honors &amp; Hackathon Representation</span>
                  </div>

                  <ul className="mt-4 space-y-3 text-xs sm:text-sm text-foreground/90">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      <span>
                        <strong>IIT Guwahati TechExpo:</strong> Selected and represented GTU at national technological exhibition displaying intelligent software systems.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      <span>
                        <strong>NHAI National Hackathon (MoRTH):</strong> Participated in National Road Safety Hackathon engineering computer vision telemetry models.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      <span>
                        <strong>Live Capstone Engineering:</strong> Lead developer architecting AegisAI (Disaster Response) and PRISM (Surveillance Intelligence).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Skills & Coursework Pills */}
              <div className="mt-8 border-t border-border/80 pt-6">
                <p className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Coursework &amp; Technical Competencies
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {gtuDegree.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground transition-colors hover:border-primary/40 hover:text-primary-bright"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* SECONDARY SHOWCASE: High School & Higher Secondary (H.S.C & S.S.C)         */}
          {/* ========================================================================= */}
          {highSchool && (
            <ScrollReveal delay={0.12}>
              <article className="surface-panel group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-8 transition-all duration-300 hover:border-border-strong hover:bg-surface-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-transform duration-300 group-hover:scale-105 group-hover:text-primary-bright">
                      <BookOpen className="size-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary-bright transition-colors">
                          {highSchool.role}
                        </h4>
                        <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                          {highSchool.badgeLabel ?? "High School"}
                        </span>
                      </div>

                      <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-primary-bright">
                        {highSchool.organization}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3 text-primary" />
                          {highSchool.period}
                        </span>
                        {highSchool.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-muted-foreground" />
                            {highSchool.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground self-start sm:self-auto">
                    <Binary className="size-3 text-primary" />
                    <span>Science &amp; Mathematics Stream</span>
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {highSchool.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 border-t border-border/60 pt-3.5">
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                    {highSchool.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                {highSchool.skills && highSchool.skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border/60 pt-3.5">
                    {highSchool.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-border bg-surface/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}
