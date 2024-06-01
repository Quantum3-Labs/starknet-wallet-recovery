import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface TransactionFormProps {
  address: string;
  inputValues: string[];
  onClearAll: () => void;
  onStartSigning: () => void;
  onBackClick: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  address,
  inputValues,
  onClearAll,
  onStartSigning,
  onBackClick,
}) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex justify-center items-center w-full gap-5 text-3xl">
        <div className="flex max-w-[880px] w-full justify-start gap-3">
          <div onClick={onBackClick} className="cursor-pointer">
            <ArrowLeftIcon className="w-8" />
          </div>
          <span>Your transaction</span>
        </div>
      </div>
      <div className="flex flex-col gap-60 w-full items-center">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <span>These tokens will send to </span>
            <span className="text-[#8C16E9]">{address}</span>
          </div>

          <div className="flex flex-col gap-3 justify-center w-full">
            {inputValues.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                className="bg-white rounded-md p-4 w-[880px]"
                readOnly
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-10 py-10">
          <Button
            className="py-4 px-14 rounded-full border-black border-2"
            onClick={onClearAll}
          >
            Clear All
          </Button>
          <Button
            className="bg-button-secondary py-4 px-20 text-white rounded-full"
            onClick={onStartSigning}
          >
            Start signing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
