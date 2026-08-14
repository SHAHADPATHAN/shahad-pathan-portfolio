export type NavItem = {
  label: string;
  /** In-page anchor for Phase 1; later phases promote these to dedicated routes. */
  href: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Blog", href: "#blog" },
];
