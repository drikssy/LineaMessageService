// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelperConfig {
    address public messageService;

    constructor() {
        if (block.chainid == 59141) {
            messageService = 0x971e727e956690b9957be6d51Ec16E73AcAC83A7;
        } else if (block.chainid == 11155111) {
            messageService = 0xB218f8A4Bc926cF1cA7b3423c154a0D627Bdb7E5;
        }
    }
}
