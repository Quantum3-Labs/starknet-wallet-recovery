import React from "react";

const StepIndicator = () => {
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="rounded-full bg-black text-white w-[44px] h-[44px] flex items-center justify-center">
            <span>1</span>
          </div>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-[6px] w-[2px] bg-[#E2E8F0]" />
          ))}
        </div>
        <div className="flex flex-col max-w-[440px] gap-3">
          <span className="py-2">Choose your assets</span>
          <span>
            Choose the assets you wish to transfer from the list, or manually
            add any missing ones.
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="rounded-full bg-black text-white w-[44px] h-[44px] flex items-center justify-center">
            <span>2</span>
          </div>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-[6px] w-[2px] bg-[#E2E8F0]" />
          ))}
        </div>
        <div className="flex flex-col max-w-[440px] gap-3">
          <span className="py-2">Review the transactions</span>
          <span>
            Take a moment to review the transactions being generated for asset
            recovery.
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="rounded-full bg-black text-white w-[44px] h-[44px] flex items-center justify-center">
          <span>3</span>
        </div>
        <div className="flex flex-col max-w-[440px] gap-3">
          <span className="py-2">Recover your assets</span>
          <span>
            Follow the steps to retrieve your assets, this is a critical process
            so please be patient.
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
