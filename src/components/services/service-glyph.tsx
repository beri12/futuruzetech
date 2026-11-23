import type { ServiceSlug } from "@/types";

/**
 * One small custom illustration per service, so the cards are not eight
 * copies of the same box. Strokes use currentColor and react to the card's
 * hover state through `group-hover` classes on the parent.
 */
const common = "h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06] motion-reduce:transition-none";

export function ServiceGlyph({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "software-development":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <path d="M44 38 22 60l22 22M76 38l22 22-22 22" stroke="currentColor" strokeWidth="1.5" />
          <path d="M66 28 54 92" stroke="var(--color-brand)" strokeWidth="1.5" className="origin-center transition-transform duration-700 group-hover:rotate-12" />
        </svg>
      );
    case "web-development":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <rect x="18" y="26" width="84" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 40h84" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="27" cy="33" r="2" fill="var(--color-brand)" />
          <rect x="28" y="50" width="30" height="30" rx="3" stroke="var(--color-brand)" strokeWidth="1.5" className="transition-transform duration-700 group-hover:translate-x-1" />
          <path d="M66 54h26M66 64h20M66 74h14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "mobile-app-development":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <rect x="38" y="14" width="44" height="92" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M54 22h12" stroke="currentColor" strokeWidth="1.5" />
          <rect x="46" y="34" width="28" height="18" rx="4" fill="var(--color-brand)" className="transition-transform duration-700 group-hover:-translate-y-1" />
          <path d="M46 62h28M46 70h20M46 78h24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "ai-development":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          {[
            [24, 36],
            [24, 60],
            [24, 84],
            [60, 46],
            [60, 74],
            [96, 60],
          ].map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="5" stroke="currentColor" strokeWidth="1.5" fill={index === 5 ? "var(--color-brand)" : "none"} />
          ))}
          <path d="M29 36 55 46M29 60l26-14M29 60l26 14M29 84l26-10M29 36l26 38M65 46l26 14M65 74l26-14" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
          <path d="M65 46l26 14" stroke="var(--color-brand)" strokeWidth="1.5" />
        </svg>
      );
    case "erp-enterprise-systems":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <path d="m60 22 40 20-40 20-40-20z" stroke="var(--color-brand)" strokeWidth="1.5" className="transition-transform duration-700 group-hover:-translate-y-1.5" />
          <path d="m20 60 40 20 40-20" stroke="currentColor" strokeWidth="1.5" />
          <path d="m20 78 40 20 40-20" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-700 group-hover:translate-y-1.5" />
        </svg>
      );
    case "digital-transformation":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <rect x="16" y="44" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M48 58h18" stroke="currentColor" strokeWidth="1.5" />
          <path d="m62 52 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          <rect x="74" y="44" width="28" height="28" rx="14" fill="var(--color-brand)" className="origin-center transition-transform duration-700 group-hover:rotate-90" />
          <path d="M30 30c10-12 50-12 60 0M30 88c10 12 50 12 60 0" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
        </svg>
      );
    case "ui-ux-design":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <circle cx="48" cy="52" r="26" stroke="currentColor" strokeWidth="1.5" />
          <rect x="54" y="50" width="44" height="44" rx="4" stroke="var(--color-brand)" strokeWidth="1.5" className="transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          <path d="m78 76 10 22 4-9 9-4z" fill="currentColor" />
        </svg>
      );
    case "digital-marketing":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={common} aria-hidden="true">
          <path d="M18 96h84" stroke="currentColor" strokeWidth="1.5" />
          {[26, 44, 62, 80].map((x, index) => (
            <rect key={x} x={x} y={84 - index * 14} width="12" height={12 + index * 14} stroke="currentColor" strokeWidth="1.5" />
          ))}
          <path d="M22 70 44 54l18 6 30-34" stroke="var(--color-brand)" strokeWidth="1.5" />
          <path d="M82 26h10v10" stroke="var(--color-brand)" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
}
