"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OtpInput } from "../otp-input";
import { useOtpTimer } from "@/features/auth/hooks/use-otp-timer";
import { otpSchema } from "@/features/auth/schemas";
import {
  AUTH_MESSAGES,
  OTP_LENGTH,
  OTP_RESEND_TIMEOUT,
} from "@/features/auth/constants";
import { CardHeader } from "@/components/shared/card-header";
import type { OtpFormProps } from "@/features/auth/types";

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
      <CardHeader
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
