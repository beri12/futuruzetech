import type { BlogPost } from "@/types";

/**
 * Insights articles.
 *
 * A typed, file-based content store is deliberate: it needs no CMS, is
 * versioned with the code, and can be migrated to MDX or a headless CMS
 * later without changing the pages that render it. Articles are written by
 * the Futurize Technology team; no invented authors.
 */
const teamAuthor = { name: "Futurize Technology", role: "Editorial team" };

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-brief-a-software-project",
    title: "How to brief a software project so you get an accurate quote",
    excerpt:
      "A good brief does not need to be long. It needs to answer five questions that every development team will ask anyway.",
    category: "Working with us",
    tags: ["Project planning", "Briefing", "Budget"],
    publishedAt: "2026-10-05",
    readingTimeMinutes: 5,
    author: teamAuthor,
    body: [
      {
        type: "paragraph",
        text: "Most inaccurate quotes come from incomplete briefs, not from bad estimating. When a development team has to guess what you mean, they either pad the price to cover the risk or underquote and renegotiate later. Both are avoidable. The brief below takes about thirty minutes to write and gives any serious team what it needs for a credible first estimate.",
      },
      { type: "heading", text: "1. What problem are you solving, and for whom?" },
      {
        type: "paragraph",
        text: "Describe the situation before the software exists. Who is frustrated, what are they doing today, and what would be different afterwards? A sentence such as \"our sales team tracks orders in three spreadsheets and customers call to ask for status\" tells a team more than a list of features.",
      },
      { type: "heading", text: "2. Who will use it, and on what devices?" },
      {
        type: "paragraph",
        text: "Staff on office computers, customers on low-end Android phones over mobile data, and managers on tablets have very different needs. Naming the main user groups and their devices shapes the architecture early, when it is cheap to decide.",
      },
      { type: "heading", text: "3. What has to be in the first release?" },
      {
        type: "paragraph",
        text: "Separate what the product must do on day one from what would be nice later. A short first release that people actually use beats a long list that never ships. Teams can then quote the first release precisely and the later phases roughly.",
      },
      { type: "heading", text: "4. What does it need to connect to?" },
      {
        type: "list",
        items: [
          "Payment providers, mobile money, or banks",
          "Accounting, inventory, or HR systems already in use",
          "Messaging channels such as SMS, email, WhatsApp, or Telegram",
          "Existing databases, spreadsheets, or documents that hold today's data",
        ],
      },
      {
        type: "paragraph",
        text: "Integrations are where estimates most often go wrong, because each one depends on a third party. Listing them up front lets the team check what is possible before quoting.",
      },
      { type: "heading", text: "5. What are the constraints?" },
      {
        type: "paragraph",
        text: "A fixed launch date, a budget ceiling, a language the interface must support, a regulation the data must follow, or a hosting requirement. Constraints are not bad news for a team; they are the boundaries that make a plan realistic.",
      },
      {
        type: "paragraph",
        text: "If you send these five answers to Futurize Technology through our contact form, you will receive a response that treats them seriously: a discovery call to fill the gaps, then a proposal with scope, milestones, and cost.",
      },
    ],
  },
  {
    slug: "website-performance-for-african-markets",
    title: "Why website performance matters more in African markets",
    excerpt:
      "Many visitors arrive on mid-range phones over mobile data. Here is what that means for how a website should be built.",
    category: "Web development",
    tags: ["Performance", "Mobile", "Core Web Vitals"],
    publishedAt: "2026-09-21",
    readingTimeMinutes: 6,
    author: teamAuthor,
    body: [
      {
        type: "paragraph",
        text: "A website that feels fast on a laptop in an office can feel broken on a phone on a 3G connection. For businesses whose customers are in Ethiopia and other African markets, that second scenario is often the normal one. Performance is not a polish item here; it decides whether people see your site at all.",
      },
      { type: "heading", text: "The conditions to design for" },
      {
        type: "list",
        items: [
          "Mid-range Android devices with limited memory and slower processors",
          "Mobile data that is metered, so every megabyte has a cost to the visitor",
          "Variable connections that drop and recover during a page load",
          "Older browser versions that cannot be assumed to support the newest features",
        ],
      },
      { type: "heading", text: "What a well-built site does differently" },
      {
        type: "paragraph",
        text: "It ships less JavaScript. Modern frameworks such as Next.js render pages on the server and send mostly HTML, with interactive code loaded only where it is needed. It serves images in modern formats at the size the screen actually needs, instead of a single large file scaled down. It loads fonts without blocking text from appearing. And it avoids third-party scripts that add weight without clear value.",
      },
      { type: "heading", text: "How to check your own site" },
      {
        type: "paragraph",
        text: "Open your site in a browser's developer tools, enable network throttling set to a slow 3G profile, and reload. Note when the main content becomes readable and when the page stops shifting around. Google's PageSpeed Insights gives the same picture with scores you can track over time. If the main content takes longer than a few seconds to appear, visitors on real connections are leaving before it does.",
      },
      {
        type: "paragraph",
        text: "Performance is a design decision made at the start of a project, which is why we treat it as part of every website build rather than as an optimization afterwards.",
      },
    ],
  },
  {
    slug: "where-ai-actually-helps-small-businesses",
    title: "Where AI actually helps a small business, and where it does not yet",
    excerpt:
      "Past the headlines, a few uses of AI pay for themselves quickly. Others still need a human in the loop. A practical guide.",
    category: "AI",
    tags: ["AI", "Automation", "Small business"],
    publishedAt: "2026-09-08",
    readingTimeMinutes: 7,
    author: teamAuthor,
    body: [
      {
        type: "paragraph",
        text: "Businesses ask us about AI every week. The useful answer is rarely \"yes to everything\" or \"it is all hype\". Large language models are reliable for some kinds of work and unreliable for others, and the difference is predictable enough to plan around.",
      },
      { type: "heading", text: "Uses that usually pay off" },
      {
        type: "list",
        items: [
          "Answering repeated customer questions from your own documents, with a hand-off to a person when the question is new",
          "Extracting structured data from invoices, forms, and messages so staff stop retyping it",
          "Drafting first versions of routine text such as product descriptions, replies, and summaries that a person then reviews",
          "Classifying and routing incoming requests to the right team",
        ],
      },
      {
        type: "paragraph",
        text: "What these have in common: the input is text or documents, a wrong answer is cheap to catch, and a person stays responsible for the final decision.",
      },
      { type: "heading", text: "Uses that still need caution" },
      {
        type: "list",
        items: [
          "Decisions with legal or financial consequences made without review",
          "Anything where the model must know facts it was never given, such as today's prices or stock",
          "Replacing a process you have not yet standardized; AI amplifies a messy process rather than fixing it",
        ],
      },
      { type: "heading", text: "How we approach an AI project" },
      {
        type: "paragraph",
        text: "We start with a short assessment to find the task with the clearest return, build a prototype on your real data with success criteria agreed in advance, and only then integrate it into daily operations with monitoring and a review step. If the prototype does not meet the criteria, you learn that early and cheaply.",
      },
      {
        type: "paragraph",
        text: "If you are weighing an AI feature, our AI and machine learning service page describes the process in more detail, and the contact form is the quickest way to ask about your specific case.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const sharedA = a.tags.filter((tag) => post.tags.includes(tag)).length;
      const sharedB = b.tags.filter((tag) => post.tags.includes(tag)).length;
      return sharedB - sharedA;
    })
    .slice(0, limit);
}

export const postSlugs = blogPosts.map((post) => post.slug);

export const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);
