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
    title: "Enter the 4-digit OTP sent to your Mobile",
    getDescription: (phone: string) => `We've sent 4-digit OTP to ${phone}.`,
  },
  password: {
    title: "Enter your password",
    getDescription: (email: string) =>
      `Enter the password for the account linked to this ${email}`,
  },
} as const;

// Error messages
export const AUTH_ERRORS = {
  invalidCredentials: "Invalid email or password",
  invalidOtp: "Invalid OTP. Please try again.",
  expiredOtp: "OTP has expired. Please request a new one.",
  networkError: "Network error. Please try again.",
  tooManyAttempts: "Too many attempts. Please try again later.",
} as const;
