"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Token, tokens } from "~~/data/data";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import GenericModal from "~~/components/scaffold-stark/CustomConnectButton/GenericModal";
import TransactionForm from "~~/app/discover/_components /TransactionForm";
import StepIndicator from "~~/app/discover/_components /StepIndicator";
import Image from "next/image";
import {
  Address as AddressUI,
  AddressInput,
} from "~~/components/scaffold-stark";
import { Address } from "@starknet-react/chains";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import AssetSelectionForm from "~~/app/discover/_components /AssetSelectionForm";
import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";

const Discover: NextPage = () => {
  const [hackedAddress, setHackedAddressCore] = useState<string>("");
  const { address: accountAddress, status, chainId, ...props } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("erc20");
  const [isERC20Selected, setIsERC20Selected] = useState(true);
  const [step, setStep] = useState(1);
  const [modalContent, setModalContent] = useState("addAssets");
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState<Token[]>([]);

  const [selectedTokenBalance, setSelectedTokenBalance] = useState<
    bigint | undefined
  >();

  const { data: balanceDai } = useScaffoldReadContract({
    contractName: "DAI",
    functionName: "balanceOf",
    args: [accountAddress ?? ""],
    watch: true,
  });
  const { data: balanceUST } = useScaffoldReadContract({
    contractName: "USDT",
    functionName: "balanceOf",
    args: [accountAddress ?? ""],
    watch: true,
  });
  const { data: balanceSTRK } = useScaffoldReadContract({
    contractName: "STRK",
    functionName: "balanceOf",
    args: [accountAddress ?? ""],
    watch: true,
  });

  const tokensBalance = {
    STRK: balanceSTRK,
    USDT: balanceUST,
    DAI: balanceDai,
  };

  const filterContracts = (hackedAddress: Address) => {
    const symbolsSelected = transactions.map(({ symbol }) => symbol);
    const defaulcontracts = [
      {
        contractName: "DAI",
        functionName: "transfer",
        args: [hackedAddress, tokensBalance.DAI],
        watch: true,
      },
      {
        contractName: "USDT",
        functionName: "transfer",
        args: [hackedAddress, tokensBalance.USDT],
        watch: true,
      },
      {
        contractName: "STRK",
        functionName: "transfer",
        args: [hackedAddress, tokensBalance.STRK],
        watch: true,
      },
    ];
    return defaulcontracts.filter(({ contractName }) =>
      symbolsSelected.includes(contractName),
    );
  };

  const { writeAsync: tokensTransfers } = useScaffoldMultiWriteContract({
    calls: filterContracts(hackedAddress as Address),
  });

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = () => {
    setStep(2);
    setIsModalOpen(false);
  };

  const handleStartSigning = () => {
    setModalContent("signing");
    setIsModalOpen(true);
  };

  const handleAddManuallyClick = () => {
    setModalContent("addAssets");
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setModalContent("empty");
    try {
      await tokensTransfers();
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  const handleBackClick = () => {
    setStep(1);
  };
  const setHackedAddress = (hackedAddress: string) => {
    setHackedAddressCore(hackedAddress);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center w-full py-40">
          <div className="max-w-[1920px] w-full flex justify-center gap-10">
            <div className="flex-2 px-10 flex flex-col gap-20">
              <StepIndicator currentStep={step} />
              <div className="py-10 bg-[#E8E8F7] rounded-xl max-w-[473px] w-full flex flex-col justify-center items-center gap-4">
                <span>Hacked address</span>
                <div className="flex gap-3">
                  <AddressUI address={accountAddress as Address} />
                </div>
              </div>
            </div>
            <div className="flex-1 px-10 flex gap-10 flex-col justify-center">
              {step === 1 && (
                <AssetSelectionForm
                  tokens={tokens}
                  tokensBalance={tokensBalance}
                  accountAddress={accountAddress as Address}
                  onContinue={(transactions) => {
                    const lastTransactions = transactions.map((transaction) => {
                      const { symbol } = transaction;
                      // @ts-ignore
                      return { balance: tokensBalance[symbol], ...transaction };
                    });
                    console.log(lastTransactions);
                    setTransactions(lastTransactions);
                    setStep(2);
                  }}
                  handleAddManuallyClick={handleAddManuallyClick}
                />
              )}

              {step === 2 && (
                <TransactionForm
                  balance={selectedTokenBalance as bigint}
                  transactions={transactions}
                  address={accountAddress as string}
                  onStartSigning={handleStartSigning}
                  onBackClick={handleBackClick}
                />
              )}

              {step === 3 && (
                <div>
                  <div className="flex justify-center items-center gap-5 text-3xl">
                    <span>Recover your assets</span>
                  </div>
                  <div className="flex flex-col gap-10">
                    <span>Step 3 content goes here.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isModalOpen && (
            <GenericModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              animate={true}
              className="basis-5/6 lg:col-span-2 lg:py-4 p-8 bg-white w-[700px] h-[800px]"
            >
              <div className="flex flex-col gap-52 w-full px-10">
                {modalContent === "addAssets" && (
                  <div className="flex flex-col gap-5 max-w-[700px] w-full">
                    <span className="text-center my-4 text-black text-3xl">
                      Add Assets Manually
                    </span>
                    <div className="flex flex-col gap-10">
                      <div className="flex gap-10 justify-center">
                        <Button
                          className={`border-2 rounded-md px-3 py-2 ${formType === "erc20" ? "bg-[#F3F4F6]" : ""}`}
                          onClick={() => {
                            setFormType("erc20");
                            setIsERC20Selected(true);
                          }}
                        >
                          ERC 20
                        </Button>
                        <Button
                          className={`border-2 rounded-md px-3 py-2 ${formType === "erc721" ? "bg-[#F3F4F6]" : ""}`}
                          onClick={() => {
                            setFormType("erc721");
                            setIsERC20Selected(false);
                          }}
                        >
                          ERC721
                        </Button>
                        <Button
                          className={`border-2 rounded-md px-3 py-2 ${formType === "erc1155" ? "bg-[#F3F4F6]" : ""}`}
                          onClick={() => {
                            setFormType("erc1155");
                            setIsERC20Selected(false);
                          }}
                        >
                          ERC1155
                        </Button>
                      </div>
                      <div className="flex flex-col gap-3">
                        <span>Contract Address</span>
                        <input
                          type="text"
                          className="bg-[#F3F4F6] rounded-md p-2"
                          placeholder="eg: 0x2B7E......B1c79DC"
                        />
                      </div>
                      {formType === "erc721" && (
                        <div className="flex flex-col gap-3">
                          <span>Token Id</span>
                          <input
                            type="text"
                            className="bg-[#F3F4F6] rounded-md p-2"
                          />
                        </div>
                      )}
                      {formType === "erc1155" && (
                        <div className="flex flex-col gap-3">
                          <span>Comma-separated Token Ids</span>
                          <input
                            type="text"
                            className="bg-[#F3F4F6] rounded-md p-2"
                            placeholder="eg: 1,2,3"
                          />
                        </div>
                      )}
                      <div className="w-full flex justify-center items-center">
                        <Button
                          className="bg-button-secondary py-4 px-14 text-white rounded-full"
                          onClick={handleAdd}
                        >
                          ADD
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {modalContent === "signing" && (
                  <div className="flex flex-col gap-5 max-w-[700px] w-full ">
                    <div className="text-center my-4 text-black text-3xl">
                      Insert the address
                    </div>
                    <div className="flex items-center justify-center flex-col gap-5">
                      <Image
                        src="/safe.svg"
                        alt="logo safe"
                        width={250}
                        height={251}
                      />
                      <span className="text-center">
                        Insert the address where you want to send the tokens and
                        fund your wallet with 0.001 ETH to execute the
                        transaction.
                      </span>
                    </div>

                    <div className="w-full flex justify-center items-center flex-col pt-5 gap-5">
                      <div className="flex gap-2">
                        <AddressInput
                          placeholder="Insert the address"
                          value={hackedAddress}
                          onChange={setHackedAddress}
                        />
                      </div>

                      <Button
                        className="bg-button-secondary py-4 px-14 text-white rounded-full"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                )}
                {modalContent === "empty" && (
                  <div className="flex flex-col gap-5 max-w-[700px] w-full ">
                    <div className="text-center my-4 text-black text-3xl">
                      Transaction sent
                    </div>
                    <div className="flex items-center justify-center flex-col gap-5">
                      <Image
                        src="/send.svg"
                        alt="logo safe"
                        width={250}
                        height={251}
                      />
                      <span className="text-center">
                        All your funds were sent to
                      </span>
                    </div>
                    <div className="w-full flex justify-center items-center gap-5 flex-col">
                      <div className="flex gap-2 bg-[#E8E8F7] p-4 rounded-md">
                        <span>{hackedAddress as Address}</span>
                        <CopyToClipboard
                          text={hackedAddress as string}
                          onCopy={handleCopy}
                        >
                          <DocumentDuplicateIcon
                            className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
                            aria-hidden="true"
                          />
                        </CopyToClipboard>
                        {copied && (
                          <span className="text-[#8C16E9]">Copied!</span>
                        )}
                      </div>

                      <Button
                        className="bg-button-secondary py-4 px-14 text-white rounded-full"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </GenericModal>
          )}
        </div>
      </div>
    </>
  );
};

export default Discover;
