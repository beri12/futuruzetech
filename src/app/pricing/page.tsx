import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { EngagementModels } from "@/components/sections/engagement-models";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { faqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing and Engagement Models",
  description:
    "How Futurize Technology scopes and prices projects: starter projects, business solutions, growth and innovation, with fixed-scope, retainer, maintenance and consulting formats.",
  path: "/pricing",
});

const pricingFaqs = faqs.filter((faq) =>
  ["How much does a website or application cost?", "How long does a project take?", "Do you provide ongoing support?", "How does a project begin?"].includes(
    faq.question,
  ),
);

const scopeFactors = [
  { title: "Features and integrations", description: "The number of screens, workflows, and third-party systems involved." },
  { title: "Design depth", description: "From applying an existing brand to full research, prototyping, and a design system." },
  { title: "Content and data", description: "Whether content exists, needs writing, or data has to be migrated and cleaned." },
  { title: "Timeline", description: "Compressed timelines need more people in parallel; flexible ones cost less." },
  { title: "Ongoing needs", description: "Maintenance, hosting management, and continuous improvement after launch." },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Transparent scoping. A quote you can plan around."
        description="We do not publish fixed price lists because no two projects are the same. We do explain exactly what drives cost, and every proposal shows the scope the price covers."
        breadcrumbs={[{ label: "Pricing" }]}
        size="large"
      />

      <EngagementModels detailed />

      <section aria-labelledby="scope-title" className="border-y border-line-soft bg-forest">
        <Container className="section-y flex flex-wrap gap-14">
          <Reveal className="flex max-w-[420px] flex-1 basis-[320px] flex-col gap-4">
            <SectionHeading
              eyebrow="What drives cost"
              id="scope-title"
              title="Five things that shape every quote."
              description="Knowing these before the first call helps us give you a more accurate estimate sooner."
            />
          </Reveal>
          <Reveal delay={0.1} className="flex-[2] basis-[520px]">
            <ol className="flex flex-col divide-y divide-line border-y border-line">
              {scopeFactors.map((factor, index) => (
                <li key={factor.title} className="flex gap-5 py-5">
                  <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-brand">
                    0{index + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[17px] font-semibold">{factor.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{factor.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <FaqSection items={pricingFaqs} eyebrow="Pricing FAQ" title="Common questions about cost and timing." />

      <ContactSection
        eyebrow="Request a quote"
        title="Tell us what you need. We will tell you what it takes."
        description="Share the scope you have in mind and we will reply with next steps and a proposal."
      />
    </>
  );
}
