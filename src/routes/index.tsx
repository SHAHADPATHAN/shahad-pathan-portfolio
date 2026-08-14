import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { PhasePlaceholder } from "@/components/sections/PhasePlaceholder";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: profile.seo.title },
      { name: "description", content: profile.seo.description },
      { property: "og:title", content: profile.seo.title },
      { property: "og:description", content: profile.seo.description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.seo.description,
  knowsAbout: ["Artificial Intelligence", "Data Science", "Machine Learning", "Web Development"],
};

function Home() {
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
        <h1 className="sr-only">
          {profile.name} — {profile.role} building AI, data and software solutions
        </h1>
        <Hero />
        <CredibilityStrip />
        <PhasePlaceholder
          id="about"
          eyebrow="About"
          title="A little about me"
          description="Professional introduction, education, technical interests and current focus."
          note="Coming in Phase 2 — About, Skills and Featured Projects."
        />
        <PhasePlaceholder
          id="projects"
          eyebrow="Work"
          title="Featured projects"
          description="Selected work with problem, solution, stack and outcomes."
          note="No projects available yet. [ADD PROJECT] — project system arrives in Phase 2 and 3."
        />
        <PhasePlaceholder
          id="experience"
          eyebrow="Experience"
          title="Experience & education"
          description="A timeline of education, internships, open source and leadership."
          note="Coming in Phase 4. [ADD EXPERIENCE]"
        />
        <PhasePlaceholder
          id="achievements"
          eyebrow="Evidence"
          title="Achievements"
          description="Recognitions with organization, date and verifiable proof."
          note="No achievements available yet. [ADD ACHIEVEMENT]"
        />
        <PhasePlaceholder
          id="certificates"
          eyebrow="Credentials"
          title="Certifications"
          description="A filterable gallery of verified certifications."
          note="No certificates available yet. [ADD CERTIFICATE]"
        />
        <PhasePlaceholder
          id="resume"
          eyebrow="Resume"
          title="Ready to build something impactful?"
          description="View or download the full professional resume."
          note="Resume PDF not added yet. Place it at public/resume/shahad-pathan-resume.pdf and set resumeAvailable to true in data/profile.ts."
        />
        <PhasePlaceholder
          id="blog"
          eyebrow="Writing"
          title="Blog"
          description="Notes on AI, data and building software."
          note="No blog posts yet. Blog arrives in Phase 6."
        />
        <PhasePlaceholder
          id="contact"
          eyebrow="Contact"
          title="Let's build something great."
          description="Open to internships, collaborations and interesting problems."
          note={`Contact form arrives in Phase 5. Email: ${profile.email}`}
        />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
