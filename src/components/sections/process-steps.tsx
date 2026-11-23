import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { processSteps } from "@/data/process";

export function ProcessSteps() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative scroll-mt-24 border-t border-line-soft bg-ink">
      <Container className="section-y flex flex-col gap-[clamp(48px,6vw,88px)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading index="05" eyebrow="Process" id="process-title" title="A clear path from idea to launch." accent={["launch."]} />
          <Button href="/process" variant="ghost" size="sm" icon="arrow">
            How we work
          </Button>
        </div>
        <ProcessTimeline steps={processSteps} />
      </Container>
    </section>
  );
}
