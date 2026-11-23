import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-24 border-t border-line-soft bg-ink py-[clamp(88px,10vw,140px)] lg:py-0">
      <ProjectsShowcase
        projects={ordered}
        intro={
          <div className="flex flex-col gap-8">
            <SectionHeading index="03" eyebrow="Projects" id="work-title" title="Selected work, built to make a difference." accent={["difference."]} />
            <p className="max-w-[420px] text-[16px] leading-relaxed text-fg-muted">
              Education, construction, commerce and learning: products we have designed and engineered
              for real users.
            </p>
            <div>
              <Button href="/work" variant="ghost" icon="arrow">
                All projects
              </Button>
            </div>
          </div>
        }
      />
    </section>
  );
}
