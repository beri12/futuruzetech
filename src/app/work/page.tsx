import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Work",
  description:
    "Selected digital products, platforms and websites built by Futurize Technology, with clear labels for client work, internal products and concept work.",
  path: "/work",
});

/*
 * Category filters are intentionally not rendered yet: with the current
 * number of projects they would not change what is shown. Add them once the
 * portfolio has enough projects across several categories.
 */
export default function WorkPage() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Digital products built to make a difference."
        description="A selection of what we have built. Each project is labelled honestly as client work, an internal product, or concept work."
        breadcrumbs={[{ label: "Our Work" }]}
        size="large"
      />
      <section aria-labelledby="projects-title" className="bg-ink">
        <Container className="section-y">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          <Stagger as="ul" className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-5">
            {featured.map((project) => (
              <StaggerItem as="li" key={project.slug} className="col-span-full">
                <ProjectCard project={project} featured />
              </StaggerItem>
            ))}
            {rest.map((project) => (
              <StaggerItem as="li" key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <CtaBanner
        title="Have something similar in mind?"
        description="Tell us about your project and we will show you how we would approach it."
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
