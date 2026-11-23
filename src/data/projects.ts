import type { Project } from "@/types";

/**
 * Portfolio projects.
 *
 * Only verified information belongs here. Copy describes what each product
 * is and does (taken from the live product and its brand), never invented
 * results or metrics. Set `needsVerification: true` on any entry whose
 * details still have to be confirmed: it is then excluded from the sitemap
 * and marked noindex until updated.
 *
 * Screenshots live in public/images/projects/.
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
      "Kidora is an education platform for children that pairs structured learning content with game-like progression. Learners move through subjects such as maths, science, coding, English and history, and earn experience points as they complete lessons, which keeps young users motivated without relying on constant adult supervision.",
      "The platform is built as a web application with a separate API, so the same content and progress data can later power additional clients. AI features assist with content organization and personalized suggestions, and are scoped so that the learning content itself remains curated. It is designed with African classrooms in mind.",
    ],
    technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "AI integration"],
    image: "/images/projects/kidora.jpg",
    imageAlt: "Kidora homepage with the headline Learn. Play. Grow. and an illustrated learner beside subject badges",
    url: "https://justkidora.com",
    accent: "#6d4aff",
  },
  {
    slug: "abuja-construction",
    name: "Abuja Construction",
    category: "Construction company website",
    kind: "client",
    summary:
      "A corporate website for a construction company offering general contracting, design-build, project management and renovation services.",
    description: [
      "Abuja Construction presents itself with the promise of building with precision and delivering with trust. The website introduces the company and its services: general contracting, design-build, project management and renovation.",
      "The site gives visitors a clear path from first impression to enquiry, with sections for services, team, projects, testimonials, blog and contact, a quote request call to action, and a light and dark theme.",
    ],
    technologies: [],
    image: "/images/projects/abuja-construction.jpg",
    imageAlt: "Abuja Construction homepage with the headline Building with precision, delivering with trust",
    url: "https://abuja-construction.vercel.app",
    accent: "#f26b1d",
  },
  {
    slug: "chaka-gebeya",
    name: "Chaka Gebeya",
    category: "E-commerce platform",
    kind: "client",
    summary:
      "An e-commerce platform positioned as a gateway to limitless trades, connecting buyers and sellers in one online marketplace.",
    description: [
      "Chaka Gebeya (ጫካ ገበያ) is an e-commerce platform. Its brand line, \"Your Gateway to Limitless Trades\", describes the goal: one online place where products can be listed, discovered and bought.",
      "The brand pairs an Amharic wordmark with a growing-tree symbol in fresh greens, signalling a local marketplace built to grow with the people who trade on it.",
    ],
    technologies: [],
    image: "/images/projects/chaka-gebeya.jpg",
    imageAlt: "Chaka Gebeya logo: a green tree above the Amharic name and the line Your Gateway to Limitless Trades",
    imageFit: "contain",
    imageBackground: "#ffffff",
    accent: "#6dbb3a",
  },
  {
    slug: "gobezsew",
    name: "Gobezsew",
    category: "E-learning platform",
    kind: "client",
    summary:
      "A learning platform for practical, job-ready skills, with courses from industry professionals and certifications for learners in Ethiopia.",
    description: [
      "Gobezsew helps learners master real-world skills. Courses are taught by industry professionals and lead to certifications intended to open doors to new career opportunities.",
      "The platform focuses on learning that is accessible, affordable and culturally relevant for Ethiopian learners, with course topics such as public speaking, career-oriented skills and creative thinking.",
    ],
    technologies: [],
    image: "/images/projects/gobezsew.jpg",
    imageAlt: "Gobezsew homepage with the headline Master Real-World Skills. Unlock Your Potential with Gobez Sew",
    url: "https://gobezsew.onevas.et",
    accent: "#8cc63f",
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
