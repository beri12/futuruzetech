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
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 border-t border-line-soft bg-forest">
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
      <Container className="section-y grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <SectionHeading eyebrow={eyebrow} id="faq-title" title={title} />
          <Reveal>
            <p className="text-base leading-relaxed text-fg-muted">
              Something else on your mind?{" "}
              <Link href="/contact" className="link-underline font-medium text-brand">
                Ask us directly.
              </Link>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
