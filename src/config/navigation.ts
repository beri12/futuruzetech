import { services } from "@/data/services";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Label for the "see all" link at the bottom of a dropdown. */
  allLabel?: string;
};

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    allLabel: "All services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      description: service.shortDescription,
    })),
  },
  {
    label: "Solutions",
    href: "/process",
    allLabel: "How we deliver",
    children: [
      {
        label: "Delivery process",
        href: "/process",
        description: "Discovery to launch and support, in clear milestones you can review.",
      },
      {
        label: "Engagement models",
        href: "/pricing",
        description: "Starter projects, business solutions, and growth and innovation partnerships.",
      },
      {
        label: "Insights",
        href: "/blog",
        description: "Practical writing on software, AI and digital products.",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start a Project", href: "/contact" };

export const footerNav = {
  services: services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  })),
  company: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "Engagement Models", href: "/pricing" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
