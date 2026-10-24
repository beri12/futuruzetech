import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { processSteps } from "@/data/process";

export function ProcessSteps() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y border-line-soft bg-forest">
      <Container className="section-y flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow="Our process" id="process-title" title="A clear path from idea to launch." />
        </Reveal>
        <ProcessTimeline steps={processSteps} />
      </Container>
    </section>
  );
}
