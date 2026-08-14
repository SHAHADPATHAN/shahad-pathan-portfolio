import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectFilters, type FilterValue } from "@/components/projects/ProjectFilters";
import { projects, usedCategories, hasRealProjects } from "@/data/projects";
import { profile } from "@/data/profile";

const title = `Projects | ${profile.name}`;
const description =
  "AI, Data Science and web development projects built by Shahad Pathan — problem, stack and implementation.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = usedCategories();
  const [filter, setFilter] = useState<FilterValue>("All");

  const showFilters = projects.length > 3 && categories.length > 1;
  const visible =
    filter === "All" || !showFilters ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="pt-28 pb-20 lg:pt-36 lg:pb-28">
        <Container>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Back home
          </Link>

          <div className="mt-8">
            <SectionHeading
              eyebrow="Work"
              title="All projects"
              description="Everything I've built and documented, from applied AI and data work to modern web interfaces."
            />
          </div>

          {!hasRealProjects() ? (
            <p className="mt-8 rounded-xl border border-dashed border-border bg-surface/40 p-5 text-sm text-muted-foreground">
              Project content hasn&apos;t been added yet — the cards below show the structure with
              placeholders. Detailed case-study pages arrive in Phase 3.
            </p>
          ) : null}

          {showFilters ? (
            <div className="mt-8">
              <ProjectFilters categories={categories} value={filter} onChange={setFilter} />
            </div>
          ) : null}

          <div className="mt-10">
            <ProjectGrid projects={visible} />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
