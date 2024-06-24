// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from 'forge-std/Script.sol';
import {HelperConfig} from './HelperConfig.sol';
import {Sender} from 'src/Sender.sol';

contract DeploySender is Script {
    Sender public sender;

    function run() public returns (address){
        // Deploy the Sender contract
        HelperConfig hc = new HelperConfig();
        address messageService = hc.messageService();
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        sender = new Sender(messageService);
        vm.stopBroadcast();

        console2.log("Sender deployed at address: ", address(sender));

        return address(sender);
    }
}