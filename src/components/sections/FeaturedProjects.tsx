import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { featuredProjects, otherProjects, hasRealProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = featuredProjects();
  const others = otherProjects();

  return (
    <section id="projects" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Work"
          title="Featured projects"
          description="A selection of projects that show how I approach real problems — framing, data, implementation and interface."
        />

        {!hasRealProjects() ? (
          <p className="mt-8 rounded-xl border border-dashed border-border bg-surface/40 p-5 text-sm text-muted-foreground">
            Project content hasn&apos;t been added yet. The cards below show the real structure with
            [ADD PROJECT] placeholders — fill them in{" "}
            <code className="font-mono">src/data/projects.ts</code>.
          </p>
        ) : null}

        <div className="mt-10 space-y-6">
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={0.05 * i}>
              <ProjectCard project={project} variant="featured" />
            </ScrollReveal>
          ))}

          {others.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((project, i) => (
                <ScrollReveal key={project.id} delay={0.06 * i} className="h-full">
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>

        <ScrollReveal className="mt-10 flex justify-center" delay={0.1}>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            View all projects
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
