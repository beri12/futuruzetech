"use client";

import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = { state: "idle" | "submitting" | "success" } | { state: "error"; message: string };

/**
 * Newsletter signup. Rendered only when NEXT_PUBLIC_NEWSLETTER_ENABLED is
 * "true", so the site never shows a signup that cannot work.
 */
export function NewsletterForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [email, setEmail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const website = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (response.ok && data.ok) {
        setStatus({ state: "success" });
        setEmail("");
      } else {
        setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  if (status.state === "success") {
    return (
      <p role="status" className="text-sm text-fg">
        Thanks, you&rsquo;re subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      <label htmlFor={`${id}-email`} className="text-[13px] font-medium text-fg-soft">
        Get new articles by email
      </label>
      <div className="flex flex-wrap gap-2.5">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field min-w-0 flex-1 basis-[220px]"
          aria-invalid={status.state === "error"}
          aria-describedby={status.state === "error" ? `${id}-error` : undefined}
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${id}-website`}>Website</label>
          <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" size="sm" disabled={status.state === "submitting"} aria-busy={status.state === "submitting"}>
          {status.state === "submitting" ? <Loader2 aria-hidden="true" size={14} className="animate-spin" /> : null}
          Subscribe
        </Button>
      </div>
      {status.state === "error" ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-error-soft">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
