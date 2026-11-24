import { afterEach, describe, expect, it, vi } from "vitest";

const send = vi.fn(async () => ({ data: { id: "test-id" }, error: null }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

const input = {
  name: "Test <Person>",
  email: "client@example.com",
  company: "Acme",
  service: "web-development",
  budget: "discuss",
  timeline: "exploring",
  message: "We need a new website for our logistics company with online booking.",
  consent: true as const,
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  send.mockClear();
});

describe("sendContactEmail", () => {
  it("delivers inquiries to the default inbox with reply-to set to the client", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_EMAIL", "");
    vi.stubEnv("EMAIL_FROM", "");
    const { sendContactEmail, isEmailConfigured } = await import("@/lib/email");

    expect(isEmailConfigured()).toBe(true);
    await sendContactEmail(input);

    const message = (send.mock.calls[0] as unknown as [Record<string, unknown>])[0];
    expect(message.to).toEqual(["bekerberiso@gmail.com"]);
    expect(message.from).toBe("Futurize Technology <onboarding@resend.dev>");
    expect(message.replyTo).toBe("client@example.com");
    expect(message.subject).toContain("Test <Person> (Acme)");
    expect(message.html).toContain("Test &lt;Person&gt;");
    expect(message.html).not.toContain("<Person>");
  });

  it("uses CONTACT_EMAIL when it is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_EMAIL", "other@example.com");
    const { sendContactEmail } = await import("@/lib/email");
    await sendContactEmail(input);
    expect((send.mock.calls[0] as unknown as [Record<string, unknown>])[0].to).toEqual(["other@example.com"]);
  });
});
