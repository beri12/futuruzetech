import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Original Futurize mark: three shortening bars (an abstract "F" and a
 * signal fading forward) with a forward arrow. Pure SVG, no external asset.
 */
export function LogoMark({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 5h12" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 12h8" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 19h4" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 12h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M17 9l3 3-3 3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      title={`${siteConfig.name} home`}
      className={cn("inline-flex items-center gap-3 text-fg", className)}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface">
        <LogoMark />
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className="font-display text-[17px] font-bold tracking-[-0.01em]">
          {siteConfig.shortName}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-fg-muted">Technology</span>
      </span>
    </Link>
  );
}
