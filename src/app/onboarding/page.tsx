import Stepper from "@/features/onboarding/components/stepper";
import BusinessModelStep from "@/features/onboarding/components/business-model-step";

const Page = () => {
  return (
    <div className="mt-6 flex w-full flex-1 flex-col items-center gap-6 pb-10">
      <Stepper currentStep={1} />
      <BusinessModelStep />
    </div>
  );
};

export default Page;
