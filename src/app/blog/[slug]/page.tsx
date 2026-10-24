import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Label, Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getPost, getRelatedPosts, postSlugs } from "@/data/blog";
import type { BlogBlock } from "@/types";
import { absoluteUrl, siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          author: { "@type": "Organization", name: post.author.name },
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          keywords: post.tags.join(", "),
          articleSection: post.category,
        }}
      />
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[{ label: "Insights", href: "/blog" }, { label: post.title }]}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-[13px] text-fg-muted">
          <span>By {post.author.name}</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
          {post.updatedAt ? (
            <>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
              <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
            </>
          ) : null}
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line" />
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" size={13} />
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </PageHeader>

      <article className="bg-ink">
        <Container className="section-y flex flex-wrap gap-14">
          <Reveal className="prose-ft min-w-0 flex-[2] basis-[560px] max-w-[720px]">
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
              <span className="text-xs uppercase tracking-[0.18em] text-fg-dim">Tags</span>
              {post.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </Reveal>

          <aside className="flex flex-1 basis-[280px] flex-col gap-6">
            {related.length > 0 ? (
              <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface-2 p-6">
                <h2 className="text-lg font-semibold">Related articles</h2>
                <ul className="flex flex-col gap-4">
                  {related.map((item) => (
                    <li key={item.slug} className="flex flex-col gap-1.5">
                      <Label>{item.category}</Label>
                      <Link href={`/blog/${item.slug}`} className="text-[15px] font-semibold leading-snug text-fg hover:text-brand-bright">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-6">
              <h2 className="text-lg font-semibold">Working on something similar?</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                We are happy to talk it through, whether or not it becomes a project.
              </p>
              <Link href="/contact" className="text-sm font-semibold text-brand hover:text-brand-bright">
                Start a conversation
              </Link>
            </div>
          </aside>
        </Container>
      </article>

      <CtaBanner
        title="Need help applying this to your business?"
        description="Tell us where you are and we will suggest a practical next step."
        secondary={{ label: "More articles", href: "/blog" }}
      />
    </>
  );
}
