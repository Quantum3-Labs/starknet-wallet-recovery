import type { BigNumberish } from "ethers/src.ts/utils";

export interface Token {
  name: string;
  symbol: string;
  logo: string;
  balance?: BigNumberish;
}

export const tokens: Token[] = [
  {
    name: "Starknet Token",
    symbol: "STRK",
    logo: "/logo-starknet.svg",
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    logo: "/logo-usdt.svg",
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    logo: "/logo-dai.svg",
  },
  // {
  //   name: "Q3",
  //   symbol: "",
  //   logo: "/logo-quantum.svg",
  // },
];
