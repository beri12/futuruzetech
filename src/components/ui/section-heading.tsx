import type { ReactNode } from "react";
import { SplitText } from "@/components/motion/split-text";
import { Eyebrow } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Optional section index shown before the eyebrow, e.g. "02". */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  size?: "lg" | "md";
  /** Words in the title set in the serif italic accent. */
  accent?: string[];
  /** Animate a string title with a word-by-word mask reveal (default true). */
  animate?: boolean;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  id,
  tone = "dark",
  align = "left",
  className,
  as: Heading = "h2",
  size = "md",
  accent,
  animate = true,
}: SectionHeadingProps) {
  const light = tone === "light";
  const titleClass = cn(
    Heading === "h1" || size === "lg" ? "text-display-lg" : "text-display-md",
    light ? "text-light-ink" : "text-fg",
  );
  return (
    <div className={cn("flex max-w-[860px] flex-col gap-6", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      {typeof title === "string" && animate ? (
        <SplitText as={Heading} id={id} text={title} accent={accent} className={titleClass} />
      ) : (
        <Heading id={id} className={titleClass}>
          {title}
        </Heading>
      )}
      {description ? (
        <p className={cn("text-lead max-w-[620px]", light ? "text-light-muted" : "text-fg-muted")}>{description}</p>
      ) : null}
    </div>
  );
}
