import { deployContract, deployer, exportDeployments } from "./deploy-contract";

const deployScript = async (): Promise<void> => {
  await deployContract(
    {
      name: "DAI",
      symbol: "DAI",
      initial_supply: 1000000000000000000000000n,
      recipient: deployer.address,
    },
    "MockToken",
    "DAI"
  );

  await deployContract(
    {
      name: "USDT",
      symbol: "USDT",
      initial_supply: 1000000000000000000000000n,
      recipient: deployer.address,
    },
    "MockToken",
    "USDT"
  );

  await deployContract(
    {
      name: "STRK",
      symbol: "STRK",
      initial_supply: 1000000000000000000000000n,
      recipient: deployer.address,
    },
    "MockToken",
    "STRK"
  );
};

deployScript()
  .then(() => {
    exportDeployments();
    console.log("All Setup Done");
  })
  .catch(console.error);
