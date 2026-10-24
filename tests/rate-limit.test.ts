import { describe, expect, it } from "vitest";
import { clientKey, rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows up to the limit and then blocks", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(rateLimit(key, 3, 60_000).ok).toBe(true);
    }
    const blocked = rateLimit(key, 3, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("keys separate clients independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    expect(rateLimit(a, 1, 60_000).ok).toBe(true);
    expect(rateLimit(a, 1, 60_000).ok).toBe(false);
    expect(rateLimit(b, 1, 60_000).ok).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first forwarded address", () => {
    const request = new Request("http://localhost/api/contact", {
      headers: { "x-forwarded-for": "203.0.113.5, 10.0.0.1" },
    });
    expect(clientKey(request)).toBe("203.0.113.5");
  });

  it("falls back to unknown", () => {
    expect(clientKey(new Request("http://localhost/api/contact"))).toBe("unknown");
  });
});
