import type { Project } from "@/types";

/**
 * Portfolio projects.
 *
 * Only verified information belongs here. Projects marked `needsVerification`
 * carry neutral placeholder copy and are still shown so the structure is
 * ready, but their details must be confirmed before publishing. Replace the
 * bracketed placeholders and set `needsVerification` to false when done.
 */
export const projects: Project[] = [
  {
    slug: "kidora",
    name: "Kidora",
    category: "EdTech platform",
    kind: "internal",
    featured: true,
    summary:
      "An AI-powered, gamified learning platform for children, combining structured lessons with playful progression so young learners stay engaged.",
    description: [
      "Kidora is an education platform for children that pairs structured learning content with game-like progression. Lessons are organized into levels that unlock as learners complete them, which keeps young users motivated without relying on constant adult supervision.",
      "The platform is built as a web application with a separate API, so the same content and progress data can later power additional clients. AI features assist with content organization and personalized suggestions, and are scoped so that the learning content itself remains curated.",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "AI integration"],
    image: null,
    imageAlt: "Kidora learning platform interface",
  },
  {
    slug: "gobezsew",
    name: "Gobezsew",
    category: "[Project category]",
    kind: "client",
    needsVerification: true,
    summary: "[Add a verified one-sentence description of the Gobezsew project.]",
    description: [
      "[Add verified project background: who the client is, what problem the project solved, and what was delivered.]",
    ],
    technologies: [],
    image: null,
    imageAlt: "Gobezsew project",
  },
  {
    slug: "zelalem-construction",
    name: "Zelalem Construction",
    category: "[Project category]",
    kind: "client",
    needsVerification: true,
    summary: "[Add a verified one-sentence description of the Zelalem Construction project.]",
    description: [
      "[Add verified project background: who the client is, what problem the project solved, and what was delivered.]",
    ],
    technologies: [],
    image: null,
    imageAlt: "Zelalem Construction project",
  },
  {
    slug: "chaka-gebeya",
    name: "Chaka Gebeya",
    category: "[Project category]",
    kind: "client",
    needsVerification: true,
    summary: "[Add a verified one-sentence description of the Chaka Gebeya project.]",
    description: [
      "[Add verified project background: who the client is, what problem the project solved, and what was delivered.]",
    ],
    technologies: [],
    image: null,
    imageAlt: "Chaka Gebeya project",
  },
];

export const projectKindLabels: Record<Project["kind"], string> = {
  client: "Client work",
  internal: "Internal product",
  concept: "Concept work",
  "case-study": "Case study",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectSlugs = projects.map((project) => project.slug);
