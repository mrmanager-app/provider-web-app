"use client";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
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
  loginWithPassword,
  createAccountEmail,
  completePhoneSignup,
  startGoogleOAuth,
} from "../api";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "@/lib/actions";

export type AuthVariant = "login" | "signup";

interface AuthFlowProps {
  variant: AuthVariant;
}

export function AuthFlow({ variant }: AuthFlowProps) {
  const { state, setIdentifier, setMethod, setOtpData, goToStep, reset } =
    useAuthFlow();
  const router = useRouter();
  const requestOtpMutation = useMutation({ mutationFn: requestOtp });
  const verifyOtpMutation = useMutation({
    mutationFn: (params: {
      identifier: string;
      otp: string;
      verificationId: string;
      authToken: string;
    }) =>
      verifyOtp(
        params.identifier,
        params.otp,
        params.verificationId,
        params.authToken,
      ),

    onSuccess: async (data) => {
      await setAuthCookie(data.token);
      router.push("/dashboard");
    },
  });
  const loginWithPasswordMutation = useMutation({
    mutationFn: (params: { identifier: string; password: string }) =>
      loginWithPassword(params.identifier, params.password),
  });
  const createAccountEmailMutation = useMutation({
    mutationFn: (params: { identifier: string; password: string }) =>
      createAccountEmail(params.identifier, params.password),
  });
  const completePhoneSignupMutation = useMutation({
    mutationFn: completePhoneSignup,
  });

  // TODO: Add error messages to ui

  // const activeError =
  //   requestOtpMutation.error ||
  //   verifyOtpMutation.error ||
  //   loginWithPasswordMutation.error ||
  //   createAccountEmailMutation.error ||
  //   completePhoneSignupMutation.error;

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
          console.log("requesting otp for phone", identifier);
          const response = await requestOtpMutation.mutateAsync(identifier);
          setOtpData(response.verificationId, response.authToken);
        }
        goToStep(method === "phone" ? "otp" : "password");
      } else {
        // Signup: always go to OTP first for verification
        const response = await requestOtpMutation.mutateAsync(identifier);
        setOtpData(response.verificationId, response.authToken);
        goToStep("otp");
      }
    },
    [
      variant,
      setIdentifier,
      setMethod,
      setOtpData,
      goToStep,
      requestOtpMutation,
    ],
  );

  const handleOtpSubmit = React.useCallback(
    async (otp: string) => {
      await verifyOtpMutation.mutateAsync({
        identifier: state.identifier,
        otp,
        verificationId: state.verificationId,
        authToken: state.authToken,
      });

      if (variant === "signup" && state.method === "email") {
        // For email signup, proceed to password creation after OTP
        goToStep("password");
      } else if (variant === "signup" && state.method === "phone") {
        // For phone signup, complete flow
        await completePhoneSignupMutation.mutateAsync(state.identifier);
        // TODO: Redirect to dashboard or success page
      } else {
        // For login OTP, complete flow
        // TODO: Redirect to dashboard
      }
    },
    [
      variant,
      state.identifier,
      state.method,
      state.verificationId,
      state.authToken,
      goToStep,
      verifyOtpMutation,
      completePhoneSignupMutation,
    ],
  );

  const handleResendOtp = React.useCallback(async () => {
    const response = await requestOtpMutation.mutateAsync(state.identifier);
    setOtpData(response.verificationId, response.authToken);
  }, [state.identifier, requestOtpMutation, setOtpData]);

  const handlePasswordSubmit = React.useCallback(
    async (password: string) => {
      if (variant === "login") {
        await loginWithPasswordMutation.mutateAsync({
          identifier: state.identifier,
          password,
        });
        // TODO: Redirect to dashboard
      } else {
        await createAccountEmailMutation.mutateAsync({
          identifier: state.identifier,
          password,
        });
        // TODO: Redirect to dashboard or success page
      }
    },
    [
      variant,
      state.identifier,
      loginWithPasswordMutation,
      createAccountEmailMutation,
    ],
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
