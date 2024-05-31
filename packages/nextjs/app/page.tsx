"use client";

import type { NextPage } from "next";
import { useAccount } from "@starknet-react/core";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { BlockieAvatar } from "~~/components/scaffold-stark";
import Link from "next/link";

const Home: NextPage = () => {
  const { address, status, chainId, ...props } = useAccount();

  return (
    <>
      <div className="background-page">
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

            <div className="bg-[#E8E8F7] p-4 rounded-md flex gap-2">
              <span>{address}</span>
              <span>
                {address && <BlockieAvatar address={address} size={24} />}
              </span>
            </div>
            <Link
              href="/discover"
              className="border-2 rounded-full px-20 py-3 border-black"
            >
              Discover
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
