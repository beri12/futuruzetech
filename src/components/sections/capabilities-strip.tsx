import { Marquee } from "@/components/motion/marquee";
import { capabilities } from "@/data/stack";

/** Oversized capability ticker between the hero and the About section. */
export function CapabilitiesStrip() {
  return (
    <section aria-label="Capabilities" className="border-b border-line-soft bg-ink py-[clamp(28px,4vw,48px)]">
      <h2 className="sr-only">What we build</h2>
      <Marquee duration={55}>
        {capabilities.map((label, index) => (
          <span key={label} className="flex items-center">
            <span
              className={
                index % 2 === 0
                  ? "px-[clamp(18px,2.4vw,40px)] font-display text-[clamp(30px,5vw,80px)] font-medium tracking-[-0.04em] text-fg"
                  : "px-[clamp(18px,2.4vw,40px)] font-serif text-[clamp(30px,5vw,80px)] italic tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_rgba(245,247,245,0.45)]"
              }
            >
              {label}
            </span>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" className="shrink-0 text-brand">
              <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
