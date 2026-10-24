import type { LucideIcon } from "lucide-react";

export type ServiceSlug =
  | "web-development"
  | "software-development"
  | "mobile-app-development"
  | "ai-development"
  | "digital-marketing"
  | "ui-ux-design";

export type Faq = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short label used in navigation and chips. */
  navLabel: string;
  icon: LucideIcon;
  shortDescription: string;
  /** Longer intro used on the detail page. */
  intro: string;
  deliverables: string[];
  /** Subset of deliverables shown on the homepage card. */
  highlights: string[];
  process: ProcessStep[];
  faqs: Faq[];
  cta: {
    title: string;
    description: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type ProjectKind = "client" | "internal" | "concept" | "case-study";

export type Project = {
  slug: string;
  name: string;
  category: string;
  kind: ProjectKind;
  summary: string;
  description: string[];
  technologies: string[];
  /** Path under /public, or null when no authorized screenshot exists yet. */
  image: string | null;
  imageAlt: string;
  url?: string;
  featured?: boolean;
  /** Set to true when a fact still has to be verified before publishing. */
  needsVerification?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  organization: string;
  avatar?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role?: string;
  };
  /** Simple block-based body so the content stays typed and needs no CMS. */
  body: BlogBlock[];
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type EngagementModel = {
  slug: string;
  name: string;
  description: string;
  includes: string[];
  highlighted?: boolean;
};

export type TechCategory = {
  name: string;
  items: string[];
};
