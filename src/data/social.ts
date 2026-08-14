import { Github, Linkedin, Mail, Phone, Globe, type LucideIcon } from "lucide-react";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SHAHADPATHAN",
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shahad-pathan/",
    icon: Linkedin,
  },
  {
    id: "portfolio",
    label: "Website",
    href: "https://shahadpathan.vercel.app",
    icon: Globe,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:sahadpathan2697@gmail.com",
    icon: Mail,
  },
  {
    id: "phone",
    label: "Phone",
    href: "tel:+919913031752",
    icon: Phone,
  },
];

export const isPlaceholder = (value: string) => value.trim().startsWith("[ADD");

export const resolveHref = (link: SocialLink) => {
  if (isPlaceholder(link.href)) return undefined;
  return link.href;
};
