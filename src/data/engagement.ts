import type { EngagementModel } from "@/types";

export const engagementModels: EngagementModel[] = [
  {
    slug: "starter",
    name: "Starter Projects",
    description:
      "Focused websites and smaller digital solutions with a clear scope and a short timeline.",
    includes: [
      "Business and landing websites",
      "Redesigns and performance fixes",
      "Small automations and integrations",
    ],
  },
  {
    slug: "business",
    name: "Business Solutions",
    description:
      "Custom software, integrations, and business platforms built around how your organization works.",
    includes: [
      "Web and mobile applications",
      "ERP, CRM, and internal tools",
      "API development and data architecture",
    ],
    highlighted: true,
  },
  {
    slug: "growth",
    name: "Growth and Innovation",
    description:
      "AI solutions, complex applications, and ongoing optimization for teams that keep shipping.",
    includes: [
      "AI assistants, RAG, and automation",
      "SaaS products and platforms",
      "Growth marketing and analytics",
    ],
  },
];

export const engagementFormats = [
  {
    name: "Fixed-scope projects",
    description: "A defined deliverable, timeline, and price agreed up front.",
  },
  {
    name: "Monthly development retainers",
    description: "A reserved amount of team time each month for continuous work.",
  },
  {
    name: "Ongoing maintenance",
    description: "Updates, monitoring, backups, and small improvements after launch.",
  },
  {
    name: "Technical consulting",
    description: "Architecture reviews, audits, and advice when you need a second opinion.",
  },
];
