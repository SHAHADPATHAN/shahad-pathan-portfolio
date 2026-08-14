import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems, isRouteHref } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const routerState = useRouterState();
  const isHomepage = routerState.location.pathname === "/";

  // Precision scroll spy
  useEffect(() => {
    if (!isHomepage) {
      setActive("");
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 12);

      // If user just clicked a nav item, ignore scroll events until scroll settles
      if (isClickingRef.current) return;

      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // 1. Bottom of page -> activate Contact
      if (windowHeight + scrollY >= docHeight - 120) {
        setActive("contact");
        return;
      }

      // 2. Top of page -> clear or top
      if (scrollY < 120) {
        setActive("");
        return;
      }

      // 3. Find section that occupies the focus viewport zone
      const sectionIds = ["about", "skills", "projects", "experience", "awards", "contact"];
      let bestSection = "";
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= 100) {
            const distance = Math.abs(rect.top - 80);
            if (distance < minDistance) {
              minDistance = distance;
              bestSection = id;
            }
          }
        }
      }

      if (bestSection) {
        setActive(bestSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    if (sectionId && isHomepage) {
      e.preventDefault();
      setActive(sectionId);

      // Lock scroll spy temporarily for smooth animation
      isClickingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickingRef.current = false;
      }, 750);

      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -70; // Account for fixed navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-200",
        scrolled ? "shadow-md shadow-black/20" : "",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a
          href="/#top"
          onClick={(e) => {
            if (isHomepage) {
              e.preventDefault();
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="transition-opacity hover:opacity-95"
        >
          <BrandLogo size="md" showStatus={true} showSubtitle={false} />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.sectionId ? active === item.sectionId : false;
              const isRoute = isRouteHref(item.href);

              return (
                <li key={item.href}>
                  {isRoute ? (
                    <Link
                      to={item.href as "/"}
                      className={cn(
                        "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary shadow-[0_0_8px_var(--glow)] transition-all duration-200" />
                      ) : null}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-150",
                        isActive
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary shadow-[0_0_8px_var(--glow)] transition-all duration-200" />
                      ) : null}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          <a
            href={profile.resumeAvailable ? profile.resumePath : "#resume"}
            target={profile.resumeAvailable ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact", "contact")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-bright hover:shadow-glow"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Actions: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {navItems.map((item) => {
                const isActive = item.sectionId ? active === item.sectionId : false;
                const isRoute = isRouteHref(item.href);

                return isRoute ? (
                  <Link
                    key={item.href}
                    to={item.href as "/"}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors hover:bg-surface",
                      isActive
                        ? "font-semibold text-primary-bright bg-surface/60"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--glow)]" />
                    ) : null}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors hover:bg-surface",
                      isActive
                        ? "font-semibold text-primary-bright bg-surface/60"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="size-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--glow)]" />
                    ) : null}
                  </a>
                );
              })}

              <div className="mt-4 grid gap-3 border-t border-border pt-4">
                <a
                  href={profile.resumeAvailable ? profile.resumePath : "#resume"}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm text-foreground"
                >
                  <FileText className="size-4" aria-hidden="true" />
                  Resume
                </a>
                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
