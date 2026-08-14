import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        {/* Section Header with Left/Right Controls & View All */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Builds"
            title="Projects & Systems"
            description="Practical applications demonstrating AI integration, data science modeling, and modern web architecture."
          />

          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="group hidden items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright sm:inline-flex"
            >
              All Projects ({projects.length})
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {/* Scroll Action Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Scroll projects left"
                className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Scroll projects right"
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
            aria-label="Horizontal scrollable list of projects and systems"
            className="mt-10 flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory focus-visible:outline-none"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255, 107, 0, 0.4) transparent",
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="h-[530px] w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start snap-always"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8 flex justify-center sm:hidden" delay={0.1}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            View All Projects ({projects.length})
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
