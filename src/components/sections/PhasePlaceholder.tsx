import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/sections/SectionHeading";

/**
 * Honest empty state for sections scheduled in later build phases.
 * Keeps navigation anchors valid without inventing content.
 */
export function PhasePlaceholder({
  id,
  eyebrow,
  title,
  description,
  note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  note: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface/40 p-8 text-sm text-muted-foreground">
          {note}
        </div>
      </Container>
    </section>
  );
}
