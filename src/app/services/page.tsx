import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ProcessSteps } from "@/components/sections/process-steps";
import { EngagementModels } from "@/components/sections/engagement-models";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Website development, custom software, mobile apps, AI and machine learning, digital marketing and UI/UX design for businesses in Ethiopia, Africa and worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to build, launch, and grow."
        description="Six connected services, one team. Most projects combine two or more of them, from the first design to the marketing that brings people to it."
        breadcrumbs={[{ label: "Services" }]}
        size="large"
      />
      <ServicesGrid showAllLink={false} />
      <ProcessSteps />
      <EngagementModels />
      <CtaBanner
        title="Not sure which service you need?"
        description="Describe the outcome you want and we will suggest the simplest path to it."
        secondary={{ label: "See our process", href: "/process" }}
      />
    </>
  );
}
