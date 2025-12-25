"use client";

import { useState, useCallback } from "react";
import type { AuthMethod, AuthStep } from "../types";

interface AuthFlowState {
  method: AuthMethod;
  step: AuthStep;
  identifier: string;
}

interface UseAuthFlowReturn {
  state: AuthFlowState;
  setIdentifier: (value: string) => void;
  goToStep: (step: AuthStep) => void;
  setMethod: (method: AuthMethod) => void;
  reset: () => void;
}

const initialState: AuthFlowState = {
  method: "email",
  step: "identifier",
  identifier: "",
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

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setIdentifier,
    goToStep,
    setMethod,
    reset,
  };
}
