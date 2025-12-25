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
  .string()
  .length(4, "OTP must be 4 digits")
  .regex(/^\d+$/, "OTP must contain only digits");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

// Password validation requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
} as const;

export function validatePasswordRequirements(password: string) {
  return {
    hasMinLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
    hasUppercase: PASSWORD_REQUIREMENTS.hasUppercase.test(password),
    hasLowercase: PASSWORD_REQUIREMENTS.hasLowercase.test(password),
    hasNumber: PASSWORD_REQUIREMENTS.hasNumber.test(password),
    hasSpecialChar: PASSWORD_REQUIREMENTS.hasSpecialChar.test(password),
  };
}

export function isPasswordValid(password: string): boolean {
  const reqs = validatePasswordRequirements(password);
  return Object.values(reqs).every(Boolean);
}

export const createPasswordFormSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't Match",
    path: ["confirmPassword"],
  })
  .refine((data) => isPasswordValid(data.password), {
    message: "Password does not meet requirements",
    path: ["password"],
  });

// Form schemas
export const identifierFormSchema = z.object({
  emailOrPhone: emailOrPhoneSchema,
});

export const passwordFormSchema = z.object({
  password: passwordSchema,
});

export const signupFormSchema = z.object({
  emailOrPhone: emailOrPhoneSchema,
});

// Utility functions
export function detectAuthMethod(value: string): "email" | "phone" | null {
  if (EMAIL_REGEX.test(value)) return "email";
  if (PHONE_REGEX.test(value) && isValidPhoneNumber(value)) return "phone";
  return null;
}
