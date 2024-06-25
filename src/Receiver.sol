// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {MessageServiceBase} from "./MessageServiceBase.sol";

contract Receiver is MessageServiceBase {
    string public messageReceived;

/**
     * @dev Constructor
     * @param _messageService The address of the L1MessageService contract.
     * @param _remoteSender The address of the Sender contract on L2.
     */
    constructor(address _messageService, address _remoteSender) {
        _init_MessageServiceBase(_messageService, _remoteSender);
    }

    /**
     * @dev This function is called by the L1MessageService when a message is claimed.
     * @param messageToL The message sent from the L1MessageService and originally from the created message on L2.
     */
    function onReceiveMessage(
        string memory messageToL
    ) external onlyMessagingService {
        messageReceived = messageToL;
    }

    /* We removed the claim function as we have to interact with the L1MessageService with the "claimMessageWithProof", the proof is done by the Linea SDK*/
    
    // function claim(string memory _messageTol, uint256 messageNumber) external {
    //     messageService.claimMessage(
    //         remoteSender,
    //         address(this),
    //         0,
    //         0,
    //         payable(address(0)),
    //         abi.encodeWithSignature("onReceiveMessage(string)", _messageTol),
    //         messageNumber
    //     );
    // }
}
