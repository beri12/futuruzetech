import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured).slice(0, 3);

  return (
    <section id="work" aria-labelledby="work-title" className="bg-ink">
      <Container className="section-y flex flex-col gap-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            id="work-title"
            title="Digital products built to make a difference."
          />
          <Button href="/work" variant="ghost" size="sm" icon="arrow">
            View all work
          </Button>
        </Reveal>
        <Stagger
          as="ul"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-5"
        >
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
  );
}
