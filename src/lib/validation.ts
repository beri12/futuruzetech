import { z } from "zod";
import { services } from "@/data/services";
import { engagementModels } from "@/data/engagement";

/**
 * Contact form options. Kept here so the client form, the server schema and
 * the email template all agree. Budget ranges are deliberately broad bands
 * for the client to self-select; they are not price offers.
 */
export const serviceOptions = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  ...engagementModels.map((model) => ({ value: model.slug, label: `${model.name} (engagement model)` })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const budgetOptions = [
  { value: "discuss", label: "Prefer to discuss" },
  { value: "under-5k", label: "Under USD 5,000" },
  { value: "5k-20k", label: "USD 5,000 to 20,000" },
  { value: "20k-50k", label: "USD 20,000 to 50,000" },
  { value: "over-50k", label: "Over USD 50,000" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1 to 3 months" },
  { value: "3-6-months", label: "Within 3 to 6 months" },
  { value: "exploring", label: "Exploring options" },
] as const;

const serviceValues = serviceOptions.map((option) => option.value) as [string, ...string[]];
const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];
const timelineValues = timelineOptions.map((option) => option.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.email("Please enter a valid email address.").trim().max(200),
  company: z.string().trim().max(160, "Company name is too long.").optional().or(z.literal("")),
  service: z.enum(serviceValues, { message: "Please choose a service." }),
  budget: z.enum(budgetValues, { message: "Please choose a budget range." }),
  timeline: z.enum(timelineValues, { message: "Please choose a timeline." }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(4000, "Please keep the description under 4,000 characters."),
  consent: z.literal(true, { message: "Please confirm that we may contact you." }),
  /** Honeypot: real users never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().max(200),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export function labelFor(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((option) => option.value === value)?.label ?? value;
}
