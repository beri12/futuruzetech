import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * A project's image, framed consistently. Website screenshots fill the frame
 * (anchored to the top so the hero of the site is visible); logos are
 * contained on their own background so they are never cropped. Projects
 * without an authorized image get a clearly labelled placeholder, never a
 * borrowed one.
 */
export function ProjectMedia({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!project.image) {
    return (
      <div aria-hidden="true" className={cn("flex h-full w-full items-center justify-center bg-surface text-xs text-fg-dim", className)}>
        Project image coming soon
      </div>
    );
  }
  const contain = project.imageFit === "contain";
  return (
    <div className={cn("relative h-full w-full", className)} style={contain ? { background: project.imageBackground ?? "#fff" } : undefined}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] motion-reduce:transition-none",
          contain ? "object-contain p-[12%]" : "object-cover object-top",
        )}
      />
    </div>
  );
}
