"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signupFormSchema } from "../schemas";

interface SignupFormProps {
  onSubmit: (data: {
    emailOrPhone: string;
  }) => void | Promise<void>;
  defaultValues?: { emailOrPhone?: string };
  submitLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SignupForm({
  onSubmit,
  defaultValues,
  submitLabel = "Continue",
  className,
  children,
}: SignupFormProps) {
  const form = useForm({
    defaultValues: {
      emailOrPhone: defaultValues?.emailOrPhone ?? "",
    },
    validators: {
      onChange: signupFormSchema,
      onBlur: signupFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="emailOrPhone">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && field.state.meta.errors.length > 0;
          return (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name} className="text-foreground">
                Email address or mobile number
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Enter your email or mobile number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border-border bg-card"
                aria-invalid={isInvalid}
              />
              {isInvalid && (
                <p className="text-destructive text-sm">
                  {field.state.meta.errors[0]?.message ??
                    String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
            size="lg"
          >
            {isSubmitting ? "Loading..." : submitLabel}
          </Button>
        )}
      </form.Subscribe>

      {children}
    </form>
  );
}
