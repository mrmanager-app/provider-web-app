import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { OtpInput } from "./otp-input";
import { PasswordInput } from "./password-input";
import { useOtpTimer } from "../hooks/use-otp-timer";
import {
  identifierFormSchema,
  passwordFormSchema,
  otpSchema,
} from "../schemas";
import { AUTH_MESSAGES, OTP_LENGTH, OTP_RESEND_TIMEOUT } from "../constants";
import type {
  FormHeaderProps,
  IdentifierFormProps,
  OtpFormProps,
  PasswordFormProps,
} from "../types";

function FormHeader({ title, description, className }: FormHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h2 className="text-[32px] font-medium">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

// ============================================
// IDENTIFIER FORM (Email/Phone)
// ============================================

export function IdentifierForm({
  onSubmit,
  defaultValue = "",
  label = "Email address or mobile number",
  placeholder = "Enter your email or mobile number",
  submitLabel = "Continue",
  className,
}: IdentifierFormProps) {
  const form = useForm({
    defaultValues: { emailOrPhone: defaultValue },
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
            {isSubmitting ? "Loading..." : submitLabel}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

// ============================================
// OTP FORM
// ============================================

export function OtpForm({
  identifier,
  onSubmit,
  onResend,
  onBack,
  className,
}: OtpFormProps) {
  const [otp, setOtp] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const timer = useOtpTimer(OTP_RESEND_TIMEOUT);

  const isOtpComplete = otp.length === OTP_LENGTH;

  const handleSubmit = async () => {
    const result = otpSchema.safeParse(otp);
    if (!result.success) {
      setHasError(true);
      return;
    }

    setIsSubmitting(true);
    setHasError(false);
    try {
      await onSubmit(otp);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!timer.canResend) return;
    await onResend();
    timer.startTimer();
    setOtp("");
    setHasError(false);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FormHeader
        title={AUTH_MESSAGES.otp.title}
        description={AUTH_MESSAGES.otp.getDescription(identifier)}
      />

      <OtpInput
        value={otp}
        onChange={(value) => {
          setOtp(value);
          setHasError(false);
        }}
        hasError={hasError}
        disabled={isSubmitting}
      />

      {isOtpComplete && !hasError ? (
        <Button
          type="button"
          variant="default"
          size="lg"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          {isSubmitting ? "Verifying..." : "Verify & Continue"}
        </Button>
      ) : (
        <Button
          type="button"
          size="lg"
          disabled={!timer.canResend || isSubmitting}
          onClick={handleResend}
        >
          {timer.canResend
            ? "Resend OTP"
            : `Resend OTP (${timer.formattedTime})`}
        </Button>
      )}

      {onBack && (
        <p className="text-muted-foreground text-center text-sm">
          Unable to verify?{" "}
          <button
            type="button"
            onClick={onBack}
            className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
          >
            Change mobile no.
          </button>
        </p>
      )}
    </div>
  );
}

// ============================================
// PASSWORD FORM
// ============================================

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
      <FormHeader
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
            <a
              href={forgotPasswordHref}
              className="text-foreground hover:text-foreground/80 text-sm font-medium underline underline-offset-4"
            >
              Forgot Password?
            </a>
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
