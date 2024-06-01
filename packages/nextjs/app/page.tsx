"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { AddressInput } from "~~/components/scaffold-stark";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const [hackedAddress, setHackedAddressCore] = useState("");
  const router = useRouter();
  const handleDiscover = () => {
    if (hackedAddress.trim() !== "") {
      router.push(`/discover?address=${hackedAddress.trim()}`);
    }
  };
  const setHackedAddress = (hackedAddress: string) => {
    setHackedAddressCore(hackedAddress);
  };

  return (
    <>
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

            <div className="bg-[#E8E8F7] p-4 rounded-md flex gap-2 w-[500px]">
              <AddressInput
                name="addressInput"
                value={hackedAddress}
                placeholder={"0xcc0700000000000000000000000000001481a7"}
                onChange={setHackedAddress}
              />
            </div>

            <button
              onClick={handleDiscover}
              className={`rounded-full px-20 py-3 ${hackedAddress ? "bg-button-secondary text-white hover:bg-button-secondary-dark" : "pointer-events-none border-2 bg-white border-black"}`}
            >
              Discover
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
