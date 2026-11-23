import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light" | "link";
type Size = "sm" | "md" | "lg";
type IconKind = "arrow" | "external" | "none";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium whitespace-nowrap select-none transition-[color,border-color,background-color] duration-base ease-out disabled:opacity-60 disabled:pointer-events-none motion-reduce:transition-none";

/*
 * Each variant has a fill layer (the ::before pseudo-element) that rises
 * from the bottom on hover, so the colour change has direction instead of a
 * flat swap.
 */
const fill =
  "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-[var(--ease-out-expo)] hover:before:translate-y-0 focus-visible:before:translate-y-0 motion-reduce:before:transition-none";

const variants: Record<Variant, string> = {
  primary: cn("bg-brand text-ink font-semibold before:bg-fg", fill),
  ghost: cn("border border-line-strong text-fg bg-white/[0.02] hover:text-ink hover:border-fg before:bg-fg", fill),
  light: cn("bg-fg text-ink font-semibold before:bg-brand", fill),
  link: "text-brand font-semibold hover:text-brand-bright rounded-none px-0 h-auto min-h-11 overflow-visible",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconKind;
  className?: string;
  /** Pull the button toward the pointer on hover (desktop only). */
  magnetic?: boolean;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string; external?: boolean };

type NativeButtonProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  "aria-busy"?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function Icon({ kind, size }: { kind: IconKind; size: Size }) {
  if (kind === "none") return null;
  const px = size === "sm" ? 15 : 17;
  const Comp = kind === "external" ? ArrowUpRight : ArrowRight;
  return (
    <span aria-hidden="true" className="relative inline-flex overflow-hidden">
      <Comp
        width={px}
        height={px}
        strokeWidth={2.2}
        className={cn(
          "transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          kind === "external" ? "group-hover/btn:-translate-y-full group-hover/btn:translate-x-full" : "group-hover/btn:translate-x-full",
        )}
      />
      <Comp
        width={px}
        height={px}
        strokeWidth={2.2}
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          kind === "external"
            ? "translate-y-full -translate-x-full group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
            : "-translate-x-full group-hover/btn:translate-x-0",
        )}
      />
    </span>
  );
}

/** Label that rolls up to an identical copy on hover. */
function RollLabel({ children, roll }: { children: ReactNode; roll: boolean }) {
  if (!roll) return <span>{children}</span>;
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon = "none", className, magnetic = false, children } = props;
  const classes = cn(base, variants[variant], variant === "link" ? "" : sizes[size], className);
  const roll = variant !== "link";
  const content = (
    <>
      <RollLabel roll={roll}>{children}</RollLabel>
      <Icon kind={icon} size={size} />
    </>
  );

  let element: ReactNode;
  if (typeof props.href === "string") {
    element = props.external ? (
      <a href={props.href} className={classes} target="_blank" rel="noreferrer noopener">
        {content}
      </a>
    ) : (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  } else {
    element = (
      <button
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        aria-busy={props["aria-busy"]}
        aria-expanded={props["aria-expanded"]}
        aria-controls={props["aria-controls"]}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
