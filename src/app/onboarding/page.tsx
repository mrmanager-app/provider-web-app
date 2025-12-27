import Stepper from "@/features/onboarding/components/stepper";

const Page = () => {
  return (
    <div className="mt-6 flex w-full flex-1 justify-center">
      <Stepper currentStep={1} />
    </div>
  );
};

export default Page;
