import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { AntigravityCanvas } from "@/components/motion/AntigravityCanvas";
import { HeroTerminal } from "@/components/HeroTerminal";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";

export function Hero() {
  const reduced = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      {/* Interactive Antigravity Canvas Particle Simulation */}
      <AntigravityCanvas />

      {/* Grid Backdrop & Ambient Radial Nebulae */}
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-20 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_50%_at_50%_0%,transparent,var(--color-background)_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/4 -z-10 size-[520px] rounded-full bg-primary/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-20 -z-10 size-[420px] rounded-full bg-primary/6 blur-[110px]"
      />

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <motion.p {...fade(0.05)} className="eyebrow">
            {profile.eyebrow}
          </motion.p>

          <h1 className="mt-5 text-[2.5rem] leading-[1.05] font-bold sm:text-5xl lg:text-[4.25rem]">
            <AnimatedText text="Hi, I'm" delay={0.15} className="text-foreground" />{" "}
            <AnimatedText text="Shahad Pathan." delay={0.3} className="text-primary-bright" />
          </h1>

          <motion.p
            {...fade(0.55)}
            className="mt-6 max-w-xl font-display text-lg leading-snug text-foreground/90 sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            {...fade(0.65)}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            {...fade(0.75)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
            >
              View My Work
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={profile.resumeAvailable ? profile.resumePath : "#resume"}
              download={profile.resumeAvailable ? "" : undefined}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.div {...fade(0.85)} className="mt-9">
            <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Find me
            </p>
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroTerminal />
        </motion.div>
      </Container>
    </section>
  );
}
