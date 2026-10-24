import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light" | "link";
type Size = "sm" | "md" | "lg";
type IconKind = "arrow" | "external" | "none";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-base ease-out select-none disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-forest font-semibold hover:bg-brand-bright",
  ghost: "border border-line text-fg hover:border-brand hover:text-brand-bright bg-transparent",
  light: "bg-light-ink text-light hover:bg-forest",
  link: "text-brand font-semibold hover:text-brand-bright rounded-none px-0 h-auto min-h-11",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-[15px] rounded-[12px]",
  lg: "h-13 px-7 text-base rounded-[12px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconKind;
  className?: string;
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
  const px = size === "sm" ? 14 : 16;
  const Comp = kind === "external" ? ArrowUpRight : ArrowRight;
  return <Comp aria-hidden="true" width={px} height={px} strokeWidth={2.4} />;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon = "none", className, children } = props;
  const classes = cn(base, variants[variant], variant === "link" ? "" : sizes[size], className);

  if (typeof props.href === "string") {
    if (props.external) {
      return (
        <a href={props.href} className={classes} target="_blank" rel="noreferrer noopener">
          {children}
          <Icon kind={icon} size={size} />
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
        <Icon kind={icon} size={size} />
      </Link>
    );
  }

  return (
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
      {children}
      <Icon kind={icon} size={size} />
    </button>
  );
}
