import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";
import { navItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-16">
        <div>
          <p className="font-display text-xl font-bold tracking-[0.14em] uppercase">
            {profile.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.footerLine}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer" className="md:justify-self-end">
          <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Navigate
          </p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <p>Built with React, TypeScript &amp; Tailwind CSS</p>
      </Container>
    </footer>
  );
}
