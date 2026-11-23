"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { projectKindLabels } from "@/data/projects";
import { ProjectMedia } from "@/components/portfolio/project-media";
import { gsap, media, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/**
 * Homepage project showcase.
 *
 * Desktop with motion allowed: the section pins and the row of large project
 * panels scrolls horizontally as the page scrolls vertically (ScrollTrigger
 * pin + scrub). Each image drifts against the movement for depth, and a
 * progress rule tracks position.
 *
 * Phones, tablets and reduced motion: a normal vertical stack, each panel
 * revealed through a clip-path mask as it enters. The markup is identical in
 * both modes; only CSS and the GSAP matchMedia branch change.
 */
export function ProjectsShowcase({ projects, intro }: { projects: Project[]; intro: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-track]");
      const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-panel]"));
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add(`${media.motion} and ${media.desktop}`, () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to(root.querySelector("[data-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        panels.forEach((panel) => {
          const image = panel.querySelector("[data-panel-image]");
          if (image) {
            gsap.fromTo(
              image,
              { xPercent: -3 },
              {
                xPercent: 3,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
              },
            );
          }
          gsap.from(panel.querySelectorAll("[data-panel-text]"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 75%", once: true },
          });
        });
      });

      mm.add(`${media.motion} and ${media.mobile}`, () => {
        panels.forEach((panel) => {
          const frame = panel.querySelector("[data-panel-frame]");
          if (!frame) return;
          gsap.fromTo(
            frame,
            { clipPath: "inset(12% 12% 12% 12% round 16px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: { trigger: frame, start: "top 85%", once: true },
            },
          );
        });
      });

      // Images finishing loading can change layout; recalculate pin lengths.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative overflow-hidden lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:motion-reduce:h-auto">
      <div
        data-track=""
        className="flex flex-col gap-16 px-[var(--gutter)] lg:w-max lg:flex-row lg:items-stretch lg:gap-[4vw] lg:pl-[max(var(--gutter),calc((100vw-var(--container-max))/2+var(--gutter)))] lg:pr-[8vw] lg:motion-reduce:w-auto lg:motion-reduce:flex-col"
      >
        <div className="flex shrink-0 flex-col justify-center lg:w-[34vw] lg:max-w-[520px]">{intro}</div>
        {projects.map((project, index) => (
          <article
            key={project.slug}
            data-panel=""
            data-cursor-label="View"
            className="group relative flex shrink-0 flex-col gap-6 lg:w-[min(64vw,1040px)] lg:motion-reduce:w-auto"
          >
            <div
              data-panel-frame=""
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface lg:aspect-auto lg:h-[min(58svh,600px)]"
            >
              <div data-panel-image="" className="absolute inset-y-0 -left-[4%] -right-[4%]">
                <ProjectMedia project={project} sizes="(max-width: 1024px) 100vw, 1100px" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/60 px-3 py-1.5 font-display text-xs text-fg backdrop-blur">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div data-panel-text="" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs uppercase tracking-[0.2em]">
                  <span className="text-brand">{project.category}</span>
                  <span className="text-fg-dim">{projectKindLabels[project.kind]}</span>
                </div>
                <h3 data-panel-text="" className="font-display text-[clamp(34px,4.4vw,68px)] font-medium leading-[0.95] tracking-[-0.045em] text-fg">
                  <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {project.name}
                  </Link>
                </h3>
                <p data-panel-text="" className="max-w-[560px] text-[15px] leading-relaxed text-fg-muted">
                  {project.summary}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink sm:inline-flex motion-reduce:transition-none"
              >
                <ArrowUpRight size={24} strokeWidth={1.6} />
              </span>
            </div>
          </article>
        ))}
      </div>
      <div aria-hidden="true" className="container-x mt-10 hidden lg:block lg:motion-reduce:hidden">
        <div className="h-px w-full bg-line">
          <div data-progress="" className="h-px origin-left scale-x-0 bg-brand" />
        </div>
      </div>
    </div>
  );
}
