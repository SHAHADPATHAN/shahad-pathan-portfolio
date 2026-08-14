import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { ProjectTechStack } from "@/components/projects/ProjectTechStack";
import { ProjectArchitecture } from "@/components/projects/ProjectArchitecture";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectChallenges } from "@/components/projects/ProjectChallenges";
import { ProjectResults } from "@/components/projects/ProjectResults";
import { ProjectLessons } from "@/components/projects/ProjectLessons";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { getProjectBySlug } from "@/data/projects";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/container";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData, params }) => {
    const project = loaderData?.project ?? getProjectBySlug(params.slug);
    const title = project
      ? `${project.title} — Case Study | ${profile.name}`
      : `Project Not Found | ${profile.name}`;
    const description = project?.shortDescription ?? profile.seo.description;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center pt-24 pb-16">
        <Container className="max-w-md text-center">
          <p className="eyebrow mb-2">404 — Not Found</p>
          <h1 className="font-display text-3xl font-bold text-foreground">Project Not Found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The project you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to all projects
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.category,
    description: project.shortDescription,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        {/* Project Hero Header */}
        <ProjectHero project={project} />

        {/* Project Overview & Problem / Solution */}
        <ProjectOverview project={project} />

        {/* Key Features */}
        <ProjectFeatures project={project} />

        {/* Technology Stack */}
        <ProjectTechStack project={project} />

        {/* System Architecture */}
        <ProjectArchitecture project={project} />

        {/* Screenshots Gallery */}
        <ProjectGallery project={project} />

        {/* Challenges & Solutions */}
        <ProjectChallenges project={project} />

        {/* Outcomes & Verified Results */}
        <ProjectResults project={project} />

        {/* Lessons Learned & Future Roadmap */}
        <ProjectLessons project={project} />

        {/* Related Projects */}
        <RelatedProjects currentSlug={project.slug} />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </div>
  );
}
