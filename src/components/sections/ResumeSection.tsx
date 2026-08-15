import { useState } from "react";
import {
  Download,
  ExternalLink,
  FileText,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { profile } from "@/data/profile";

export function ResumeSection() {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reduced = useReducedMotion();

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}${profile.resumePath}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="resume" className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[580px] rounded-full bg-primary/6 blur-[130px]"
      />

      <Container className="max-w-5xl">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border">
            <SectionHeading
              eyebrow="Resume"
              title="Official Resume Document"
              description="View or download Shahad Pathan's verified curriculum vitae and credentials."
              className="max-w-xl"
            />

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={profile.resumePath}
                download="shahad-pathan-resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-bright hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Download className="size-4" aria-hidden="true" />
                Download PDF
              </a>

              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Open in Tab
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                aria-label="Copy resume link"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-emerald-500" aria-hidden="true" />
                    <span className="text-emerald-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden="true" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Status Pill & File Metadata */}
        <ScrollReveal delay={0.08}>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileCheck className="size-3.5 text-primary-bright" />
              <span className="font-semibold text-foreground">resume.pdf</span>
              <span className="text-muted-foreground/60">•</span>
              <span>Computer Engineering · AI &amp; Data Science</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Internships &amp; Roles</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Compact Live Embedded Resume Document */}
        <ScrollReveal delay={0.12}>
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-4 surface-panel glow-orange rounded-2xl p-3.5 sm:p-5 border border-border"
          >
            {/* Viewer Top Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary-bright">
                  <FileText className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-foreground">
                    Shahad Pathan — Resume
                  </h4>
                  <p className="font-mono text-[10px] sm:text-[11px] text-muted-foreground">
                    Official Document
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Maximize2 className="size-3.5" />
                  Expand View
                </button>

                <a
                  href={profile.resumePath}
                  download="shahad-pathan-resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-bright transition-colors"
                >
                  <Download className="size-3.5" />
                  Download
                </a>
              </div>
            </div>

            {/* Embedded Document Frame */}
            <div className="relative w-full overflow-hidden rounded-xl border border-border bg-surface-2">
              <iframe
                src={`${profile.resumePath}#toolbar=1&navpanes=0`}
                title="Shahad Pathan Resume PDF"
                className="h-[480px] sm:h-[560px] md:h-[600px] w-full border-0 bg-white dark:bg-zinc-900"
              />

              {/* Mobile Quick Action Fallback */}
              <div className="sm:hidden p-3.5 bg-surface border-t border-border flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">
                  Tap to open PDF document.
                </span>
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary-bright shrink-0"
                >
                  Open PDF <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </Container>

      {/* Fullscreen PDF Modal Overlay */}
      <AnimatePresence>
        {isFullscreen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <span className="font-display font-bold text-foreground">
                  Shahad Pathan — Resume Preview
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={profile.resumePath}
                  download="shahad-pathan-resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-bright transition-colors"
                >
                  <Download className="size-3.5" />
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  <Minimize2 className="size-3.5" />
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 mt-4 overflow-hidden rounded-xl border border-border">
              <iframe
                src={`${profile.resumePath}#toolbar=1`}
                title="Fullscreen Resume View"
                className="size-full border-0 bg-white dark:bg-zinc-900"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
