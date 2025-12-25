"use client";

import { useState, useEffect, useCallback } from "react";
import { OTP_RESEND_TIMEOUT } from "../constants";

interface UseOtpTimerReturn {
  remainingTime: number;
  canResend: boolean;
  startTimer: () => void;
  resetTimer: () => void;
  formattedTime: string;
}

export function useOtpTimer(
  initialTime: number = OTP_RESEND_TIMEOUT,
): UseOtpTimerReturn {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const startTimer = useCallback(() => {
    setRemainingTime(initialTime);
    setIsRunning(true);
  }, [initialTime]);

  const resetTimer = useCallback(() => {
    setRemainingTime(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  const formattedTime = `${remainingTime}s`;

  return {
    remainingTime,
    canResend: remainingTime === 0,
    startTimer,
    resetTimer,
    formattedTime,
  };
}
