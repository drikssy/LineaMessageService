// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {MessageServiceBase} from "./MessageServiceBase.sol";

contract Receiver is MessageServiceBase {
    string public messageReceived;

    constructor(address _messageService, address _remoteSender) {
        _init_MessageServiceBase(_messageService, _remoteSender);
    }

    function onReceiveMessage(string memory messageToL) external onlyMessagingService() {
        messageReceived = messageToL;
    }

    function claim(string memory _messageTol) external {
        messageService.claimMessage(
            remoteSender,
            address(this),
            0,
            0,
            payable(address(0)),
            abi.encodeWithSignature("onReceiveMessage(string)", _messageTol),
            block.prevrandao
        );
    }
}
