import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * Teach tailwind-merge about the custom type-scale utilities defined in
 * globals.css. Without this it reads `text-display-lg` as a text colour and
 * drops it whenever a real colour class such as `text-fg` is also present.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md", "display-sm", "lead", "statement"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
