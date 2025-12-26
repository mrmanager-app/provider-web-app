"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { identifierFormSchema } from "../../schemas";
import type { IdentifierFormProps } from "../../types";
import { IconLoader2 } from "@tabler/icons-react";

export function IdentifierForm({
  onSubmit,
  label = "Email address or mobile number",
  placeholder = "Enter your email or mobile number",
  className,
}: IdentifierFormProps) {
  const form = useForm({
    defaultValues: { emailOrPhone: "" },
    validators: {
      onChange: identifierFormSchema,
      onBlur: identifierFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.emailOrPhone);
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
                {label}
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder={placeholder}
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
            {isSubmitting ? (
              <>
                Loading
                <IconLoader2 className="size-4 animate-spin" />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
