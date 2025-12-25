import { AUTH_ERRORS } from "./constants";

// --- Error Types ---

export interface AuthError {
  code: keyof typeof AUTH_ERRORS | "unknown";
  message: string;
  field?: string;
}

export class AuthApiError extends Error {
  code: AuthError["code"];
  field?: string;

  constructor({ code, message, field }: AuthError) {
    super(message);
    this.name = "AuthApiError";
    this.code = code;
    this.field = field;
  }
}

// --- Response Types ---

export interface OtpResponse {
  success: boolean;
}

export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
}

export interface CreateAccountResponse {
  success: boolean;
  token?: string;
}

// --- API Functions ---

/**
 * Request an OTP to be sent to the identifier (email or phone).
 */
export async function requestOtp(identifier: string): Promise<OtpResponse> {
  // TODO: Replace with actual API call
  console.log("API: requestOtp", identifier);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Placeholder success
  return { success: true };
}

/**
 * Verify the OTP code sent to the identifier.
 */
export async function verifyOtp(
  identifier: string,
  otp: string,
): Promise<VerifyOtpResponse> {
  // TODO: Replace with actual API call
  console.log("API: verifyOtp", { identifier, otp });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Placeholder: reject invalid OTP for demo
  if (otp === "0000") {
    throw new AuthApiError({
      code: "invalidOtp",
      message: AUTH_ERRORS.invalidOtp,
    });
  }

  return { success: true };
}

/**
 * Login with email/phone and password.
 */
export async function loginWithPassword(
  identifier: string,
  password: string,
): Promise<LoginResponse> {
  // TODO: Replace with actual API call
  console.log("API: loginWithPassword", { identifier });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Placeholder success
  return { success: true };
}

/**
 * Create a new account with email and password.
 */
export async function createAccountEmail(
  identifier: string,
  password: string,
): Promise<CreateAccountResponse> {
  // TODO: Replace with actual API call
  console.log("API: createAccountEmail", { identifier });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Placeholder success
  return { success: true };
}

/**
 * Complete phone signup (after OTP verification).
 */
export async function completePhoneSignup(
  identifier: string,
): Promise<CreateAccountResponse> {
  // TODO: Replace with actual API call
  console.log("API: completePhoneSignup", { identifier });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}

/**
 * Initiate Google OAuth flow.
 * Returns the URL to redirect to for OAuth.
 */
export function getGoogleOAuthUrl(): string {
  // TODO: Replace with actual OAuth URL from backend
  return "/api/auth/google";
}

/**
 * Start Google OAuth by redirecting to the OAuth URL.
 */
export function startGoogleOAuth(): void {
  const url = getGoogleOAuthUrl();
  window.location.href = url;
}

/**
 * Resend OTP to the identifier.
 */
export async function resendOtp(identifier: string): Promise<OtpResponse> {
  // Reuse the requestOtp function
  return requestOtp(identifier);
}
