import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project, ProjectGalleryItem } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ProjectGallery({ project }: { project: Project }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const galleryItems: ProjectGalleryItem[] =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.image
        ? [{ src: project.image, alt: project.imageAlt ?? `${project.title} screenshot` }]
        : [];

  const hasItems = galleryItems.length > 0;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % galleryItems.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) =>
          prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIdx, galleryItems.length]);

  // If project has no screenshots/images, omit gallery entirely as requested
  if (!hasItems) {
    return null;
  }

  return (
    <section aria-labelledby="project-gallery-heading" className="border-t border-border py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Visuals"
          title="Screenshots & interface"
          description="Visual walkthrough of the application interface, data displays, and key user flows."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={`${item.src}-${i}`} delay={0.06 * i}>
              <figure
                onClick={() => setSelectedIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIdx(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Enlarge screenshot ${i + 1} of ${galleryItems.length}: ${item.alt}`}
                className="surface-panel group relative flex aspect-16/10 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2 transition-all duration-300 hover:border-border-strong hover:shadow-glow focus-visible:outline-2 focus-visible:outline-primary"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                    <Maximize2 className="size-5" aria-hidden="true" />
                  </span>
                </div>
                {item.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 border-t border-border/60 bg-surface/90 px-4 py-2 font-mono text-[11px] text-muted-foreground backdrop-blur-md">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && galleryItems[selectedIdx] ? (
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl sm:p-8"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(null);
              }}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="size-5" />
            </button>

            {/* Navigation buttons */}
            {galleryItems.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((selectedIdx - 1 + galleryItems.length) % galleryItems.length);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 z-10 flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((selectedIdx + 1) % galleryItems.length);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 z-10 flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            ) : null}

            {/* Lightbox Content */}
            <div
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryItems[selectedIdx].src}
                alt={galleryItems[selectedIdx].alt}
                className="max-h-[75vh] w-auto object-contain"
              />
              <div className="flex items-center justify-between border-t border-border bg-surface-2 px-5 py-3 text-xs">
                <span className="text-foreground">
                  {galleryItems[selectedIdx].caption ?? galleryItems[selectedIdx].alt}
                </span>
                <span className="font-mono text-muted-foreground">
                  {selectedIdx + 1} / {galleryItems.length}
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
