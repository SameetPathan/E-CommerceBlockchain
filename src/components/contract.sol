// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint) private balances;

    constructor() {
        balances[msg.sender] = 1000;
    }

    function addFunds(uint amount) public {
        balances[msg.sender] += amount;
    }

    function spendFunds(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        balances[msg.sender] -= amount;
    }

    function displayFunds() public view returns (uint) {
        return balances[msg.sender];
    }
}
