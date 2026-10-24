import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { CtaBanner } from "@/components/sections/cta-banner";
import { processDetails, processSteps } from "@/data/process";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Process",
  description:
    "How Futurize Technology runs a project: discovery, strategy, design, build and validation, launch and ongoing improvement.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A clear path from idea to launch, and beyond."
        description="Five stages, each with a defined output you can review. The process stays the same whether we are building a website, a platform, or an AI feature; the depth of each stage scales with the project."
        breadcrumbs={[{ label: "Process" }]}
        size="large"
      />

      <section aria-labelledby="overview-title" className="bg-ink">
        <Container className="section-y flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="At a glance" id="overview-title" title="The five stages." />
          </Reveal>
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      <section aria-labelledby="detail-title" className="border-y border-line-soft bg-forest">
        <Container className="section-y flex flex-col gap-12">
          <Reveal>
            <SectionHeading eyebrow="In detail" id="detail-title" title="What happens in each stage." />
          </Reveal>
          <Stagger as="ol" className="flex flex-col gap-4">
            {processDetails.map((step) => (
              <StaggerItem
                as="li"
                key={step.number}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6 rounded-2xl border border-line bg-surface-2 p-[clamp(24px,3vw,36px)]"
              >
                <div className="flex flex-col gap-3">
                  <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand">
                    {step.number}
                  </span>
                  <h3 className="text-[26px] font-semibold">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-fg-muted">{step.description}</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-[15px] text-fg-soft">
                      <Check aria-hidden="true" size={16} strokeWidth={2.4} className="mt-1 shrink-0 text-brand" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner
        title="Ready to start with discovery?"
        description="Send a short brief and we will schedule the first conversation."
        secondary={{ label: "View engagement models", href: "/pricing" }}
      />
    </>
  );
}
