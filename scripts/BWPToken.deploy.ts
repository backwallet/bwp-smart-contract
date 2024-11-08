import { ethers } from "hardhat";

async function main() {
  const initialSupply = 10000000000;

  const bwpTokenContract = await ethers.getContractFactory("BWPToken");

  const token = await bwpTokenContract.deploy(initialSupply);

  await token.waitForDeployment();

  const totalSupply = await token.totalSupply();

  const address = await token.getAddress();

  console.log(
    `BWPToken deployed to ${address} with an initialSupply ${totalSupply}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
