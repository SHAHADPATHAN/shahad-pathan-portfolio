import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";
import { navItems, isRouteHref } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Renders a router Link for real routes and a plain anchor for in-page hashes. */
function NavAnchor({
  href,
  children,
  ...rest
}: { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (isRouteHref(href)) {
    const { target: _target, ...linkProps } = rest;
    return (
      <Link to={href as "/"} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.flatMap((i) => (i.sectionId ? [i.sectionId] : []));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-[0.18em] uppercase text-foreground"
        >
          Shahad<span className="text-primary">.</span>Pathan
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.sectionId ? active === item.sectionId : false;
              return (
                <li key={item.href}>
                  <NavAnchor
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        {...(reduced ? {} : { layoutId: "nav-active" })}
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      />
                    ) : null}
                  </NavAnchor>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={profile.resumeAvailable ? profile.resumePath : "#resume"}
            target={profile.resumeAvailable ? "_blank" : undefined}
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-bright"
          >
            Let&apos;s Talk
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-5">
              {navItems.map((item) => (
                <NavAnchor
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </NavAnchor>
              ))}
              <div className="mt-4 grid gap-3">
                <a
                  href={profile.resumeAvailable ? profile.resumePath : "#resume"}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm text-foreground"
                >
                  <FileText className="size-4" aria-hidden="true" />
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
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
