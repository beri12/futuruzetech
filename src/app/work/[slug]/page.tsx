import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Chip, Label } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ProjectPreview } from "@/components/portfolio/project-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getProject, projectKindLabels, projectSlugs } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.name} | ${project.category}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    // Unverified projects stay out of search results until their details are confirmed.
    index: !project.needsVerification,
  });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        eyebrow={projectKindLabels[project.kind]}
        title={project.name}
        description={project.summary}
        breadcrumbs={[{ label: "Our Work", href: "/work" }, { label: project.name }]}
      >
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Label>{project.category}</Label>
          {project.technologies.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </PageHeader>

      <section aria-label="Project preview" className="bg-ink">
        <Container className="pt-[clamp(40px,5vw,72px)]">
          <Reveal className="relative flex min-h-[320px] items-end justify-center overflow-hidden rounded-2xl border border-line bg-forest px-[clamp(16px,4vw,40px)] pt-[clamp(24px,4vw,40px)]">
            <ProjectPreview project={project} />
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="project-about-title" className="bg-ink">
        <Container className="section-y flex flex-wrap gap-14">
          <Reveal className="flex max-w-[680px] flex-[2] basis-[400px] flex-col gap-5">
            <h2 id="project-about-title" className="text-[clamp(28px,3vw,40px)] font-bold leading-[1.1]">
              About the project
            </h2>
            {project.needsVerification ? (
              <p className="rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-fg-muted">
                Details for this project are still being confirmed with the client. The description
                below is a placeholder and this page is excluded from search engines until it is
                updated.
              </p>
            ) : null}
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-[17px] leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="flex flex-1 basis-[260px] flex-col gap-6">
            <dl className="flex flex-col gap-4 rounded-xl border border-line bg-surface-2 p-6 text-sm">
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-[0.18em] text-fg-dim">Type</dt>
                <dd className="text-fg">{projectKindLabels[project.kind]}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-[0.18em] text-fg-dim">Category</dt>
                <dd className="text-fg">{project.category}</dd>
              </div>
              {project.technologies.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.18em] text-fg-dim">Technology</dt>
                  <dd className="text-fg">{project.technologies.join(", ")}</dd>
                </div>
              ) : null}
              {project.url ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.18em] text-fg-dim">Website</dt>
                  <dd>
                    <a href={project.url} target="_blank" rel="noreferrer noopener" className="text-brand hover:text-brand-bright">
                      {project.url.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <Button href={`/contact?service=${project.kind === "internal" ? "software-development" : "not-sure"}`} icon="arrow">
              Discuss a similar project
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Planning something in the same space?"
        description="We will walk you through how this was built and what a version for your business could look like."
        secondary={{ label: "All work", href: "/work" }}
      />
    </>
  );
}
