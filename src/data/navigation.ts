export type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Certificates", href: "/#awards", sectionId: "awards" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export const isRouteHref = (href: string) => !href.includes("#");
