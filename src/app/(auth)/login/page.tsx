"use client";

import {
  AuthCardRoot,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
} from "@/features/auth/components/auth-card";
import { useAuthFlow } from "@/features/auth/hooks/use-auth-flow";
import {
  IdentifierForm,
  OtpForm,
  PasswordForm,
} from "@/features/auth/components/auth-form";
import {
  SocialAuthRoot,
  SocialAuthDivider,
  GoogleButton,
  ProviderButtons,
} from "@/features/auth/components/social-auth";
import { AUTH_MESSAGES } from "@/features/auth/constants";

export default function LoginPage() {
  const { state, handleIdentifierSubmit, reset } = useAuthFlow();

  const handlePasswordSubmit = async (password: string) => {
    console.log("Password submitted:", password, "for:", state.identifier);
    // TODO: Authenticate with backend
  };

  const handleOtpSubmit = async (otp: string) => {
    console.log("OTP submitted:", otp);
    // TODO: Verify OTP with backend
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", state.identifier);
    // TODO: Resend OTP
  };

  const handleGoogleLogin = () => {
    console.log("Google login initiated");
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

  // Password step
  if (state.step === "password") {
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
  }

  // Identifier step (default)
  return (
    <AuthCardRoot>
      <div className="flex flex-col gap-12">
        <AuthCardHeader
          title={AUTH_MESSAGES.login.title}
          description={AUTH_MESSAGES.login.description}
        />
        <AuthCardBody>
          <IdentifierForm onSubmit={handleIdentifierSubmit} />
          <SocialAuthRoot className="mt-6">
            <SocialAuthDivider />
            <ProviderButtons>
              <GoogleButton onClick={handleGoogleLogin} />
            </ProviderButtons>
          </SocialAuthRoot>
        </AuthCardBody>
      </div>
      <AuthCardFooter variant="login" />
    </AuthCardRoot>
  );
}
