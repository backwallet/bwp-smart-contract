// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../core-contracts/contracts/token/ERC20/ERC20.sol";

contract BWPToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Back Wallet Point", "BWP") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}