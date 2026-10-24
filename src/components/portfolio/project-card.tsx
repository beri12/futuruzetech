import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { projectKindLabels } from "@/data/projects";
import { Chip, Label } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** Featured cards span the full row and show a larger preview. */
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const href = `/work/${project.slug}`;
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-line bg-surface-2 transition-[border-color,transform] duration-base hover:-translate-y-0.5 hover:border-brand motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        featured ? "col-span-full flex-wrap" : "flex-col gap-4 p-7",
      )}
    >
      {featured ? (
        <>
          <div className="flex min-w-0 flex-1 basis-[320px] flex-col justify-center gap-[18px] p-9">
            <KindAndCategory project={project} />
            <h3 className="text-[clamp(26px,2.6vw,36px)] font-bold">
              <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                {project.name}
              </Link>
            </h3>
            <p className="text-base leading-relaxed text-fg-muted">{project.summary}</p>
            <TechList items={project.technologies} />
            <ViewLink label="View case study" />
          </div>
          <div className="relative flex min-h-[320px] min-w-0 flex-1 basis-[400px] items-end justify-center overflow-hidden border-l border-line-soft bg-forest px-10 pt-10">
            <ProjectPreview project={project} />
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[140px] overflow-hidden rounded-[12px] border border-line-soft bg-surface">
            <ProjectPreview project={project} compact />
          </div>
          <KindAndCategory project={project} />
          <h3 className="text-[22px] font-semibold">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.name}
            </Link>
          </h3>
          <p className="text-[15px] leading-relaxed text-fg-muted">{project.summary}</p>
          <TechList items={project.technologies} />
          <ViewLink label="View project" className="mt-auto" />
        </>
      )}
    </article>
  );
}

function KindAndCategory({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip tone="brand">{projectKindLabels[project.kind]}</Chip>
      <Label>{project.category}</Label>
    </div>
  );
}

function TechList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

function ViewLink({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand", className)}>
      {label}
      <ArrowRight
        aria-hidden="true"
        size={16}
        strokeWidth={2.2}
        className="transition-transform duration-base group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </span>
  );
}

/**
 * Renders the real screenshot when one exists; otherwise a clearly labelled
 * placeholder frame, never a fake or borrowed image.
 */
export function ProjectPreview({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={compact ? "(max-width: 768px) 100vw, 400px" : "(max-width: 768px) 100vw, 560px"}
        className={cn("object-cover", compact ? "" : "object-top")}
      />
    );
  }
  if (compact) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full items-center justify-center text-xs text-fg-dim"
      >
        Add project image
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-[280px] w-full max-w-[520px] flex-col overflow-hidden rounded-t-[14px] border border-b-0 border-line bg-surface"
    >
      <div className="flex h-10 items-center gap-2 border-b border-line-soft px-3.5">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 text-[11px] text-fg-dim">Screenshot placeholder</span>
      </div>
      <div className="grid flex-1 grid-cols-[160px_1fr] gap-3.5 p-3.5">
        <div className="rounded-[10px] border border-line-soft bg-surface-2" />
        <div className="grid auto-rows-[70px] grid-cols-3 gap-2.5">
          <div className="rounded-[10px] border border-line-soft bg-surface-2" />
          <div className="rounded-[10px] bg-brand/90" />
          <div className="rounded-[10px] border border-line-soft bg-surface-2" />
          <div className="col-span-2 rounded-[10px] border border-line-soft bg-surface-2" />
          <div className="rounded-[10px] border border-line-soft bg-surface-2" />
        </div>
      </div>
    </div>
  );
}
