"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../password-input";
import { createPasswordFormSchema, isPasswordValid } from "../../schemas";
import { AUTH_MESSAGES } from "../../constants";
import { FormHeader } from "./form-header";
import { PasswordRequirements } from "./password-requirements";
import { IconAlertCircle } from "@tabler/icons-react";
import type { CreatePasswordFormProps } from "../../types";

export function CreatePasswordForm({
  identifier,
  onSubmit,
  submitLabel = "Continue",
  className,
}: CreatePasswordFormProps) {
  const form = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    validators: {
      onChange: createPasswordFormSchema,
      onBlur: createPasswordFormSchema,
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
      <FormHeader
        title={AUTH_MESSAGES.createPassword.title}
        description={AUTH_MESSAGES.createPassword.getDescription(identifier)}
      />

      <div className="space-y-4">
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 &&
              !isPasswordValid(field.state.value);
            const isValid =
              field.state.meta.isTouched && isPasswordValid(field.state.value);
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
                  className={cn(
                    "border-border bg-card",
                    isInvalid && "border-destructive",
                    isValid && "border-green-500",
                  )}
                  aria-invalid={isInvalid}
                  showValid={isValid}
                />
                <PasswordRequirements password={field.state.value} />
              </div>
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            const passwordValue = form.getFieldValue("password");
            const hasValue = field.state.value.length > 0;
            const isMatch = hasValue && field.state.value === passwordValue;
            const isMismatch = hasValue && field.state.value !== passwordValue;

            return (
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-foreground">
                  Confirm Password
                </Label>
                <PasswordInput
                  id={field.name}
                  name={field.name}
                  placeholder="Re-enter password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className={cn(
                    "border-border bg-card",
                    isMismatch && "border-destructive",
                    isMatch && "border-green-500",
                  )}
                  aria-invalid={isMismatch}
                />
                {isMismatch && (
                  <p className="text-destructive flex items-center gap-1 text-sm">
                    <IconAlertCircle className="size-4" />
                    Passwords Don&apos;t Match
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>
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
    </form>
  );
}
