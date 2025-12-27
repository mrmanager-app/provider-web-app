"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../password-input";
import { passwordFormSchema } from "@/features/auth/schemas";
import { AUTH_MESSAGES } from "@/features/auth/constants";
import { CardHeader } from "@/components/shared/card-header";
import type { PasswordFormProps } from "@/features/auth/types";

export function PasswordForm({
  identifier,
  onSubmit,
  onBack,
  onForgotPassword,
  forgotPasswordHref = "/forgot-password",
  submitLabel = "Continue",
  className,
}: PasswordFormProps) {
  const form = useForm({
    defaultValues: { password: "" },
    validators: {
      onChange: passwordFormSchema,
      onBlur: passwordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.password);
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
      <CardHeader
        title={AUTH_MESSAGES.password.title}
        description={AUTH_MESSAGES.password.getDescription(identifier)}
      />

      <div className="space-y-4">
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && field.state.meta.errors.length > 0;
            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Password
                </Label>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  placeholder="Enter your password"
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

        <div className="flex justify-end">
          {onForgotPassword ? (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-foreground hover:text-foreground/80 text-sm font-medium underline underline-offset-4"
            >
              Forgot Password?
            </button>
          ) : (
            <Link
              href={forgotPasswordHref}
              className="text-foreground hover:text-foreground/80 text-sm font-medium underline underline-offset-4"
            >
              Forgot Password?
            </Link>
          )}
        </div>
      </div>

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

      {onBack && (
        <p className="text-muted-foreground text-center text-sm">
          Unable to verify?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
          >
            Change email.
          </button>
        </p>
      )}
    </form>
  );
}
