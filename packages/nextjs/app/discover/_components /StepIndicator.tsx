import React from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Choose your assets",
      description:
        "Choose the assets you wish to transfer from the list, or manually add any missing ones.",
    },
    {
      number: 2,
      title: "Review the transactions",
      description:
        "Take a moment to review the transactions being generated for asset recovery.",
    },
    {
      number: 3,
      title: "Recover your assets",
      description:
        "Follow the steps to retrieve your assets, this is a critical process so please be patient.",
    },
  ];

  return (
    <div>
      {steps.map((step) => (
        <div key={step.number} className="flex gap-3">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div
              className={`rounded-full text-white w-[44px] h-[44px] flex items-center justify-center ${
                currentStep >= step.number ? "bg-black" : "bg-[#BABABA]"
              }`}
            >
              <span>{step.number}</span>
            </div>
            {[...Array(6)].map((_, lineIndex) => (
              <div key={lineIndex} className="h-[6px] w-[2px] bg-[#E2E8F0]" />
            ))}
          </div>
          <div className="flex flex-col max-w-[440px] gap-3">
            <span className="py-2">{step.title}</span>
            <span>{step.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
