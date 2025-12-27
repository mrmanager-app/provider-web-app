"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CardHeader } from "@/components/shared/card-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ONBOARDING_STEPS_COPY, BUSINESS_MODEL_OPTIONS } from "../constants";
import Image from "next/image";

const BusinessModelStep = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const stepData = ONBOARDING_STEPS_COPY[0];

  const getIcon = (id: string) => {
    if (id === "individual")
      return (
        <Image
          src="/teacher.svg"
          alt="Teacher"
          width={24}
          height={24}
          className="shrink-0 object-contain"
        />
      );
    if (id === "business")
      return (
        <Image
          src="/account_balance.svg"
          alt="Building"
          width={24}
          height={24}
          className="shrink-0 object-contain"
        />
      );
    return null;
  };

  return (
    <div className="bg-card container mx-4 flex h-full max-w-7xl flex-col items-center justify-between rounded-[24px] sm:max-h-[512px]">
      <div className="w-full">
        <CardHeader
          title={stepData.title}
          description={stepData.description}
          className="border-border w-full border-b px-12 py-4 pb-6 [&>h2]:text-2xl"
        />

        <div className="flex w-full flex-col gap-6 px-12 py-6">
          <div className="">
            <span className="text-base font-medium">
              Who will offer services on Mr.Manager?
            </span>
            <p className="text-muted-foreground text-sm font-normal">
              Select the option that best matches your setup.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {BUSINESS_MODEL_OPTIONS.map((option) => (
              <Card
                key={option.id}
                className={cn(
                  "hover:ring-primary cursor-pointer rounded-[20px] transition-all duration-300 ease-in-out",
                  selectedModel === option.id
                    ? "ring-primary bg-primary/8"
                    : "",
                )}
                onClick={() => setSelectedModel(option.id)}
              >
                <CardContent className="flex gap-4">
                  <div className="text-foreground bg-card flex size-12 items-center justify-center rounded-lg border">
                    {getIcon(option.id)}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-lg font-medium">{option.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {option.description}
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="w-max p-0 text-[#FF8400]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="border-border w-full border-t p-7">
        <Button
          className="w-full rounded-xl text-base font-medium"
          size="lg"
          disabled={!selectedModel}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BusinessModelStep;
