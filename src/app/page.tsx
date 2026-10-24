import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CapabilitiesStrip } from "@/components/sections/capabilities-strip";
import { Intro } from "@/components/sections/intro";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedWork } from "@/components/sections/featured-work";
import { WhyChoose } from "@/components/sections/why-choose";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TechStack } from "@/components/sections/tech-stack";
import { SocialProof } from "@/components/sections/social-proof";
import { EngagementModels } from "@/components/sections/engagement-models";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} | Software, Web, Mobile, AI and Digital Marketing`,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Software, Web, Mobile, AI and Digital Marketing` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesStrip />
      <Intro />
      <ServicesGrid />
      <FeaturedWork />
      <WhyChoose />
      <ProcessSteps />
      <TechStack />
      <SocialProof />
      <EngagementModels />
      <FaqSection items={faqs} />
      <ContactSection />
    </>
  );
}
