import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import CustomCheckbox from "~~/app/discover/_components /CustomCheckbox";
import { formatEther } from "ethers";
import { Button } from "@radix-ui/themes";
import { Token, tokens } from "~~/data/data";

interface AssetSelectionFormProps {
  tokensBalance: Record<string, any>;
  tokens: Token[];
  accountAddress: string;
  handleAddManuallyClick: () => void;
  onContinue: (transactions: Token[]) => void;
}

const AssetSelectionForm: React.FC<AssetSelectionFormProps> = (props) => {
  const {
    tokens,
    accountAddress,
    handleAddManuallyClick,
    onContinue,
    tokensBalance,
  } = props;

  const onSubmit = (values: any) => {
    const currentTransaction = tokens.filter(({ symbol }: Token) =>
      values.transactions.includes(symbol),
    );

    onContinue(currentTransaction);
  };

  const formik = useFormik({
    initialValues: {
      transactions: [] as string[],
    },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center gap-5 text-3xl w-full">
        <div className="flex max-w-[880px] w-full justify-between gap-3 pb-5">
          <div className="flex gap-2">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-8" />
            </Link>
            <span>Select your assets</span>
          </div>
          <ArrowPathIcon className="w-8" />
        </div>
      </div>
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        {tokens.map((token) => (
          <CustomCheckbox
            label={
              <div className="flex items-start justify-start gap-4">
                <div className="flex items-center gap-1">
                  <img
                    src={token.logo}
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <span>{token.symbol}</span>
                  <span>
                    {tokensBalance[token.symbol]
                      ? formatEther(tokensBalance[token.symbol])
                      : undefined}
                  </span>
                </div>
              </div>
            }
            onChange={formik.handleChange}
            key={`${accountAddress}-${token.symbol}`}
            value={token.symbol}
            name="transactions"
            isChecked={formik.values.transactions.includes(token.symbol)}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-10 py-10">
        <Button
          className="py-4 px-14 rounded-full border-black border-2"
          onClick={handleAddManuallyClick}
        >
          Add Manually
        </Button>
        <Button
          className={`bg-button-secondary py-4 px-20 text-white rounded-full ${
            formik.values.transactions.length
              ? ""
              : "pointer-events-none opacity-50"
          }`}
          disabled={!formik.values.transactions.length}
          type="submit"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default AssetSelectionForm;
