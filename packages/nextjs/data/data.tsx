export interface Token {
  name: string;
  symbol: string;
  logo: string;
  address: string;
}

export const tokens: Token[] = [
  {
    name: "Starknet Token",
    symbol: "STRK",
    logo: "/logo-starknet.svg",
    address:
      "0x04c1C8D2Aaad4654E887D152b3435Dfae1BF8f9a5aE4d9C2fE53C8A305426882",
  },
  {
    name: "Tether USD",
    symbol: "USDT",
    logo: "/logo-usdt.svg",
    address:
      "0x07aF54fEdA49BC141A82b376Dc57450645122b0a716a32FB40B1F454bfa34E8C",
  },
  {
    name: "Ether",
    symbol: "ETH",
    logo: "/ether.png",
    address:
      "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    logo: "/logo-dai.svg",
    address:
      "0x0626281391726B5e53Af40193e034e60Fb49E44A10b3d23853feFF3391387D69",
  },
];
