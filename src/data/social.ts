import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export type SocialLink = {
  id: string;
  label: string;
  /** Placeholder values starting with "[ADD" are treated as not-yet-supplied. */
  href: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", href: "[ADD GITHUB URL]", icon: Github },
  { id: "linkedin", label: "LinkedIn", href: "[ADD LINKEDIN URL]", icon: Linkedin },
  { id: "email", label: "Email", href: "[ADD EMAIL]", icon: Mail },
];

export const isPlaceholder = (value: string) => value.trim().startsWith("[ADD");

export const resolveHref = (link: SocialLink) => {
  if (isPlaceholder(link.href)) return undefined;
  if (link.id === "email") return `mailto:${link.href}`;
  return link.href;
};
