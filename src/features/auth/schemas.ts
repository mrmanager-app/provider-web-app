import { z } from "zod/v4";

// Regex patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[\d\s\-+()]+$/;

function isValidPhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10;
}

export const emailOrPhoneSchema = z
  .string()
  .min(1, "Email or phone number is required")
  .refine(
    (val) => {
      if (EMAIL_REGEX.test(val)) return true;
      if (PHONE_REGEX.test(val) && isValidPhoneNumber(val)) return true;
      return false;
    },
    {
      message: "Please enter a valid email or phone number",
    },
  );

export const otpSchema = z
  .number()

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

export const fullNameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long");

// Form schemas
export const identifierFormSchema = z.object({
  emailOrPhone: emailOrPhoneSchema,
});

export const passwordFormSchema = z.object({
  password: passwordSchema,
});

export const signupFormSchema = z.object({
  fullName: fullNameSchema,
  emailOrPhone: emailOrPhoneSchema,
});

// Utility functions
export function detectAuthMethod(value: string): "email" | "phone" | null {
  if (EMAIL_REGEX.test(value)) return "email";
  if (PHONE_REGEX.test(value) && isValidPhoneNumber(value)) return "phone";
  return null;
}