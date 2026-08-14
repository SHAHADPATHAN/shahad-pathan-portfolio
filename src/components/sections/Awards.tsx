import { useState, useRef, useEffect, useCallback, type MouseEvent } from "react";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  X,
  GraduationCap,
  Trophy,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Check,
  Search,
  LayoutGrid,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  SlidersHorizontal,
  FileCheck2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  awards,
  domainFilters,
  type DomainFilter,
  type AwardItem,
} from "@/data/awards";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/utils";

const categoryIconMap: Record<AwardItem["category"], typeof Trophy> = {
  Award: Trophy,
  Certification: BookmarkCheck,
  Hackathon: Sparkles,
  Academic: GraduationCap,
};

// High-performance 3D GPU-accelerated card without React state re-renders on mousemove
function CertificateCard({
  item,
  onView,
  onVerify,
  onCopyId,
  copiedId,
}: {
  item: AwardItem;
  onView: (item: AwardItem) => void;
  onVerify: (item: AwardItem) => void;
  onCopyId: (id: string) => void;
  copiedId: string | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) translateZ(0)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255, 107, 0, 0.18), transparent 65%)`;
        glareRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  const Icon = categoryIconMap[item.category] ?? Award;
  const isCopied = copiedId === item.credentialId;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      className="surface-panel group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/90 transition-all duration-300 hover:border-primary/50 hover:bg-surface-2 hover:shadow-[0_16px_40px_-16px_var(--glow)] select-none"
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 0.25s ease-out" }}
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/60 bg-black/40">
        <img
          src={item.image}
          alt={`${item.title} certificate`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-background/85 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary-bright backdrop-blur-md shadow-sm">
            <Icon className="size-3" aria-hidden="true" />
            <span>{item.badgeText ?? item.category}</span>
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-background/85 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-400 backdrop-blur-md shadow-sm">
            <ShieldCheck className="size-3 text-emerald-400" aria-hidden="true" />
            <span>Verified</span>
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 bg-background/35">
          <button
            type="button"
            onClick={() => onView(item)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-primary-bright"
          >
            <Eye className="size-4" aria-hidden="true" />
            <span>View Certificate</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-xs font-medium tracking-wide text-primary-bright truncate">
            {item.organization}
          </p>
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {item.issueDate}
          </span>
        </div>

        <h3 className="mt-2 font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary-bright sm:text-lg line-clamp-2">
          {item.title}
        </h3>

        <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm line-clamp-3">
          {item.description}
        </p>

        {/* Skills */}
        {item.skills && item.skills.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/80 bg-surface px-2 py-0.5 font-mono text-[10px] text-foreground/80"
              >
                {skill}
              </span>
            ))}
            {item.skills.length > 3 && (
              <span className="rounded-md border border-border/80 bg-surface/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{item.skills.length - 3}
              </span>
            )}
          </div>
        ) : null}

        {/* Bottom Actions */}
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/70 pt-4">
          {item.credentialId ? (
            <button
              type="button"
              onClick={() => item.credentialId && onCopyId(item.credentialId)}
              title="Click to copy Credential ID"
              className="group/id inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {isCopied ? (
                <Check className="size-3.5 text-emerald-400" />
              ) : (
                <Copy className="size-3.5 transition-transform group-hover/id:scale-110 text-muted-foreground/80" />
              )}
              <span className="max-w-[110px] truncate text-[10px] sm:max-w-[130px]">
                {isCopied ? "ID Copied!" : item.credentialId}
              </span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-muted-foreground">
              Institutional Record
            </span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onView(item)}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary-bright"
            >
              <Eye className="size-3.5" aria-hidden="true" />
              <span>View</span>
            </button>

            <button
              type="button"
              onClick={() => onVerify(item)}
              className="inline-flex items-center gap-1 rounded-lg bg-primary/15 border border-primary/30 px-2.5 py-1.5 text-xs font-medium text-primary-bright transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-sm"
            >
              <span>Verify</span>
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Awards() {
  const [activeFilter, setActiveFilter] = useState<DomainFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);
  const [verificationAward, setVerificationAward] = useState<AwardItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingScrollbarRef = useRef(false);
  const isDraggingCarouselRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Filter awards based on category & search query
  const filteredAwards = awards.filter((item) => {
    const matchesCategory =
      activeFilter === "All" || item.domain === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.credentialId && item.credentialId.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Calculate scroll progress & active index
  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(Math.max(progress, 0), 100));

    // Calculate active item index
    if (filteredAwards.length > 0) {
      const scrollRatio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      const idx = Math.round(scrollRatio * (filteredAwards.length - 1));
      setActiveIndex(Math.min(Math.max(idx, 0), filteredAwards.length - 1));
    }
  }, [filteredAwards.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateScrollState]);

  // Scroll left/right button triggers
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 320);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Click & Drag-to-Scroll on Carousel Track
  const handleCarouselMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    // Don't drag if clicking interactive buttons or links
    if ((e.target as HTMLElement).closest("button, a, input")) return;
    isDraggingCarouselRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.pageX - scrollRef.current.offsetLeft;
    dragStartScrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  };

  const handleCarouselMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingCarouselRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.4;
    if (Math.abs(walk) > 5) hasDraggedRef.current = true;
    scrollRef.current.scrollLeft = dragStartScrollLeftRef.current - walk;
  };

  const handleCarouselMouseUp = () => {
    isDraggingCarouselRef.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.removeProperty("user-select");
    }
  };

  // Interactive Clickable & Draggable Scrollbar Track
  const handleProgressBarClickOrDrag = (clientX: number) => {
    if (!progressBarRef.current || !scrollRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: percentage * maxScroll,
      behavior: isDraggingScrollbarRef.current ? "auto" : "smooth",
    });
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingScrollbarRef.current = true;
    handleProgressBarClickOrDrag(e.clientX);

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      if (isDraggingScrollbarRef.current) {
        handleProgressBarClickOrDrag(moveEvent.clientX);
      }
    };

    const onMouseUp = () => {
      isDraggingScrollbarRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Copy credential ID with feedback toast
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2400);
  };

  // Open verification dialog or direct link
  const handleVerify = (item: AwardItem) => {
    setVerificationAward(item);
  };

  // Open viewer modal
  const handleView = (item: AwardItem) => {
    setSelectedAward(item);
    setZoomLevel(1);
  };

  // Navigate next/prev in viewer modal
  const handleModalNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedAward) return;
      const currentIndex = filteredAwards.findIndex(
        (a) => a.id === selectedAward.id,
      );
      if (currentIndex === -1) return;

      if (direction === "prev") {
        const prevIdx =
          (currentIndex - 1 + filteredAwards.length) % filteredAwards.length;
        setSelectedAward(filteredAwards[prevIdx]);
      } else {
        const nextIdx = (currentIndex + 1) % filteredAwards.length;
        setSelectedAward(filteredAwards[nextIdx]);
      }
      setZoomLevel(1);
    },
    [selectedAward, filteredAwards],
  );

  // Keyboard navigation for viewer modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAward) return;
      if (e.key === "Escape") {
        setSelectedAward(null);
      } else if (e.key === "ArrowLeft") {
        handleModalNavigate("prev");
      } else if (e.key === "ArrowRight") {
        handleModalNavigate("next");
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(z + 0.25, 2.5));
      } else if (e.key === "-" || e.key === "_") {
        setZoomLevel((z) => Math.max(z - 0.25, 0.75));
      } else if (e.key === "0") {
        setZoomLevel(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAward, handleModalNavigate]);

  return (
    <section
      id="awards"
      className="relative scroll-mt-24 border-t border-border py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-60 size-[500px] rounded-full bg-primary/5 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -left-60 size-[500px] rounded-full bg-primary/5 blur-[120px]"
      />

      <Container>
        {/* Section Header & Credibility Badges */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeading
              eyebrow="Credentials & Verified Proofs"
              title="Certificates & Recognitions"
              description="Official certifications, hackathon recognitions, and academic credentials from IIT Guwahati, NHAI, Oracle, IBM, AWS, Cisco, ISRO registered programs, and Government of India (MeitY)."
            />

            {/* Quick Stat Highlights */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                <ShieldCheck className="size-3.5" />
                <span>{awards.length} Verified Credentials</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                <BookmarkCheck className="size-3.5 text-primary-bright" />
                <span>IIT Guwahati • NHAI • Oracle • IBM • AWS • Cisco</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                <GraduationCap className="size-3.5 text-primary-bright" />
                <span>Govt / ISRO Tutors</span>
              </span>
            </div>
          </div>

          {/* View Mode Toggle & Carousel Arrow Controls */}
          <div className="flex items-center gap-3">
            {/* View Mode Switcher: Carousel vs Grid */}
            <div className="flex items-center rounded-xl border border-border bg-surface p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                aria-label="Scrollable carousel view"
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  viewMode === "carousel"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <SlidersHorizontal className="size-3.5" />
                <span className="hidden sm:inline">Carousel</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid showcase view"
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Carousel Navigation Arrows (shown in carousel mode) */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous certificates"
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary-bright active:scale-95"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next certificates"
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary-bright active:scale-95"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills & Live Search Input */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y border-border/60 py-4">
          {/* Domain Filter Pills */}
          <div
            role="group"
            aria-label="Filter credentials by domain"
            className="flex flex-wrap items-center gap-1.5"
          >
            {domainFilters.map((domain) => {
              const active = domain === activeFilter;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setActiveFilter(domain)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 sm:text-xs",
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_0_12px_var(--glow)] font-semibold"
                      : "border border-border bg-surface/80 text-muted-foreground hover:border-border-strong hover:text-foreground",
                  )}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          {/* Quick Keyword Search */}
          <div className="relative min-w-[220px] max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill, issuer, title..."
              className="w-full rounded-xl border border-border bg-surface/80 pl-9 pr-8 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty Search / Filter State */}
        {filteredAwards.length === 0 ? (
          <div className="surface-panel mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-bright">
              <Search className="size-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              No matching certificates found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground">
              Try adjusting your filter or clearing your search term to view all verified credentials.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-bright"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "carousel" ? (
          /* ========================================================================= */
          /* MODE 1: SCROLLABLE REEL / HORIZONTAL CAROUSEL WITH MOUSE DRAG & TRACK     */
          /* ========================================================================= */
          <div className="relative mt-8">
            {/* Scrollable Track with Mouse Drag Support */}
            <div
              ref={scrollRef}
              onMouseDown={handleCarouselMouseDown}
              onMouseMove={handleCarouselMouseMove}
              onMouseUp={handleCarouselMouseUp}
              onMouseLeave={handleCarouselMouseUp}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] cursor-grab active:cursor-grabbing"
              style={{
                scrollPaddingLeft: "0px",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {filteredAwards.map((item) => (
                <div
                  key={item.id}
                  className="w-[300px] shrink-0 snap-start sm:w-[360px] md:w-[390px]"
                >
                  <CertificateCard
                    item={item}
                    onView={handleView}
                    onVerify={handleVerify}
                    onCopyId={handleCopyId}
                    copiedId={copiedId}
                  />
                </div>
              ))}
            </div>

            {/* Interactive Draggable / Clickable Scrollbar Track & Dots */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between select-none">
              {/* Draggable Progress Bar Track */}
              <div className="flex flex-1 items-center gap-3">
                <div
                  ref={progressBarRef}
                  onMouseDown={handleProgressMouseDown}
                  title="Click or drag to scroll certificates"
                  className="group/track relative h-3 flex-1 cursor-pointer overflow-hidden rounded-full bg-surface-2 hover:bg-surface-2/80 py-1 transition-colors"
                >
                  {/* Subtle track groove */}
                  <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-border" />
                  {/* Interactive Progress Indicator with Glow */}
                  <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--glow)] transition-[width] duration-75 group-hover/track:bg-primary-bright"
                    style={{ width: `${Math.max(scrollProgress, 8)}%` }}
                  />
                </div>

                <span className="font-mono text-[11px] text-muted-foreground shrink-0 min-w-[45px] text-right">
                  {activeIndex + 1} / {filteredAwards.length}
                </span>
              </div>

              {/* Interactive Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5">
                {filteredAwards.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (!scrollRef.current) return;
                      const maxScroll =
                        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                      const target =
                        filteredAwards.length > 1
                          ? (idx / (filteredAwards.length - 1)) * maxScroll
                          : 0;
                      scrollRef.current.scrollTo({
                        left: target,
                        behavior: "smooth",
                      });
                    }}
                    aria-label={`Go to certificate ${idx + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      activeIndex === idx
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE 2: FULL GRID SHOWCASE                                                */
          /* ========================================================================= */
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAwards.map((item, i) => (
              <ScrollReveal key={item.id} delay={0.04 * i} className="h-full">
                <CertificateCard
                  item={item}
                  onView={handleView}
                  onVerify={handleVerify}
                  onCopyId={handleCopyId}
                  copiedId={copiedId}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>

      {/* ========================================================================= */}
      {/* INTERACTIVE CERTIFICATE VIEWER LIGHTBOX / FULLSCREEN MODAL                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedAward ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="viewer-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-2 backdrop-blur-2xl sm:p-4 md:p-6"
            onClick={() => setSelectedAward(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-surface/95 shadow-2xl backdrop-blur-xl lg:flex-row"
            >
              {/* Modal Top Bar (Mobile Close & Header) */}
              <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold uppercase text-emerald-400">
                    Official Certificate
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  aria-label="Close modal"
                  className="flex size-8 items-center justify-center rounded-xl border border-border text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Left/Main: Certificate Image Viewer with Zoom & Controls */}
              <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black/80 p-4 sm:p-6">
                {/* Floating Image Zoom Controls Bar */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/60 p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                    title="Zoom Out (-)"
                    className="flex size-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ZoomOut className="size-3.5" />
                  </button>
                  <span className="px-1.5 font-mono text-[11px] text-white/90">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                    title="Zoom In (+)"
                    className="flex size-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ZoomIn className="size-3.5" />
                  </button>
                  <div className="h-4 w-px bg-white/20" />
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    title="Reset Zoom (0)"
                    className="flex size-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                  <a
                    href={selectedAward.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Full Resolution"
                    className="flex size-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Maximize2 className="size-3.5" />
                  </a>
                </div>

                {/* Certificate High-Res Image with Zoom Transform */}
                <div className="flex size-full items-center justify-center overflow-auto p-2">
                  <img
                    key={selectedAward.id}
                    src={selectedAward.image}
                    alt={selectedAward.title}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transition: "transform 0.15s ease-out",
                    }}
                    className="max-h-full max-w-full rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
                  />
                </div>

                {/* Carousel Flippers inside Viewer */}
                <button
                  type="button"
                  onClick={() => handleModalNavigate("prev")}
                  aria-label="Previous certificate"
                  className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-95"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleModalNavigate("next")}
                  aria-label="Next certificate"
                  className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-95"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              {/* Right: Certificate Information & Verification Metadata Panel */}
              <div className="relative flex w-full flex-col justify-between overflow-y-auto border-t border-border bg-surface p-6 sm:p-8 lg:w-[420px] lg:border-t-0 lg:border-l">
                {/* Desktop Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedAward(null)}
                  aria-label="Close modal"
                  className="absolute top-5 right-5 hidden size-8 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground lg:flex"
                >
                  <X className="size-4" />
                </button>

                <div>
                  {/* Verified Header Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                    <ShieldCheck className="size-4" />
                    <span className="font-mono text-[11px] font-semibold tracking-wider uppercase">
                      Verified Credential
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3
                    id="viewer-modal-title"
                    className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl"
                  >
                    {selectedAward.title}
                  </h3>

                  <p className="mt-1 font-mono text-sm font-medium text-primary-bright">
                    {selectedAward.organization}
                  </p>

                  {/* Metadata Spec Table */}
                  <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface-2/60 p-4 text-xs">
                    <div className="flex items-center justify-between py-2">
                      <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                        Credential ID
                      </dt>
                      <dd className="flex items-center gap-2 font-mono font-semibold text-foreground">
                        <span className="max-w-[170px] truncate">
                          {selectedAward.credentialId ?? "INSTITUTIONAL"}
                        </span>
                        {selectedAward.credentialId && (
                          <button
                            type="button"
                            onClick={() =>
                              selectedAward.credentialId &&
                              handleCopyId(selectedAward.credentialId)
                            }
                            title="Copy ID"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {copiedId === selectedAward.credentialId ? (
                              <Check className="size-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        )}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                        Domain
                      </dt>
                      <dd className="font-medium text-foreground">
                        {selectedAward.domain}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                        Issue Date
                      </dt>
                      <dd className="font-medium text-foreground">
                        {selectedAward.issueDate}
                      </dd>
                    </div>

                    {selectedAward.signatory && (
                      <div className="flex items-center justify-between py-2">
                        <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                          Signatory
                        </dt>
                        <dd className="max-w-[200px] truncate text-right font-medium text-foreground">
                          {selectedAward.signatory}
                        </dd>
                      </div>
                    )}

                    <div className="flex items-center justify-between py-2">
                      <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                        Holder
                      </dt>
                      <dd className="font-medium text-foreground">Shahad Pathan</dd>
                    </div>
                  </dl>

                  {/* Description */}
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {selectedAward.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="mt-4">
                    <p className="font-mono text-[11px] uppercase text-muted-foreground">
                      Skills &amp; Competencies
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedAward.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-border">
                  {selectedAward.verificationUrl && (
                    <a
                      href={selectedAward.verificationUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-bright hover:shadow-glow"
                    >
                      <FileCheck2 className="size-4" />
                      <span>Verify Official Record</span>
                      <ExternalLink className="size-4" />
                    </a>
                  )}

                  <div className="flex items-center gap-2">
                    <a
                      href={selectedAward.image}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary-bright"
                    >
                      <Download className="size-3.5" />
                      <span>Download Certificate</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedAward(null)}
                      className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* QUICK VERIFICATION PROOF DIALOG                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {verificationAward ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-dialog-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setVerificationAward(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="surface-panel glow-orange relative w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setVerificationAward(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <X className="size-4" />
              </button>

              {/* Verified Header Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-emerald-400">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                  Verified Credential Record
                </span>
              </div>

              <h3
                id="verify-dialog-title"
                className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl"
              >
                {verificationAward.title}
              </h3>

              <p className="mt-1 font-mono text-sm text-primary-bright">
                {verificationAward.organization}
              </p>

              {/* Metadata Spec Sheet */}
              <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface/50 p-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2">
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                    Credential ID
                  </dt>
                  <dd className="flex items-center gap-2 font-mono font-semibold text-foreground">
                    <span>{verificationAward.credentialId ?? "VERIFIED"}</span>
                    {verificationAward.credentialId && (
                      <button
                        type="button"
                        onClick={() =>
                          verificationAward.credentialId &&
                          handleCopyId(verificationAward.credentialId)
                        }
                        title="Copy ID"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {copiedId === verificationAward.credentialId ? (
                          <Check className="size-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>
                    )}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                    Category
                  </dt>
                  <dd className="text-foreground">{verificationAward.category}</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                    Issue Date
                  </dt>
                  <dd className="text-foreground">{verificationAward.issueDate}</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">
                    Holder
                  </dt>
                  <dd className="font-medium text-foreground">Shahad Pathan</dd>
                </div>
              </dl>

              {/* Description */}
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {verificationAward.description}
              </p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                {verificationAward.verificationUrl && (
                  <a
                    href={verificationAward.verificationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
                  >
                    Open Official Verification Proof
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const awardToView = verificationAward;
                    setVerificationAward(null);
                    setSelectedAward(awardToView);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary-bright"
                >
                  <Eye className="size-4" />
                  <span>View Image</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
