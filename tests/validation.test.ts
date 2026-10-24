import { describe, expect, it } from "vitest";
import { contactSchema, newsletterSchema } from "@/lib/validation";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  company: "",
  service: "web-development",
  budget: "discuss",
  timeline: "exploring",
  message: "We need a new website for our logistics company with online booking.",
  consent: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a complete inquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects missing consent", () => {
    const result = contactSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a short message and an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, message: "short", email: "nope" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain("message");
      expect(paths).toContain("email");
    }
  });

  it("rejects unknown service values", () => {
    expect(contactSchema.safeParse({ ...valid, service: "something-else" }).success).toBe(false);
  });

  it("trims whitespace", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Test Person  " });
    expect(result.success && result.data.name).toBe("Test Person");
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.co" }).success).toBe(true);
  });
  it("rejects an invalid email", () => {
    expect(newsletterSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
  });
});
