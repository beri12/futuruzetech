import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular"] },
  { name: "Backend", items: ["Node.js", "NestJS", "Express", "C#", ".NET"] },
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
  "Digital Products",
  "Web Platforms",
  "Mobile Applications",
  "AI Solutions",
  "Digital Growth",
];

export const whyChoose = [
  {
    title: "Business-first problem solving",
    description: "Every decision ties back to a goal, a user, or a cost.",
    icon: "target",
  },
  {
    title: "Clear communication",
    description: "Plain updates, honest timelines, no jargon walls.",
    icon: "message",
  },
  {
    title: "Modern engineering practices",
    description: "Typed code, reviews, automated checks, and CI.",
    icon: "code",
  },
  {
    title: "Responsive design across devices",
    description: "Designed for the phone first, then every larger screen.",
    icon: "devices",
  },
  {
    title: "Scalable architecture",
    description: "Built to grow with your users, data, and team.",
    icon: "shield",
  },
  {
    title: "Maintainable code",
    description: "Readable, documented, and ready for whoever comes next.",
    icon: "list",
  },
  {
    title: "Transparent delivery process",
    description: "Milestones you can see, with demos along the way.",
    icon: "eye",
  },
  {
    title: "Post-launch support",
    description: "We stay available after go-live, as agreed.",
    icon: "life-buoy",
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
