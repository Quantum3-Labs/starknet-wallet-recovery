import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@radix-ui/themes";
import { Token } from "~~/data/data";
import { Balance } from "~~/components/scaffold-stark";
import { Address } from "@starknet-react/chains";
import { formatEther } from "ethers";

interface TransactionFormProps {
  address: string;
  balance: bigint;
  transactions: Token[];
  inputValues?: string;
  onStartSigning: () => void;
  onBackClick: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  address,
  inputValues,
  onStartSigning,
  balance,
  onBackClick,
  transactions,
}) => {
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const onRemove = (symbol: string) => {
    const transactionFiltered = transactions.filter(
      (transaction) => transaction.symbol !== symbol,
    );

    setCurrentTransactions(transactionFiltered);
  };

  const onClearAll = () => {
    setCurrentTransactions([]);
  };

  console.log({ transactions });

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
            <span>These tokens will send from </span>
            <span className="text-[#8C16E9]">{address}</span>
          </div>

          <div className="flex flex-col gap-3 justify-center w-full">
            {currentTransactions.map(({ symbol, balance }) => {
              return (
                <div
                  className="bg-white rounded-md p-4 w-[880px] border-2 flex justify-between"
                  key={symbol}
                >
                  <div>
                    <span> {balance ? formatEther(balance) : undefined}</span>
                    <div>{symbol}</div>
                  </div>
                  <button onClick={() => onRemove(symbol)}>x</button>
                </div>
              );
            })}
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
