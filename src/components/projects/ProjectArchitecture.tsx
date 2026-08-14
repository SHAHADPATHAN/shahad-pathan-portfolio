import { ArrowDown, ArrowRight, Cpu, Database, Globe, Layers, Server, Network } from "lucide-react";
import type { Project, ProjectArchitecture as ProjectArchitectureType, ProjectArchitectureNode } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const layerIconMap: Record<ProjectArchitectureNode["layer"], typeof Globe> = {
  frontend: Globe,
  api: Network,
  backend: Server,
  "ai-model": Cpu,
  database: Database,
  external: Layers,
};

const layerLabelMap: Record<ProjectArchitectureNode["layer"], string> = {
  frontend: "Client Layer",
  api: "API Gateway",
  backend: "Core Engine",
  "ai-model": "AI / ML Runtime",
  database: "Data Store",
  external: "External Service",
};

export function ProjectArchitecture({ project }: { project: Project }) {
  const arch = typeof project.architecture === "object" ? project.architecture : undefined;
  const nodes = arch?.nodes ?? [
    {
      layer: "frontend",
      title: "Client Interface",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description: "User presentation and state management layer.",
    },
    {
      layer: "api",
      title: "API Layer",
      technologies: ["REST / GraphQL"],
      description: "Data validation, authorization and routing.",
    },
    {
      layer: "backend",
      title: "Business Logic",
      technologies: ["Python / Node.js"],
      description: "Core service execution and data processing pipeline.",
    },
    {
      layer: "database",
      title: "Persistence",
      technologies: ["SQL / NoSQL / Cache"],
      description: "Relational storage and session persistence.",
    },
  ];

  const summary =
    arch?.summary ??
    (typeof project.architecture === "string"
      ? project.architecture
      : "System architecture organized into modular, decoupled layers to ensure maintainability, predictable data flow, and low latency.");

  return (
    <section aria-labelledby="project-architecture-heading" className="border-t border-border bg-surface/30 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Architecture"
          title="System design & data flow"
          description="How data travels through the system from the user interface down to persistence."
        />

        <ScrollReveal className="mt-6 max-w-3xl">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {summary}
          </p>
        </ScrollReveal>

        {/* Visual Pipeline Diagram */}
        <div className="mt-12">
          {/* Desktop/Tablet Horizontal Grid or Vertical Chain */}
          <div className="space-y-4 lg:hidden">
            {nodes.map((node, i) => {
              const Icon = layerIconMap[node.layer] ?? Layers;
              const isLast = i === nodes.length - 1;

              return (
                <div key={`${node.title}-${i}`} className="flex flex-col items-center">
                  <ScrollReveal delay={0.06 * i} className="w-full">
                    <article className="surface-panel glow-orange group relative rounded-2xl p-6 transition-colors hover:border-border-strong">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-primary-bright">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-primary-bright">
                              {layerLabelMap[node.layer]}
                            </span>
                            <h3 className="font-display text-base font-semibold text-foreground">
                              {node.title}
                            </h3>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground/60">
                          Step 0{i + 1}
                        </span>
                      </div>

                      {node.description ? (
                        <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {node.description}
                        </p>
                      ) : null}

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {node.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] tracking-wide text-foreground/80 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </ScrollReveal>

                  {!isLast ? (
                    <div className="my-2 flex justify-center text-primary-bright/60" aria-hidden="true">
                      <ArrowDown className="size-5 animate-pulse" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Desktop Connected Flow */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-3">
            {nodes.map((node, i) => {
              const Icon = layerIconMap[node.layer] ?? Layers;
              const isLast = i === nodes.length - 1;

              return (
                <div key={`desktop-${node.title}-${i}`} className="relative flex flex-col">
                  <ScrollReveal delay={0.06 * i} className="flex h-full flex-col">
                    <article className="surface-panel group relative flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:border-border-strong hover:bg-surface-2">
                      <div className="flex items-center justify-between">
                        <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface text-primary-bright transition-transform group-hover:scale-105">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[11px] font-medium text-muted-foreground/60">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="mt-4">
                        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-primary-bright">
                          {layerLabelMap[node.layer]}
                        </span>
                        <h3 className="mt-1 font-display text-sm font-semibold text-foreground">
                          {node.title}
                        </h3>
                      </div>

                      {node.description ? (
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                          {node.description}
                        </p>
                      ) : null}

                      <div className="mt-auto pt-4">
                        <div className="flex flex-wrap gap-1">
                          {node.technologies.map((t) => (
                            <span
                              key={t}
                              className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-foreground/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>

                  {!isLast ? (
                    <div
                      className="absolute -right-2 top-1/2 -z-10 -translate-y-1/2 translate-x-1/2 text-border-strong"
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-4 text-primary-bright/50" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
