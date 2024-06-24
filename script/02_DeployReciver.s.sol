// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from 'forge-std/Script.sol';
import {HelperConfig} from './HelperConfig.sol';
import {Receiver} from 'src/Receiver.sol';

contract DeployReceiver is Script {
    Receiver public receiver;

    function run() public returns (address){
        // Deploy the Receiver contract
        HelperConfig hc = new HelperConfig();
        address messageService = hc.messageService();
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address sender = vm.envAddress("SENDER");
        vm.startBroadcast(privateKey);
        receiver = new Receiver(messageService, sender);
        vm.stopBroadcast();

        console2.log("Receiver deployed at address: ", address(receiver));

        return address(sender);
    }
}