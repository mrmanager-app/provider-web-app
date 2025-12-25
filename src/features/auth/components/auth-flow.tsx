"use client";

import * as React from "react";
import {
  AuthCardRoot,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
} from "./auth-card";
import { OtpForm } from "./forms/otp-form";
import { CreatePasswordForm } from "./forms/create-password-form";
import { PasswordForm } from "./forms/password-form";
import { IdentifierForm } from "./forms/identifier-form";
import {
  SocialAuthRoot,
  SocialAuthDivider,
  GoogleButton,
  ProviderButtons,
} from "./social-auth";
import { useAuthFlow } from "../hooks/use-auth-flow";
import { detectAuthMethod } from "../schemas";
import { AUTH_MESSAGES } from "../constants";
import {
  requestOtp,
  verifyOtp,
  resendOtp,
  loginWithPassword,
  createAccountEmail,
  completePhoneSignup,
  startGoogleOAuth,
} from "../api";

export type AuthVariant = "login" | "signup";

interface AuthFlowProps {
  variant: AuthVariant;
}

export function AuthFlow({ variant }: AuthFlowProps) {
  const { state, setIdentifier, setMethod, goToStep, reset } = useAuthFlow();

  // --- Handlers ---

  const handleIdentifierSubmit = React.useCallback(
    async (identifier: string) => {
      const method = detectAuthMethod(identifier);
      if (!method) return;

      setIdentifier(identifier);
      setMethod(method);

      if (variant === "login") {
        // Login: email → password, phone → otp
        if (method === "phone") {
          await requestOtp(identifier);
        }
        goToStep(method === "phone" ? "otp" : "password");
      } else {
        // Signup: always go to OTP first for verification
        await requestOtp(identifier);
        goToStep("otp");
      }
    },
    [variant, setIdentifier, setMethod, goToStep],
  );

  const handleOtpSubmit = React.useCallback(
    async (otp: string) => {
      await verifyOtp(state.identifier, otp);

      if (variant === "signup" && state.method === "email") {
        // For email signup, proceed to password creation after OTP
        goToStep("password");
      } else if (variant === "signup" && state.method === "phone") {
        // For phone signup, complete flow
        await completePhoneSignup(state.identifier);
        // TODO: Redirect to dashboard or success page
      } else {
        // For login OTP, complete flow
        // TODO: Redirect to dashboard
      }
    },
    [variant, state.identifier, state.method, goToStep],
  );

  const handleResendOtp = React.useCallback(async () => {
    await resendOtp(state.identifier);
  }, [state.identifier]);

  const handlePasswordSubmit = React.useCallback(
    async (password: string) => {
      if (variant === "login") {
        await loginWithPassword(state.identifier, password);
        // TODO: Redirect to dashboard
      } else {
        await createAccountEmail(state.identifier, password);
        // TODO: Redirect to dashboard or success page
      }
    },
    [variant, state.identifier],
  );

  const handleGoogleAuth = React.useCallback(() => {
    startGoogleOAuth();
  }, []);

  // --- Step rendering ---

  const renderStep = (): React.ReactNode => {
    switch (state.step) {
      case "otp":
        return (
          <AuthCardRoot>
            <AuthCardBody>
              <OtpForm
                identifier={state.identifier}
                onSubmit={handleOtpSubmit}
                onResend={handleResendOtp}
                onBack={reset}
              />
            </AuthCardBody>
          </AuthCardRoot>
        );

      case "password":
        // In signup flow, use CreatePasswordForm; in login, use PasswordForm
        if (variant === "signup") {
          return (
            <AuthCardRoot>
              <AuthCardBody>
                <CreatePasswordForm
                  identifier={state.identifier}
                  onSubmit={handlePasswordSubmit}
                  submitLabel="Create Account"
                />
              </AuthCardBody>
            </AuthCardRoot>
          );
        }
        return (
          <AuthCardRoot>
            <AuthCardBody>
              <PasswordForm
                identifier={state.identifier}
                onSubmit={handlePasswordSubmit}
                onBack={reset}
              />
            </AuthCardBody>
          </AuthCardRoot>
        );

      case "identifier":
      default:
        return (
          <AuthCardRoot>
            <div className="flex flex-col gap-12">
              <AuthCardHeader
                title={AUTH_MESSAGES[variant].title}
                description={AUTH_MESSAGES[variant].description}
              />
              <AuthCardBody>
                <IdentifierForm onSubmit={handleIdentifierSubmit} />
                <SocialAuthRoot className="mt-6">
                  <SocialAuthDivider />
                  <ProviderButtons>
                    <GoogleButton onClick={handleGoogleAuth} />
                  </ProviderButtons>
                </SocialAuthRoot>
              </AuthCardBody>
            </div>
            <AuthCardFooter variant={variant} />
          </AuthCardRoot>
        );
    }
  };

  return <>{renderStep()}</>;
}
