"use client";

import * as React from "react";
import {
  AuthCardRoot,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
} from "@/features/auth/components/auth-card";
import { OtpForm, PasswordForm } from "@/features/auth/components/auth-form";
import {
  SocialAuthRoot,
  SocialAuthDivider,
  GoogleButton,
  ProviderButtons,
} from "@/features/auth/components/social-auth";
import { AUTH_MESSAGES } from "@/features/auth/constants";
import { useAuthFlow } from "@/features/auth/hooks/use-auth-flow";
import { detectAuthMethod } from "@/features/auth/schemas";
import { SignupForm } from "@/features/auth/components/signup-form";

export default function SignupPage() {
  const { state, setIdentifier, setMethod, goToStep, reset } = useAuthFlow();
  const [fullName, setFullName] = React.useState("");

  const handleSignupSubmit = (data: {
    fullName: string;
    emailOrPhone: string;
  }) => {
    const method = detectAuthMethod(data.emailOrPhone);
    if (!method) return;

    setFullName(data.fullName);
    setIdentifier(data.emailOrPhone);
    setMethod(method);
    goToStep(method === "phone" ? "otp" : "password");

    console.log("Signup initiated:", data);
    // TODO: Send OTP or proceed to password creation
  };

  const handleOtpSubmit = async (otp: string) => {
    console.log("OTP verified:", otp, "for:", state.identifier);
    // TODO: Verify OTP and create account
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", state.identifier);
    // TODO: Resend OTP
  };

  const handlePasswordSubmit = async (password: string) => {
    console.log("Creating account with password:", {
      fullName,
      email: state.identifier,
      password,
    });
    // TODO: Create account with backend
  };

  const handleGoogleSignup = () => {
    console.log("Google signup initiated");
    // TODO: Implement Google OAuth
  };

  // OTP verification step
  if (state.step === "otp") {
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
  }

  // Password creation step
  if (state.step === "password") {
    return (
      <AuthCardRoot>
        <AuthCardBody>
          <PasswordForm
            identifier={state.identifier}
            onSubmit={handlePasswordSubmit}
            onBack={reset}
            submitLabel="Create Account"
          />
        </AuthCardBody>
      </AuthCardRoot>
    );
  }

  // Signup form (default)
  return (
    <AuthCardRoot>
      <div className="flex flex-col gap-12">
        <AuthCardHeader
          title={AUTH_MESSAGES.signup.title}
          description={AUTH_MESSAGES.signup.description}
        />
        <AuthCardBody>
          <SignupForm onSubmit={handleSignupSubmit}>
            <SocialAuthRoot>
              <SocialAuthDivider />
              <ProviderButtons>
                <GoogleButton onClick={handleGoogleSignup} />
              </ProviderButtons>
            </SocialAuthRoot>
          </SignupForm>
        </AuthCardBody>
      </div>
      <AuthCardFooter variant="signup" />
    </AuthCardRoot>
  );
}
