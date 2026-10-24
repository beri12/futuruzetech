import { Brain, Globe, Monitor, Smartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { capabilities } from "@/data/stack";

const icons: Record<string, LucideIcon> = {
  "Digital Products": Monitor,
  "Web Platforms": Globe,
  "Mobile Applications": Smartphone,
  "AI Solutions": Brain,
  "Digital Growth": TrendingUp,
};

/** Reinforces positioning after the hero. No invented logos or counts. */
export function CapabilitiesStrip() {
  return (
    <section aria-label="Capabilities" className="border-b border-line-soft bg-ink">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-7">
        <span className="text-xs uppercase tracking-[0.18em] text-fg-dim">What we build</span>
        <ul className="flex flex-wrap gap-x-9 gap-y-3">
          {capabilities.map((label) => {
            const Icon = icons[label] ?? Monitor;
            return (
              <li key={label} className="inline-flex items-center gap-2.5 text-[15px] font-medium text-fg-soft">
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} className="text-brand" />
                {label}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
