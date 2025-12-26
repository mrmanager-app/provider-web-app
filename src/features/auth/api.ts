import { AUTH_ERRORS } from "./constants";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import type {
  OtpResponse,
  VerifyOtpResponse,
  LoginResponse,
  CreateAccountResponse,
} from "./types";

// --- Error Types ---

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export class AuthApiError extends Error {
  code: string;
  field?: string;

  constructor({ code, message, field }: AuthError) {
    super(message);
    this.name = "AuthApiError";
    this.code = code;
    this.field = field;
  }
}

export async function requestOtp(identifier: string): Promise<OtpResponse> {
  console.log("API: requestOtp", identifier);
  try {
    const payload = {
      phone: identifier,
      country: 91,
    };
    const response = await fetch(`${API_URL}/sso/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new AuthApiError({
        code: data.code || "unknown",
        message: data.message || AUTH_ERRORS.unknown,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof AuthApiError) throw error;

    throw new AuthApiError({
      code: "networkError",
      message: AUTH_ERRORS.networkError,
    });
  }
}

export async function verifyOtp(
  identifier: string,
  otp: string,
  verificationId: string,
  authToken: string,
): Promise<VerifyOtpResponse> {
  console.log("API: verifyOtp", { identifier, otp, verificationId });
  try {
    const payload = {
      phone: identifier,
      otp: otp,
      verificationId: verificationId,
    };
    const response = await fetch(`${API_URL}/sso/provider-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new AuthApiError({
        code: data.code || "unknown",
        message: data.message || AUTH_ERRORS.unknown,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof AuthApiError) throw error;

    throw new AuthApiError({
      code: "networkError",
      message: AUTH_ERRORS.networkError,
    });
  }
}

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

export async function completePhoneSignup(
  identifier: string,
): Promise<CreateAccountResponse> {
  // TODO: Replace with actual API call
  console.log("API: completePhoneSignup", { identifier });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}

export function getGoogleOAuthUrl(): string {
  // TODO: Replace with actual OAuth URL from backend
  return "https://www.google.com";
}

export function startGoogleOAuth(): void {
  const url = getGoogleOAuthUrl();
  console.log("Google OAuth URL:", url);
  // window.location.href = url;
}

export async function resendOtp(identifier: string): Promise<OtpResponse> {
  return requestOtp(identifier);
}
