import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "dark",
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex max-w-[680px] flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", light ? "text-brand-deep" : "text-brand")}>{eyebrow}</p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "font-display font-bold leading-[1.06]",
          Heading === "h1"
            ? "text-[clamp(40px,5.4vw,76px)] leading-[1.02]"
            : "text-[clamp(32px,3.6vw,52px)]",
          light ? "text-light-ink" : "text-fg",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("text-[17px] leading-relaxed", light ? "text-light-muted" : "text-fg-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
