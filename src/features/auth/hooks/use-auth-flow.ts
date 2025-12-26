"use client";

import { useState, useCallback } from "react";
import type { AuthMethod, AuthStep } from "../types";

interface AuthFlowState {
  method: AuthMethod;
  step: AuthStep;
  identifier: string;
  verificationId: string;
  authToken: string;
}

interface UseAuthFlowReturn {
  state: AuthFlowState;
  setIdentifier: (value: string) => void;
  goToStep: (step: AuthStep) => void;
  setMethod: (method: AuthMethod) => void;
  setOtpData: (verificationId: string, authToken: string) => void;
  reset: () => void;
}

const initialState: AuthFlowState = {
  method: "email",
  step: "identifier",
  identifier: "",
  verificationId: "",
  authToken: "",
};

export function useAuthFlow(): UseAuthFlowReturn {
  const [state, setState] = useState<AuthFlowState>(initialState);

  const setIdentifier = useCallback((identifier: string) => {
    setState((prev) => ({ ...prev, identifier }));
  }, []);

  const goToStep = useCallback((step: AuthStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setMethod = useCallback((method: AuthMethod) => {
    setState((prev) => ({ ...prev, method }));
  }, []);

  const setOtpData = useCallback(
    (verificationId: string, authToken: string) => {
      setState((prev) => ({ ...prev, verificationId, authToken }));
    },
    [],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setIdentifier,
    goToStep,
    setMethod,
    setOtpData,
    reset,
  };
}
