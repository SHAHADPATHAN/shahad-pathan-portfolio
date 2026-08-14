import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InitialLoader } from "@/components/InitialLoader";
import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Awards } from "@/components/sections/Awards";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
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
  url: profile.website,
  email: profile.email,
  telephone: profile.phone,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: profile.institution,
  },
  knowsAbout: ["Artificial Intelligence", "Data Science", "Machine Learning", "Python", "React", "TypeScript"],
};

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sleek initial boot/loading entrance animation */}
      <InitialLoader />

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

        {/* Hero Section with Interactive Terminal */}
        <Hero />

        {/* Verified Credibility Highlights */}
        <CredibilityStrip />

        {/* About Section with GTU ('28) background & Focus Cards */}
        <About />

        {/* Categorized Skills */}
        <Skills />

        {/* Real Featured Projects with Uniform Card Sizing */}
        <FeaturedProjects />

        {/* Experience & Education (GTU '28) Horizontal Carousel */}
        <Experience />

        {/* Awards & Certifications with Verification */}
        <Awards />

        {/* Resume CTA */}
        <PhasePlaceholder
          id="resume"
          eyebrow="Resume"
          title="Ready to build something impactful?"
          description="View or download Shahad's professional resume."
          note="Resume PDF not added yet. Place it at public/resume/shahad-pathan-resume.pdf and set resumeAvailable to true in data/profile.ts."
        />

        {/* Full Contact Us Section */}
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
