"use client";

import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Root Component
interface AuthCardRootProps {
  children: React.ReactNode;
  className?: string;
}

function AuthCardRoot({ children, className }: AuthCardRootProps) {
  return (
    <div className="my-14 flex w-full flex-1 items-center justify-center px-4">
      <Card
        className={cn(
          "h-full w-full max-w-lg justify-between rounded-3xl border-none shadow-none",
          className,
        )}
      >
        {children}
      </Card>
    </div>
  );
}

// Header Component
interface AuthCardHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

function AuthCardHeader({
  title,
  description,
  className,
}: AuthCardHeaderProps) {
  return (
    <CardHeader
      className={cn("items-center space-y-2 pb-2 text-center", className)}
    >
      <CardTitle className="text-2xl font-semibold tracking-tight">
        {title}
      </CardTitle>
      {description && (
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      )}
    </CardHeader>
  );
}

// Body Component (wraps content)
interface AuthCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

function AuthCardBody({ children, className }: AuthCardBodyProps) {
  return (
    <CardContent className={cn("pt-6", className)}>{children}</CardContent>
  );
}

// Footer Component with nav link
interface AuthCardFooterProps {
  variant: "login" | "signup";
  className?: string;
}

function AuthCardFooter({ variant, className }: AuthCardFooterProps) {
  return (
    <CardFooter className={cn("justify-center", className)}>
      <p className="text-muted-foreground text-sm">
        {variant === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
            >
              Log in
            </Link>
          </>
        )}
      </p>
    </CardFooter>
  );
}

// Custom Footer for more control
interface AuthCardCustomFooterProps {
  children: React.ReactNode;
  className?: string;
}

function AuthCardCustomFooter({
  children,
  className,
}: AuthCardCustomFooterProps) {
  return (
    <CardFooter className={cn("mt-12 justify-center sm:mt-36", className)}>
      {children}
    </CardFooter>
  );
}

// Back Link Component
interface AuthCardBackLinkProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

function AuthCardBackLink({
  onClick,
  label = "Change",
  className,
}: AuthCardBackLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-foreground hover:text-foreground/80 text-sm font-medium underline underline-offset-4",
        className,
      )}
    >
      {label}
    </button>
  );
}

// Export compound component
export {
  AuthCardRoot,
  AuthCardHeader,
  AuthCardBody,
  AuthCardFooter,
  AuthCardCustomFooter,
  AuthCardBackLink,
};
