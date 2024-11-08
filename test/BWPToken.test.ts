import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BWPToken", function () {
    const initialSupply = 10000;

    async function deployBWPTokenFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();

      const BWPToken = await ethers.getContractFactory("BWPToken");
      const token = await BWPToken.deploy(initialSupply);

      return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
      it("Should assign the total supply of tokens to the owner", async function () {
        const { token, owner } = await loadFixture(deployBWPTokenFixture);
        const total = await token.totalSupply();
        expect(total).to.equal(await token.balanceOf(owner.address));
      });
    });

    describe("Transaction", function () {

        it("Should transfer tokens between accounts", async function () {
            const { token, owner, otherAccount } = await loadFixture(deployBWPTokenFixture);

            const ownerBalance = await token.balanceOf(owner.address);

            await token.transfer(otherAccount.address, 50);
            const addr1Balance = await token.balanceOf(otherAccount.address);
            expect(addr1Balance).to.equal(50);

            const ownerNewBalance = await token.balanceOf(owner.address);
            expect(ownerNewBalance).to.equal(ownerBalance - BigInt(50));
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const { token, owner, otherAccount } = await loadFixture(deployBWPTokenFixture);

            // Transfer 10001 BWP tokens from owner to otherAccount
            await expect(
             token.transfer(otherAccount.address, ethers.parseEther('10001'))
            ).to.be.reverted;
        });        
      });
});