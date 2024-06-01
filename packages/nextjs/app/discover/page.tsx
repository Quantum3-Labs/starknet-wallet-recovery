"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { checkboxes } from "~~/data/data";
import { Button } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import GenericModal from "~~/components/scaffold-stark/CustomConnectButton/GenericModal";
import { useLocalStorage } from "usehooks-ts";
import TransactionForm from "~~/app/discover/_components /TransactionForm";
import CustomCheckbox from "~~/app/discover/_components /CustomCheckbox";
import StepIndicator from "~~/app/discover/_components /StepIndicator";
import Image from "next/image";
import { Address, BlockieAvatar } from "~~/components/scaffold-stark";
import { ADDRESS } from "starknet-dev";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";

const Discover: NextPage = () => {
  const [address, setAddress] = useState<string | null>(null);
  const { address: accountAddress, status, chainId, ...props } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState(["Value 1", "Value 2"]);
  const [formType, setFormType] = useState("erc20");
  const [hackedAddress, setHackedAddress] = useLocalStorage<string>(
    "hackedAddress",
    "",
  );
  const [isERC20Selected, setIsERC20Selected] = useState(true);
  const [step, setStep] = useState(1);
  const [modalContent, setModalContent] = useState("addAssets");
  const [copied, setCopied] = useState(false);
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
  const [ensAvatar, setEnsAvatar] = useState<string | null>();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContinueClick = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handleAdd = () => {
    setStep(2);
    setIsModalOpen(false);
  };

  const handleClearAll = () => {
    setInputValues(["", ""]);
  };

  const handleStartSigning = () => {
    setModalContent("signing");
    setIsModalOpen(true);
  };

  const handleAddManuallyClick = () => {
    setModalContent("addAssets");
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setModalContent("empty");
  };
  const handleBackClick = () => {
    setStep(1);
  };
  const handleCheckboxChange = (isChecked: boolean) => {
    setIsCheckboxSelected(isChecked);
  };
  useEffect(() => {
    const queryAddress = new URLSearchParams(window.location.search).get(
      "address",
    );
    if (queryAddress) {
      setHackedAddress(queryAddress);
      setAddress(queryAddress);
    } else {
      setAddress(accountAddress as string);
    }
  }, []);

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
                  <Address address={address as ADDRESS} />
                </div>
              </div>
            </div>
            <div className="flex-1 px-10 flex gap-10 flex-col justify-center">
              {step === 1 && (
                <>
                  <div className="flex justify-center items-center gap-5 text-3xl w-full">
                    <div className="flex max-w-[880px] w-full justify-start gap-3">
                      <Link href={"/"}>
                        <ArrowLeftIcon className="w-8" />
                      </Link>
                      <span>Select your assets</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-10 w-full justify-center items-center">
                    {checkboxes.map((checkbox) => (
                      <CustomCheckbox
                        key={checkbox.id}
                        logoSrc={checkbox.logoSrc}
                        symbol={checkbox.symbol}
                        value={checkbox.value}
                        onChange={handleCheckboxChange}
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
                        isCheckboxSelected
                          ? ""
                          : "pointer-events-none opacity-50"
                      }`}
                      onClick={handleContinueClick}
                      disabled={!isCheckboxSelected}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              )}
              {step === 2 && (
                <TransactionForm
                  address={address as string}
                  inputValues={inputValues}
                  onClearAll={handleClearAll}
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
                      Connect to a wallet
                    </div>
                    <div className="flex items-center justify-center flex-col gap-5">
                      <Image
                        src="/safe.svg"
                        alt="logo safe"
                        width={250}
                        height={251}
                      />
                      <span className="text-center">
                        Fund your wallet with 0.001 ETH to execute the
                        transaction and connect to your wallet.
                      </span>
                    </div>

                    <div className="w-full flex justify-center items-center flex-col pt-5 gap-5">
                      <div className="flex gap-2">
                        <BlockieAvatar
                          address={address as ADDRESS}
                          ensImage={ensAvatar}
                          size={24}
                        />
                        <span>{address}</span>
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
                        <span>{address as ADDRESS}</span>
                        <CopyToClipboard
                          text={address as string}
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
                        onClick={() => setIsModalOpen(false)}
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
