// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IMessageService} from "./interfaces/IMessageService.sol";

contract Sender {
    IMessageService public messageService;

    constructor(address _messageService) {
        messageService = IMessageService(_messageService);
    }

    function greet(address l1Receiver, string memory messageToL) public payable {
        messageService.sendMessage(
            l1Receiver,
            0,
            abi.encodeWithSignature("onReceiveMessage(string)", messageToL)
        );
    }
}
