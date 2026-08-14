import { socialLinks, resolveHref } from "@/data/social";
import { cn } from "@/lib/utils";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const href = resolveHref(link);
        const Icon = link.icon;
        return (
          <li key={link.id}>
            {href ? (
              <a
                href={href}
                target={link.id === "email" ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={link.label}
                className="flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-[18px]" aria-hidden="true" />
              </a>
            ) : (
              <span
                title={`${link.label} link not added yet`}
                aria-label={`${link.label} link not added yet`}
                className="flex size-10 cursor-not-allowed items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground/50"
              >
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
