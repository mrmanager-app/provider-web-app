"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

const steps = [
  "Business Model",
  "Basic Details",
  "Additional Info",
  "Add Team Member",
];

interface StepperProps {
  currentStep: number;
}

const StepLine = ({
  isCompleted,
  isActive,
}: {
  isCompleted: boolean;
  isActive: boolean;
}) => {
  return (
    <div className="flex-1 px-2">
      <svg className="h-[2px] w-full overflow-visible">
        {/* Background Line */}
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="text-border stroke-current"
          strokeWidth="2"
        />
        {/* Animated Foreground Line */}
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className={cn(
            "text-primary stroke-current",
            isCompleted || isActive ? "opacity-100" : "opacity-0",
          )}
          strokeWidth="2"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={
            isActive
              ? {
                  pathLength: [0, 1],
                  pathOffset: [0, 0],
                }
              : isCompleted
                ? { pathLength: 1, pathOffset: 0 }
                : { pathLength: 0 }
          }
          transition={
            isActive
              ? {
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.5,
                }
              : { duration: 0.5 }
          }
        />
      </svg>
    </div>
  );
};

const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="bg-card container mx-4 h-max max-w-7xl rounded-[24px] px-5 py-6 pb-10 sm:px-48">
      <div className="flex w-full items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={label}>
              <div className="relative flex flex-col items-center justify-center">
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground ring-primary ring-offset-card ring-2 ring-offset-2"
                      : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground border-border border-2",
                  )}
                >
                  {stepNumber}
                </div>
                <span
                  className={cn(
                    "absolute right-1/2 -bottom-6.5 w-max translate-x-1/2 text-xs font-medium transition-colors duration-300 md:text-sm",
                    isActive || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <StepLine
                  isCompleted={isCompleted}
                  isActive={stepNumber === currentStep}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
