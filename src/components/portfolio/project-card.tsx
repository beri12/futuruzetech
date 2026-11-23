import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { projectKindLabels } from "@/data/projects";
import { Label } from "@/components/ui/chip";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index?: number;
  /** Featured cards span the full row with a wider image. */
  featured?: boolean;
};

/**
 * Editorial project card used on the Projects page: large image revealed
 * through a clip-path mask, then category, title and summary. Hovering zooms
 * the image slowly and turns the arrow green; the custom cursor shows "View".
 */
export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const href = `/work/${project.slug}`;
  return (
    <article className="group relative flex flex-col gap-6" data-cursor-label="View">
      <ClipReveal
        className={cn(
          "relative overflow-hidden rounded-2xl border border-line bg-surface",
          featured ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[16/11]",
        )}
      >
        <ProjectMedia
          project={project}
          sizes={featured ? "(max-width: 1024px) 100vw, 1280px" : "(max-width: 768px) 100vw, 640px"}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
      </ClipReveal>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex max-w-[640px] flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {index !== undefined ? <span className="font-display text-sm text-fg-dim">{String(index + 1).padStart(2, "0")}</span> : null}
            <Label>{project.category}</Label>
            <span className="text-xs uppercase tracking-[0.18em] text-fg-dim">{projectKindLabels[project.kind]}</span>
          </div>
          <h3 className={cn("font-display font-medium leading-none tracking-[-0.04em] text-fg", featured ? "text-display-md" : "text-[clamp(30px,3vw,44px)]")}>
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          <p className="text-[16px] leading-relaxed text-fg-muted">{project.summary}</p>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink motion-reduce:transition-none"
        >
          <ArrowUpRight size={22} strokeWidth={1.6} />
        </span>
      </div>
    </article>
  );
}
