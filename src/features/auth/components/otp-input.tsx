"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { OTP_LENGTH } from "../constants";
import { IconInfoCircle } from "@tabler/icons-react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

export function OtpInput({
  value,
  onChange,
  onComplete,
  length = OTP_LENGTH,
  disabled = false,
  hasError = false,
  className,
}: OtpInputProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue);

    // Trigger onComplete when all digits are entered
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <InputOTP
        value={value}
        onChange={handleChange}
        maxLength={length}
        disabled={disabled}
        aria-invalid={hasError}
      >
        <InputOTPGroup className={cn("gap-3")}>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={cn(
                "size-14 rounded-lg border text-lg font-medium first:rounded-lg last:rounded-lg",
                hasError && "border-destructive",
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {hasError && (
        <div className="text-destructive flex items-center gap-1 text-sm">
          <IconInfoCircle size={16} />
          <span className="text-xs font-normal">Incorrect OTP. Try again.</span>
        </div>
      )}
    </div>
  );
}
