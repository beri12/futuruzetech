import {
  Brain,
  Code2,
  LayoutTemplate,
  PenTool,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { Service, ServiceSlug } from "@/types";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Website Development",
    navLabel: "Websites",
    icon: LayoutTemplate,
    shortDescription:
      "Fast, responsive, search-friendly websites designed to turn visitors into customers.",
    intro:
      "A website is often the first interaction a customer has with your business. We build websites that load quickly, read well on every device, rank in search, and lead visitors clearly toward the next step, whether that is a call, a purchase, or a form.",
    deliverables: [
      "Business websites",
      "Corporate websites",
      "Landing pages",
      "CMS-driven websites",
      "E-commerce platforms",
      "Website redesigns",
      "SEO-ready architecture",
      "Website maintenance",
    ],
    highlights: ["Business websites", "Landing pages", "E-commerce", "SEO-ready architecture"],
    process: [
      {
        number: "01",
        title: "Content and structure",
        description:
          "We map the pages, the messages, and the actions each page should drive before any design starts.",
      },
      {
        number: "02",
        title: "Design",
        description:
          "Wireframes, then a visual design that fits your brand and works at phone width first.",
      },
      {
        number: "03",
        title: "Build",
        description:
          "Implemented with modern frameworks, optimized images, accessible markup, and clean metadata.",
      },
      {
        number: "04",
        title: "Launch and maintain",
        description:
          "Deployed with analytics, monitoring, and a maintenance plan if you want one.",
      },
    ],
    faqs: [
      {
        question: "Will I be able to update the content myself?",
        answer:
          "Yes. For sites with content that changes often we set up a content management system and show your team how to use it.",
      },
      {
        question: "Can you redesign my current website?",
        answer:
          "Yes. We start with an audit of what is working, what is not, and what can be reused, then propose a redesign or a staged refresh.",
      },
      {
        question: "Do you handle hosting and domains?",
        answer:
          "We set up hosting and connect your domain as part of launch, and can manage them for you under a maintenance plan.",
      },
    ],
    cta: {
      title: "Need a website that works as hard as you do?",
      description: "Tell us about your business and what the site needs to achieve.",
    },
    seo: {
      title: "Website Development Services",
      description:
        "Fast, responsive, SEO-ready business websites, landing pages and e-commerce platforms built by Futurize Technology.",
    },
  },
  {
    slug: "software-development",
    title: "Custom Software Development",
    navLabel: "Custom Software",
    icon: Code2,
    shortDescription:
      "Reliable software built around your workflows, business requirements, and long-term goals.",
    intro:
      "Off-the-shelf tools rarely match how a business actually runs. We design and build software around your real processes, integrate it with the systems you already use, and keep it maintainable so it can grow with you.",
    deliverables: [
      "SaaS platforms",
      "Business management systems",
      "ERP and CRM solutions",
      "Internal business tools",
      "API development and integrations",
      "Workflow automation",
      "Database architecture",
    ],
    highlights: ["SaaS platforms", "ERP and CRM", "API integrations", "Workflow automation"],
    process: [
      {
        number: "01",
        title: "Requirements",
        description:
          "We document the workflows, the users, the data, and the rules the system has to respect.",
      },
      {
        number: "02",
        title: "Architecture",
        description:
          "Data model, integrations, permissions, and a technical approach that fits your scale and budget.",
      },
      {
        number: "03",
        title: "Iterative delivery",
        description:
          "Working software in milestones, reviewed with you, with tests and code reviews along the way.",
      },
      {
        number: "04",
        title: "Rollout and support",
        description:
          "Data migration, training, deployment, and ongoing support as agreed.",
      },
    ],
    faqs: [
      {
        question: "Can you integrate with the systems we already use?",
        answer:
          "Yes. Integrations with payment providers, accounting tools, messaging services, and existing databases are a normal part of our work.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. Source code and documentation are handed over at the end of the project, or continuously if you prefer.",
      },
      {
        question: "Can you take over an existing codebase?",
        answer:
          "Yes. We review the current code first, report what we find, and propose a plan for stabilizing or modernizing it.",
      },
    ],
    cta: {
      title: "Have a process that software could run better?",
      description: "Describe the workflow and we will propose a practical solution.",
    },
    seo: {
      title: "Custom Software Development Services",
      description:
        "SaaS platforms, ERP and CRM systems, internal tools, APIs and workflow automation built around your business by Futurize Technology.",
    },
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    navLabel: "Mobile Apps",
    icon: Smartphone,
    shortDescription:
      "Intuitive mobile experiences that connect your business with customers wherever they are.",
    intro:
      "Mobile is where many of your customers already are. We build Android and iOS applications that feel native, work on the networks and devices your users actually have, and connect to a backend you can rely on.",
    deliverables: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications",
      "React Native and Expo development",
      "Mobile backend APIs",
      "App modernization",
      "App maintenance",
    ],
    highlights: ["Android", "iOS", "React Native and Expo", "Mobile backend APIs"],
    process: [
      {
        number: "01",
        title: "Product definition",
        description:
          "User journeys, core features for the first release, and what can wait for later versions.",
      },
      {
        number: "02",
        title: "UX and UI",
        description:
          "Screen flows and a visual design that follows platform conventions where it matters.",
      },
      {
        number: "03",
        title: "Build and test",
        description:
          "A shared React Native codebase with native builds, tested on real devices and slow networks.",
      },
      {
        number: "04",
        title: "Store release and updates",
        description:
          "App Store and Google Play submission, then over-the-air updates and maintenance.",
      },
    ],
    faqs: [
      {
        question: "Do you build for both Android and iOS?",
        answer:
          "Yes, usually from one React Native and Expo codebase so both platforms ship together and stay in sync.",
      },
      {
        question: "Does the app need a backend?",
        answer:
          "Most do. We build the APIs, authentication, and data storage the app needs, or connect it to your existing systems.",
      },
      {
        question: "Can you publish the app for us?",
        answer:
          "Yes. We prepare the store listings and handle submission, using developer accounts in your company's name.",
      },
    ],
    cta: {
      title: "Ready to put your business in your customers' pockets?",
      description: "Share the idea and the audience, and we will outline the first release.",
    },
    seo: {
      title: "Mobile App Development Services",
      description:
        "Android, iOS and cross-platform mobile applications built with React Native and Expo, with reliable backend APIs, by Futurize Technology.",
    },
  },
  {
    slug: "ai-development",
    title: "AI and Machine Learning",
    navLabel: "AI Solutions",
    icon: Brain,
    shortDescription:
      "Practical AI solutions that automate repetitive work, improve customer experiences, and unlock useful insights.",
    intro:
      "AI is most useful when it solves a specific, measurable problem. We help you find those problems, integrate large language models and machine learning where they add value, and validate the results before you depend on them.",
    deliverables: [
      "AI-powered applications",
      "AI chatbots and assistants",
      "LLM integrations",
      "Retrieval-augmented generation systems",
      "Document processing",
      "Recommendation systems",
      "Business process automation",
      "Data analysis and ML prototypes",
    ],
    highlights: ["AI chatbots and assistants", "LLM integrations", "RAG systems", "Process automation"],
    process: [
      {
        number: "01",
        title: "Opportunity assessment",
        description:
          "We identify where AI can realistically save time or improve decisions, and where it cannot.",
      },
      {
        number: "02",
        title: "Prototype",
        description:
          "A focused proof of concept on your real data, with clear success criteria.",
      },
      {
        number: "03",
        title: "Integration",
        description:
          "Production integration with your systems, guardrails, monitoring, and human review where needed.",
      },
      {
        number: "04",
        title: "Evaluation and iteration",
        description:
          "Ongoing measurement of quality and cost, and improvements as usage grows.",
      },
    ],
    faqs: [
      {
        question: "Which AI models do you work with?",
        answer:
          "We integrate commercial LLM APIs and open models depending on the task, the data sensitivity, and the budget.",
      },
      {
        question: "Is our data safe?",
        answer:
          "We design for data minimization, use providers with clear data handling terms, and can keep sensitive processing within your own infrastructure.",
      },
      {
        question: "Will the AI always be right?",
        answer:
          "No system is. We scope each feature honestly, add validation and human review where mistakes would be costly, and measure quality continuously.",
      },
    ],
    cta: {
      title: "Curious where AI fits in your business?",
      description: "Tell us about the repetitive work or the decisions you want to improve.",
    },
    seo: {
      title: "AI and Machine Learning Development",
      description:
        "AI assistants, LLM integrations, retrieval-augmented generation, document processing and business automation by Futurize Technology.",
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    navLabel: "Digital Marketing",
    icon: TrendingUp,
    shortDescription:
      "Reach the right audience, strengthen your brand, and convert more attention into business.",
    intro:
      "A good product still needs to be found. We plan and run digital marketing that fits your market, from search and content to social and paid campaigns, and we report on what actually happened.",
    deliverables: [
      "Digital marketing strategy",
      "Social media management",
      "Search engine optimization",
      "Content marketing",
      "Paid advertising campaign setup",
      "Analytics and conversion tracking",
      "Campaign reporting",
    ],
    highlights: ["Strategy", "Social media", "SEO and content", "Paid campaigns"],
    process: [
      {
        number: "01",
        title: "Audit and goals",
        description:
          "Where you stand today, who you want to reach, and what a result looks like.",
      },
      {
        number: "02",
        title: "Strategy",
        description:
          "Channels, messages, content calendar, and a budget split that fits the goals.",
      },
      {
        number: "03",
        title: "Execution",
        description:
          "Content, campaigns, and optimization, with tracking set up from day one.",
      },
      {
        number: "04",
        title: "Reporting",
        description:
          "Plain-language reports on reach, engagement, leads, and what to change next.",
      },
    ],
    faqs: [
      {
        question: "Do you manage social media accounts?",
        answer:
          "Yes. We plan, create, schedule, and report on content for the platforms your audience uses.",
      },
      {
        question: "Can you run paid ads?",
        answer:
          "Yes. We set up and manage campaigns on search and social platforms with conversion tracking in place.",
      },
      {
        question: "How do you measure results?",
        answer:
          "With analytics and conversion tracking configured for your goals, reported in regular, readable summaries.",
      },
    ],
    cta: {
      title: "Want more of the right people to find you?",
      description: "Tell us about your audience and your goals, and we will propose a plan.",
    },
    seo: {
      title: "Digital Marketing Services",
      description:
        "Digital marketing strategy, SEO, content, social media management and paid campaigns with clear reporting by Futurize Technology.",
    },
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX and Product Design",
    navLabel: "UI/UX Design",
    icon: PenTool,
    shortDescription:
      "Turn complicated ideas into clear, engaging, and intuitive digital experiences.",
    intro:
      "Good design is what makes software feel simple. We research how people will use your product, structure it so the important things are obvious, and design interfaces that are consistent, accessible, and ready to build.",
    deliverables: [
      "User research",
      "User journeys",
      "Wireframes",
      "Interactive prototypes",
      "Design systems",
      "Responsive UI design",
      "Usability improvements",
    ],
    highlights: ["User research", "Wireframes", "Prototypes", "Design systems"],
    process: [
      {
        number: "01",
        title: "Research",
        description:
          "Interviews, existing data, and competitive review to understand users and context.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "User journeys, information architecture, and low-fidelity wireframes.",
      },
      {
        number: "03",
        title: "Visual design",
        description:
          "A design system and high-fidelity screens, tested as interactive prototypes.",
      },
      {
        number: "04",
        title: "Handover",
        description:
          "Specifications and assets developers can build from without guesswork.",
      },
    ],
    faqs: [
      {
        question: "Can you design for a product we are building ourselves?",
        answer:
          "Yes. We deliver design systems, screens, and prototypes your own developers can implement.",
      },
      {
        question: "Do you test designs with real users?",
        answer:
          "Where the project allows it, yes. Prototype testing with a few real users catches most usability problems early.",
      },
      {
        question: "Can you improve an existing interface?",
        answer:
          "Yes. A usability review followed by targeted improvements is often the fastest way to a better product.",
      },
    ],
    cta: {
      title: "Have an idea that needs to feel simple?",
      description: "Tell us who it is for and what they need to do, and we will take it from there.",
    },
    seo: {
      title: "UI/UX and Product Design Services",
      description:
        "User research, wireframes, interactive prototypes, design systems and responsive UI design by Futurize Technology.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs: ServiceSlug[] = services.map((service) => service.slug);
