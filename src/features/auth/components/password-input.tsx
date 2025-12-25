"use client";

import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<
  React.ComponentProps<"input">,
  "type"
> {
  showToggle?: boolean;
}

export function PasswordInput({
  className,
  showToggle = true,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-12", className)}
        {...props}
      />
      {showToggle && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 h-10 w-10 -translate-y-1/2 rounded-full"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <IconEyeOff className="text-muted-foreground size-5" />
          ) : (
            <IconEye className="text-muted-foreground size-5" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      )}
    </div>
  );
}
