export type NavItem = {
  label: string;
  /** In-page anchor (root-relative so it also works from other routes) or a real route. */
  href: string;
  /** Section id used for active-state tracking on the homepage. */
  sectionId?: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Achievements", href: "/#achievements", sectionId: "achievements" },
  { label: "Certificates", href: "/#certificates", sectionId: "certificates" },
  { label: "Blog", href: "/#blog", sectionId: "blog" },
];

export const isRouteHref = (href: string) => !href.includes("#");
