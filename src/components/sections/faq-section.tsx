import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { Faq } from "@/types";

type FaqSectionProps = {
  items: Faq[];
  eyebrow?: string;
  title?: string;
  /** Emit FAQPage structured data (only once per page). */
  structuredData?: boolean;
};

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Questions we hear often.",
  structuredData = true,
}: FaqSectionProps) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-y border-line-soft bg-forest">
      {structuredData ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      ) : null}
      <Container className="section-y flex flex-wrap gap-14">
        <Reveal className="flex max-w-[420px] flex-1 basis-[320px] flex-col gap-4">
          <SectionHeading eyebrow={eyebrow} id="faq-title" title={title} />
          <p className="text-base leading-relaxed text-fg-muted">
            Something else on your mind?{" "}
            <Link href="/contact" className="font-semibold text-brand hover:text-brand-bright">
              Ask us directly.
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex-[2] basis-[560px]">
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
