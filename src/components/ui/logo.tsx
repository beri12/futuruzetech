import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Original Futurize mark: three shortening bars (an abstract "F" and a
 * signal fading forward) with a forward arrow. Pure SVG, no external asset.
 */
export function LogoMark({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 5h12" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 12h8" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 19h4" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 12h5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 9l3 3-3 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} title={`${siteConfig.name} home`} className={cn("group inline-flex items-center gap-3 text-fg", className)}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-white/[0.03] transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-[-8deg] group-hover:border-brand motion-reduce:transition-none">
        <LogoMark size={18} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[17px] font-semibold tracking-[0.02em] uppercase">{siteConfig.shortName}</span>
        <span className="mt-1 font-display text-[9.5px] uppercase tracking-[0.42em] text-fg-muted">Technology</span>
      </span>
    </Link>
  );
}
