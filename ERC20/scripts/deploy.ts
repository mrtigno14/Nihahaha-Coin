import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("KoyukiNft", ["0xc22C0067e02373EE8E6897c90b7718178d12aDd4"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
