import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected digital products built by Futurize Technology: Kidora, Abuja Construction, Chaka Gebeya and Gobezsew, across education, construction, e-commerce and e-learning.",
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
        eyebrow="Projects"
        title={
          <>
            Digital products built to make a <span className="accent-serif text-brand">difference.</span>
          </>
        }
        description="A selection of what we have built across education, construction, commerce and learning. Each project is labelled honestly as client work or an internal product."
        breadcrumbs={[{ label: "Projects" }]}
        size="large"
      />
      <section aria-labelledby="projects-title" className="bg-ink">
        <Container className="section-y">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          <ul className="grid gap-x-8 gap-y-[clamp(64px,8vw,120px)] md:grid-cols-2">
            {featured.map((project) => (
              <li key={project.slug} className="md:col-span-2">
                <ProjectCard project={project} index={0} featured />
              </li>
            ))}
            {rest.map((project, i) => (
              <li key={project.slug} className={i % 2 === 1 ? "md:mt-[clamp(80px,10vw,160px)]" : undefined}>
                <ProjectCard project={project} index={featured.length + i} />
              </li>
            ))}
          </ul>
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
