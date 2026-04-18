"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const signupSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
  org: z.string().min(2, "Pick an org name"),
});

type SignupFormState = z.infer<typeof signupSchema>;

type FieldErrors = Partial<Record<keyof SignupFormState, string>>;

export function SignupForm({ className }: { className?: string }) {
  const [values, setValues] = useState<SignupFormState>({
    name: "",
    email: "",
    password: "",
    org: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof SignupFormState>(key: K, value: SignupFormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as keyof SignupFormState | undefined;
        if (path) next[path] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    toast.success("Account created", {
      description: `Welcome to Orbit, ${parsed.data.name}.`,
    });
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-sm", className)}>
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="signup-name">Full name</FieldLabel>
            <Input
              id="signup-name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              required
            />
            {errors.name ? <FieldError>{errors.name}</FieldError> : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-email">Work email</FieldLabel>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              required
            />
            <FieldDescription>We'll send a verification link.</FieldDescription>
            {errors.email ? <FieldError>{errors.email}</FieldError> : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
              aria-invalid={Boolean(errors.password)}
              required
            />
            <FieldDescription>Minimum 8 characters, mix letters + numbers.</FieldDescription>
            {errors.password ? <FieldError>{errors.password}</FieldError> : null}
          </Field>

          <FieldSeparator>Organisation</FieldSeparator>

          <Field>
            <FieldLabel htmlFor="signup-org">Org name</FieldLabel>
            <Input
              id="signup-org"
              value={values.org}
              onChange={(e) => update("org", e.target.value)}
              aria-invalid={Boolean(errors.org)}
              required
            />
            <FieldDescription>
              Used for the URL slug — you can rename later in settings.
            </FieldDescription>
            {errors.org ? <FieldError>{errors.org}</FieldError> : null}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
