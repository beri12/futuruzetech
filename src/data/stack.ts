import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular"] },
  { name: "Backend", items: ["Node.js", "NestJS", "Python", "Express", "C#", ".NET"] },
  { name: "Mobile", items: ["React Native", "Expo"] },
  { name: "Data", items: ["PostgreSQL", "MySQL", "Redis", "Prisma"] },
  {
    name: "AI",
    items: ["LLM APIs", "Retrieval-augmented generation", "Machine learning integrations", "AI workflow automation"],
  },
  { name: "Infrastructure", items: ["Docker", "Nginx", "GitHub Actions", "Cloud hosting", "Cloudflare"] },
  { name: "Design and motion", items: ["Figma", "Framer Motion", "GSAP"] },
];

export const capabilities = [
  "Software Engineering",
  "Mobile Applications",
  "Artificial Intelligence",
  "ERP & Enterprise Systems",
  "Digital Transformation",
  "UI/UX & Product Design",
  "Digital Marketing",
];

/** The five commitments behind every engagement. */
export const whyChoose = [
  {
    title: "Engineering excellence",
    description:
      "Typed code, peer review, automated checks and CI on every project, so quality is a habit rather than a final-week scramble.",
    points: ["Code review", "Automated testing", "CI/CD"],
  },
  {
    title: "Modern technology",
    description:
      "Current, well-supported frameworks and cloud services chosen for the problem at hand, not for novelty.",
    points: ["Next.js and React", "NestJS and Python", "AI services"],
  },
  {
    title: "Scalable architecture",
    description:
      "Systems designed to grow with your users, data and team, with clear boundaries that make change affordable later.",
    points: ["Modular design", "API-first", "Observability"],
  },
  {
    title: "User-centered design",
    description:
      "Research, prototypes and testing with real people, designed for the phones and networks your users actually have.",
    points: ["Research", "Prototyping", "Accessibility"],
  },
  {
    title: "Long-term partnership",
    description:
      "Documentation, handover and support after launch. We measure our work by how well your product keeps running.",
    points: ["Documentation", "Support plans", "Roadmapping"],
  },
] as const;

export const expectations = [
  {
    when: "Week one",
    title: "A shared understanding",
    description:
      "A discovery call, a written summary of what we heard, and a proposal with scope and milestones.",
  },
  {
    when: "During the build",
    title: "Regular demos",
    description:
      "Working software you can click through at each milestone, with changes agreed before they happen.",
  },
  {
    when: "At launch",
    title: "Handover you can use",
    description:
      "Documentation, access, and a support plan, so nothing depends on a single person's memory.",
  },
];
