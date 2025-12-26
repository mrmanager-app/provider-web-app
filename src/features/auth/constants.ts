// OTP Configuration
export const OTP_LENGTH = 4;
export const OTP_RESEND_TIMEOUT = 30; // seconds

// Auth messages
export const AUTH_MESSAGES = {
  login: {
    title: "Welcome Back",
    description: "Log in to manage your sessions, attendance, and payments.",
  },
  signup: {
    title: "Create Account",
    description: "Sign up to start managing your sessions and payments.",
  },
  otp: {
    title: "Enter the 4-digit OTP",
    getDescription: (identifier: string) =>
      `We've sent a 4-digit OTP to ${identifier}.`,
  },
  password: {
    title: "Enter your password",
    getDescription: (email: string) =>
      `Enter the password for the account linked to this ${email}`,
  },
  createPassword: {
    title: "Create a password",
    getDescription: (email: string) =>
      `Create a password for your provider account linked to this ${email}`,
  },
} as const;

// Password requirements labels
export const PASSWORD_REQUIREMENT_LABELS = {
  hasMinLength: "At least 8 characters",
  hasUppercase: "1 uppercase",
  hasLowercase: "1 lowercase",
  hasNumber: "1 or more numbers",
  hasSpecialChar: "1 or more special characters",
} as const;

// Error messages
export const AUTH_ERRORS = {
  invalidCredentials: "Invalid email or password",
  invalidOtp: "Invalid OTP. Please try again.",
  expiredOtp: "OTP has expired. Please request a new one.",
  networkError: "Network error. Please try again.",
  tooManyAttempts: "Too many attempts. Please try again later.",
  unknown: "An unknown error occurred. Please try again.",
} as const;
