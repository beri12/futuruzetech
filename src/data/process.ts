import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand business goals, users, challenges, requirements, and success criteria.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "Define scope, technical approach, milestones, deliverables, and priorities.",
  },
  {
    number: "03",
    title: "Design",
    description: "Develop user flows, wireframes, visual concepts, and interactive prototypes.",
  },
  {
    number: "04",
    title: "Build and Validate",
    description: "Implement, test, review, and refine the solution.",
  },
  {
    number: "05",
    title: "Launch and Improve",
    description: "Deploy, monitor, optimize, and provide ongoing support as agreed.",
  },
];

/** Longer explanation for the dedicated process page. */
export const processDetails: Array<ProcessStep & { details: string[] }> = [
  {
    ...processSteps[0],
    details: [
      "A discovery call to understand your business, your users, and what success looks like.",
      "A written summary of what we heard, so we agree on the problem before proposing a solution.",
      "Review of existing systems, content, and constraints that the project has to respect.",
    ],
  },
  {
    ...processSteps[1],
    details: [
      "A proposal with scope, milestones, deliverables, and cost.",
      "A technical approach chosen for your scale and budget, not for novelty.",
      "Priorities for a first release and a list of what can follow later.",
    ],
  },
  {
    ...processSteps[2],
    details: [
      "User journeys and wireframes that fix the structure before visual design starts.",
      "Visual concepts aligned with your brand, designed for phone width first.",
      "Interactive prototypes you can click through and comment on.",
    ],
  },
  {
    ...processSteps[3],
    details: [
      "Implementation in milestones, with working software demonstrated at each one.",
      "Automated tests, code review, and accessibility checks as part of the normal workflow.",
      "Your feedback folded in before the next milestone, with changes agreed in writing.",
    ],
  },
  {
    ...processSteps[4],
    details: [
      "Deployment with monitoring, analytics, and documentation handed over to your team.",
      "A review of real usage after launch and a list of improvements worth making.",
      "Ongoing support through a maintenance plan or retainer, as agreed.",
    ],
  },
];
