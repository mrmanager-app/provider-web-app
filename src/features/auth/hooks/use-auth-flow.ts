"use client";

import { useState, useCallback } from "react";
import type { AuthMethod, AuthState, AuthStep } from "../types";
import { detectAuthMethod } from "../schemas";

interface UseAuthFlowReturn {
  state: AuthState;
  setIdentifier: (value: string) => void;
  goToStep: (step: AuthStep) => void;
  setMethod: (method: AuthMethod) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
  handleIdentifierSubmit: (identifier: string) => void;
}

const initialState: AuthState = {
  method: "email",
  step: "identifier",
  identifier: "",
  isLoading: false,
};

export function useAuthFlow(): UseAuthFlowReturn {
  const [state, setState] = useState<AuthState>(initialState);

  const setIdentifier = useCallback((identifier: string) => {
    setState((prev) => ({ ...prev, identifier }));
  }, []);

  const goToStep = useCallback((step: AuthStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setMethod = useCallback((method: AuthMethod) => {
    setState((prev) => ({ ...prev, method }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const handleIdentifierSubmit = useCallback((identifier: string) => {
    const method = detectAuthMethod(identifier);
    if (!method) return;

    setState((prev) => ({
      ...prev,
      identifier,
      method,
      step: method === "phone" ? "otp" : "password",
    }));
  }, []);

  return {
    state,
    setIdentifier,
    goToStep,
    setMethod,
    setLoading,
    reset,
    handleIdentifierSubmit,
  };
}
