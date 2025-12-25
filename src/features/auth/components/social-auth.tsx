"use client";

import * as React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Root Component
interface SocialAuthRootProps {
  children: React.ReactNode;
  className?: string;
}

function SocialAuthRoot({ children, className }: SocialAuthRootProps) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
}

// Divider Component
interface SocialAuthDividerProps {
  text?: string;
  className?: string;
}

function SocialAuthDivider({
  text = "Or Continue with",
  className,
}: SocialAuthDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Separator className="flex-1" />
      <span className="text-muted-foreground text-sm whitespace-nowrap">
        {text}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}

// Google Button Component
interface GoogleButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

function GoogleButton({ onClick, isLoading, className }: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("border-border bg-card gap-3", className)}
      size="lg"
      onClick={onClick}
      disabled={isLoading}
    >
      <IconBrandGoogle className="size-5" />
      <span>Continue with Google</span>
    </Button>
  );
}

// Provider Buttons Container
interface ProviderButtonsProps {
  children: React.ReactNode;
  className?: string;
}

function ProviderButtons({ children, className }: ProviderButtonsProps) {
  return <div className={cn("flex flex-col gap-3", className)}>{children}</div>;
}

// Export compound component
export { SocialAuthRoot, SocialAuthDivider, GoogleButton, ProviderButtons };
