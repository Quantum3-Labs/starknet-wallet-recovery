"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { BlockieAvatar } from "~~/components/scaffold-stark";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@starknet-react/core";
import { Address } from "@starknet-react/chains";
import { getChecksumAddress } from "starknet";

const Home: NextPage = () => {
  const { address, status, chainId, ...props } = useAccount();
  const checkSumAddress = address ? getChecksumAddress(address) : undefined;

  const router = useRouter();
  const handleDiscoverClick = () => {
    if (address) {
      router.push(`/discover`);
    }
  };

  return (
    <div className="background-page flex flex-col items-center justify-center">
      <div className="flex justify-center items-center w-full py-40">
        <div className="max-w-[1920px] w-full flex justify-center items-center flex-col gap-10">
          <div className="text-center text-4xl font-bold flex flex-col gap-2">
            <span>Welcome To</span>
            <h1 className="text-gradient">Starknet Wallet Recovery</h1>
          </div>
          <Image src="/logo.svg" alt="logo" width={73} height={65} />
          <div className="flex flex-col items-center">
            <span>Let&apos;s search what assets we can recover</span>
            <span>Enter your hacked address below:</span>
          </div>

          {address ? (
            <div className="bg-[#E8E8F7] p-4 rounded-md flex gap-2 w-[500px]">
              <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
                {address as Address}
              </div>
              {checkSumAddress && (
                <BlockieAvatar address={checkSumAddress as Address} size={25} />
              )}
            </div>
          ) : (
            <div className="text-center text-xl text-red-500">
              Conecta tu wallet
            </div>
          )}
          <button
            onClick={handleDiscoverClick}
            disabled={!address}
            className={`rounded-full px-20 py-3 ${address ? "bg-button-secondary text-white hover:bg-button-secondary-dark" : "pointer-events-none bg-gray-300 text-gray-500"} `}
          >
            Discover
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
