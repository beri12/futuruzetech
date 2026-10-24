import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/chip";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { sortedPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Practical articles from Futurize Technology on briefing software projects, website performance in African markets, and where AI helps a business.",
  path: "/blog",
});

const newsletterEnabled = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === "true";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Practical notes on building digital products."
        description="Short, useful articles on planning projects, building for real users, and choosing technology wisely. No fluff."
        breadcrumbs={[{ label: "Insights" }]}
        size="large"
      />

      <section aria-label="Articles" className="bg-ink">
        <Container className="section-y flex flex-wrap gap-14">
          <Stagger as="ul" className="flex flex-[2] basis-[560px] flex-col divide-y divide-line border-y border-line">
            {sortedPosts.map((post) => (
              <StaggerItem as="li" key={post.slug} className="group relative flex flex-col gap-3 py-8">
                <div className="flex flex-wrap items-center gap-3 text-[13px] text-fg-dim">
                  <Label>{post.category}</Label>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" size={13} />
                    {post.readingTimeMinutes} min read
                  </span>
                </div>
                <h2 className="text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.15]">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 hover:text-brand-bright focus-visible:outline-none">
                    {post.title}
                  </Link>
                </h2>
                <p className="max-w-[640px] text-[15px] leading-relaxed text-fg-muted">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Read article
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.2}
                    className="transition-transform duration-base group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="flex flex-1 basis-[280px] flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-6">
              <h2 className="text-lg font-semibold">About these articles</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                Written by the Futurize Technology team from the questions clients actually ask us.
                We add new articles as they are ready, not on a schedule.
              </p>
            </div>
            {newsletterEnabled ? (
              <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-6">
                <NewsletterForm />
              </div>
            ) : null}
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Have a question these articles did not answer?"
        description="Ask us directly. If it is useful to others, it may become the next article."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
