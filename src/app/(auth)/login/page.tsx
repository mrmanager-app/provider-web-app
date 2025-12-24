"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-+()]{10,}$/;
        return emailRegex.test(val) || phoneRegex.test(val);
      },
      { message: "Please enter a valid email or phone number" },
    ),
});

const Page = () => {
  const form = useForm({
    defaultValues: {
      emailOrPhone: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Login submitted:", value);
      // TODO: Handle login logic
    },
  });

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4">
      <Card className="w-full max-w-lg rounded-[16px] border-none shadow-none">
        <CardHeader className="items-center space-y-2 pb-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Log in to manage your sessions, attendance, and payments.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="emailOrPhone"
              validators={{
                onBlur: ({ value }) => {
                  const result =
                    loginSchema.shape.emailOrPhone.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
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
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-destructive text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                </div>
              )}
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
                  {isSubmitting ? "Loading..." : "Continue"}
                </Button>
              )}
            </form.Subscribe>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                Or Continue with
              </span>
              <Separator className="flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="border-border bg-card gap-3"
              size="lg"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-12 justify-center sm:mt-36">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
