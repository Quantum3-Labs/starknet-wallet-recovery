"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import { BlockieAvatar } from "~~/components/scaffold-stark";
import StepIndicator from "~~/app/discover/_components /StepIndicator";
import { Address } from "@starknet-react/chains";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { checkboxes } from "~~/data/data";
import CustomCheckbox from "~~/app/discover/_components /CustomCheckbox";
import { Button } from "@radix-ui/themes";
import React, { useState } from "react";
import GenericModal from "~~/components/scaffold-stark/CustomConnectButton/GenericModal";

interface FormattedAddress {
  full: string;
  partial: string;
}
function formatEthereumAddress(address: string): FormattedAddress {
  const formattedFullAddress = address?.replace(/^.{5}/, (match) =>
    match.toUpperCase(),
  );
  const formattedPartialAddress = `${address?.slice(0, 4)}...${address?.slice(-4)}`;

  return { full: formattedFullAddress, partial: formattedPartialAddress };
}
const Discover: NextPage = () => {
  const { address, status, chainId, ...props } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("erc20");
  const [isERC20Selected, setIsERC20Selected] = useState(true);

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center w-full py-40">
          <div className="max-w-[1920px] w-full flex justify-center gap-10">
            <div className="flex-2 px-10 flex flex-col gap-20">
              <StepIndicator />
              <div className="py-10 bg-[#E8E8F7] rounded-xl max-w-[473px] w-full flex flex-col justify-center items-center gap-4">
                <span>Hacked address</span>
                <div className="flex gap-3">
                  <span>
                    {address && <BlockieAvatar address={address} size={24} />}
                  </span>
                  <span className="text-sm">
                    {formatEthereumAddress(address as Address).partial}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 px-10 flex gap-10 flex-col">
              <div className="flex justify-center items-center gap-5 text-3xl">
                <ArrowLeftIcon className="w-8" />
                <span>Select your assets</span>
              </div>
              <div className="flex flex-col gap-10">
                {checkboxes.map((checkbox) => (
                  <CustomCheckbox
                    key={checkbox.id}
                    logoSrc={checkbox.logoSrc}
                    symbol={checkbox.symbol}
                    value={checkbox.value}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-10 py-10 ">
                <Button className="py-4 px-14 rounded-full border-black border-2 ">
                  Add Manually
                </Button>
                <Button
                  className="bg-button-secondary py-4 px-20 text-white rounded-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <GenericModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              animate={true}
              className="basis-5/6 lg:col-span-2 lg:py-4 p-8 bg-white w-[700px] h-[800px] "
            >
              <div className="flex flex-col gap-52  w-full px-10 ">
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
                  </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <Button
                    className="bg-button-secondary py-4 px-14 text-white rounded-full"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ADD
                  </Button>
                </div>
              </div>
            </GenericModal>
          )}
        </div>
      </div>
    </>
  );
};
export default Discover;
