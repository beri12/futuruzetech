import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

function post(body: unknown, ip = `198.51.100.${Math.floor(Math.random() * 250)}`) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

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

describe("POST /api/contact", () => {
  it("returns 400 for a malformed body", async () => {
    const response = await post("not json");
    expect(response.status).toBe(400);
  });

  it("returns 422 with field errors for invalid input", async () => {
    const response = await post({ name: "A" });
    expect(response.status).toBe(422);
    const data = await response.json();
    expect(data.fieldErrors.email).toBeDefined();
    expect(data.fieldErrors.consent).toBeDefined();
  });

  it("silently accepts honeypot submissions", async () => {
    const response = await post({ ...valid, website: "http://spam.example" });
    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
  });

  it("reports missing email configuration honestly", async () => {
    const response = await post(valid);
    // In the test environment no Resend credentials are set.
    expect(response.status).toBe(503);
    const data = await response.json();
    expect(data.code).toBe("NOT_CONFIGURED");
  });

  it("rate limits repeated requests from one client", async () => {
    const ip = "192.0.2.77";
    let last = 0;
    for (let i = 0; i < 7; i++) {
      last = (await post({}, ip)).status;
    }
    expect(last).toBe(429);
  });
});
