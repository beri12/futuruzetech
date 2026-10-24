"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  budgetOptions,
  contactSchema,
  serviceOptions,
  timelineOptions,
  type ContactInput,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; code?: string };

const validServiceValues = new Set<string>(serviceOptions.map((option) => option.value));

/**
 * Project inquiry form. Client-side validation with the shared Zod schema,
 * accessible error messages, honeypot, and explicit loading, success and
 * failure states. Submission goes to /api/contact, which validates again.
 */
export function ContactForm({ defaultService }: { defaultService?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: validServiceValues.has(defaultService ?? "") ? defaultService : "not-sure",
      budget: "discuss",
      timeline: "exploring",
      message: "",
      website: "",
    },
  });

  // Allow deep links such as /contact?service=ai-development without
  // reading searchParams on the server.
  useEffect(() => {
    if (defaultService) return;
    try {
      const fromQuery = new URLSearchParams(window.location.search).get("service");
      if (fromQuery && validServiceValues.has(fromQuery)) {
        setValue("service", fromQuery);
      }
    } catch {
      /* ignore */
    }
  }, [defaultService, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        code?: string;
        fieldErrors?: Record<string, string>;
      };

      if (response.ok && data.ok) {
        setStatus({ state: "success" });
        reset();
        return;
      }

      if (data.fieldErrors) {
        for (const [field, message] of Object.entries(data.fieldErrors)) {
          setError(field as keyof ContactInput, { type: "server", message });
        }
      }
      setStatus({
        state: "error",
        message: data.error ?? "Something went wrong. Please try again.",
        code: data.code,
      });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  });

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface-2 p-8"
      >
        <CheckCircle2 aria-hidden="true" size={32} className="text-brand" />
        <h3 className="text-2xl font-semibold">Thanks, your inquiry is on its way.</h3>
        <p className="max-w-[520px] text-[15px] leading-relaxed text-fg-muted">
          We&rsquo;ll read it carefully and reply within two working days. If it&rsquo;s urgent, mention it
          in a follow-up and we&rsquo;ll prioritize accordingly.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setStatus({ state: "idle" })}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status.state === "error" ? `${id}-form-error` : undefined}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px] rounded-2xl border border-line bg-surface-2 p-[clamp(24px,3vw,36px)]"
    >
      <Field id={`${id}-name`} label="Full name" error={errors.name?.message}>
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className="field"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          {...register("name")}
        />
      </Field>

      <Field id={`${id}-email`} label="Business email" error={errors.email?.message}>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className="field"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          {...register("email")}
        />
      </Field>

      <Field id={`${id}-company`} label="Company or organization" hint="Optional" error={errors.company?.message}>
        <input
          id={`${id}-company`}
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          className="field"
          aria-invalid={Boolean(errors.company)}
          {...register("company")}
        />
      </Field>

      <Field id={`${id}-service`} label="Service required" error={errors.service?.message}>
        <select
          id={`${id}-service`}
          className="field"
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? `${id}-service-error` : undefined}
          {...register("service")}
        >
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-budget`} label="Estimated budget range" error={errors.budget?.message}>
        <select
          id={`${id}-budget`}
          className="field"
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? `${id}-budget-error` : undefined}
          {...register("budget")}
        >
          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-timeline`} label="Project timeline" error={errors.timeline?.message}>
        <select
          id={`${id}-timeline`}
          className="field"
          aria-invalid={Boolean(errors.timeline)}
          aria-describedby={errors.timeline ? `${id}-timeline-error` : undefined}
          {...register("timeline")}
        >
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={`${id}-message`}
        label="Project description"
        error={errors.message?.message}
        className="col-span-full"
      >
        <textarea
          id={`${id}-message`}
          rows={5}
          placeholder="What are you building, who is it for, and what should it achieve?"
          className="field min-h-[140px] resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: hidden from people, visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="col-span-full flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-brand"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
            {...register("consent")}
          />
          <label htmlFor={`${id}-consent`} className="text-[13px] leading-relaxed text-fg-muted">
            I agree that {siteConfig.name} may contact me about this inquiry and store my details as
            described in the{" "}
            <a href="/privacy-policy" className="text-fg underline underline-offset-2 hover:text-brand-bright">
              privacy policy
            </a>
            .
          </label>
        </div>
        {errors.consent?.message ? (
          <p id={`${id}-consent-error`} role="alert" className="text-[13px] text-error-soft">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      {status.state === "error" ? (
        <div
          id={`${id}-form-error`}
          role="alert"
          className="col-span-full flex items-start gap-3 rounded-md border border-error/40 bg-error/10 p-4 text-sm text-fg"
        >
          <AlertCircle aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-error-soft" />
          <div className="flex flex-col gap-1">
            <span>{status.message}</span>
            {status.code === "NOT_CONFIGURED" && siteConfig.contact.email ? (
              <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-brand hover:text-brand-bright">
                {siteConfig.contact.email}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="col-span-full flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" icon={submitting ? "none" : "arrow"} disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" size={16} className="animate-spin" />
              Sending
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
        <span className="text-[13px] text-fg-dim">
          No spam. Your details are used only to respond to your inquiry.
        </span>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-[13px] font-medium text-fg-soft">
        {label}
        {hint ? <span className="text-xs font-normal text-fg-dim">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-error-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
}
