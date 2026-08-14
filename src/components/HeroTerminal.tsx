import { motion, useReducedMotion } from "motion/react";

const lines = [
  { prompt: "$", text: "whoami", accent: false },
  { prompt: ">", text: "shahad pathan — computer engineer", accent: true },
  { prompt: "$", text: "cat focus.json", accent: false },
  { prompt: ">", text: '{ "ai": true, "data": true, "software": true }', accent: true },
  { prompt: "$", text: "npm run build --future", accent: false },
  { prompt: ">", text: "compiled successfully in 0.42s", accent: true },
];

/** Restrained developer-terminal visual. CSS/SVG only — no WebGL, no heavy runtime cost. */
export function HeroTerminal() {
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl"
      />
      <figure className="surface-panel glow-orange overflow-hidden rounded-xl">
        <figcaption className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-primary/80" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-foreground">
            shahad@portfolio — zsh
          </span>
        </figcaption>

        <div className="space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6 sm:text-[13.5px]">
          {lines.map((line, i) => (
            <motion.p
              key={line.text}
              className="flex gap-2.5"
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : 0.5 + i * 0.16 }}
            >
              <span className={line.accent ? "text-primary" : "text-muted-foreground"}>
                {line.prompt}
              </span>
              <span className={line.accent ? "text-foreground" : "text-muted-foreground"}>
                {line.text}
              </span>
            </motion.p>
          ))}
          <p className="flex gap-2.5" aria-hidden="true">
            <span className="text-muted-foreground">$</span>
            <span className="inline-block h-[1.15em] w-[7px] animate-pulse bg-primary" />
          </p>
        </div>
      </figure>

      <div
        aria-hidden="true"
        className="mt-4 grid grid-cols-3 gap-3 font-mono text-[11px] text-muted-foreground"
      >
        {["AI / ML", "DATA", "SOFTWARE"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-surface/60 px-3 py-2.5 text-center tracking-[0.14em]"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
