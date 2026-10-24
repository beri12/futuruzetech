import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { faqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Futurize Technology. Tell us about your website, software, mobile app, AI or digital marketing needs and we will reply within two working days.",
  path: "/contact",
});

const contactFaqs = faqs.filter((faq) =>
  ["How does a project begin?", "Do you work with international clients?", "How much does a website or application cost?"].includes(
    faq.question,
  ),
);

export default function ContactPage() {
  return (
    <>
      <ContactSection
        headingLevel="h1"
        eyebrow="Contact"
        title="Let's build something meaningful."
        description="Tell us what you're planning. We'll help you identify the right next step."
      />
      <FaqSection items={contactFaqs} eyebrow="Before you write" title="A few things people ask first." />
    </>
  );
}
