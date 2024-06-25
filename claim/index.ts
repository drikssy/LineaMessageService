import { LineaSDK, Message, OnChainMessageStatus } from "@consensys/linea-sdk";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { Sender__factory } from "./types/ethers-contracts/factories/Sender__factory";
import { Receiver__factory } from "./types/ethers-contracts/factories/Receiver__factory";
import { Sender } from "./types/ethers-contracts/Sender";
import { Receiver } from "./types/ethers-contracts/Receiver";
import { Signer } from "ethers";
dotenv.config();


function getL2SenderContract(): Sender {
    return Sender__factory.connect(
        "0x6Fdb7029A5B191F9c9Dc2F2427CE77c0A112aFC5",
        new ethers.JsonRpcProvider(process.env.LINEA_SEPOLIA_RPC_URL)
    );
}

function getL1ReceiverContract(): Receiver {
    return Receiver__factory.connect(
        "0x241dAC5359431D8CCA3Ff8d8F645a5F396DB67aa",
        new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL)
    );
}

function getL2Signer(): Signer {
    return new ethers.Wallet(
        process.env.PRIVATE_KEY as string,
        new ethers.JsonRpcProvider(process.env.LINEA_SEPOLIA_RPC_URL)
    ) as Signer;
}


const sdk = new LineaSDK({
    l1RpcUrl: process.env.L1_RPC_URL ?? "",
    l2RpcUrl: process.env.L2_RPC_URL ?? "",
    l1SignerPrivateKey: process.env.L1_SIGNER_PRIVATE_KEY ?? "",
    l2SignerPrivateKey: process.env.L2_SIGNER_PRIVATE_KEY ?? "",
    network: "linea-sepolia",
    mode: "read-write",
});

const l1Contract = sdk.getL1Contract();
const l2Contract = sdk.getL2Contract();
const l1ClaimingService = sdk.getL1ClaimingService();

const greetingMess = "Hi fellas!";



async function sendMessage() {
    const receiverContract = getL1ReceiverContract();
    const senderContract = getL2SenderContract();

    const receiverAddress = await receiverContract.getAddress();
    const l2Signer = getL2Signer();

    const sendingMessageTx = await (await senderContract.connect(l2Signer).greet(receiverAddress, greetingMess)).wait();
    console.log("sending message hash: ", sendingMessageTx?.hash);

}

async function claimMessage() {
    const sendingMessageTx = "0xd7e09bbabfca6c56532ea44f5385c46339201e4810fcadda775d0358e5c9d33b";
    const messages = await l2Contract.getMessagesByTransactionHash(sendingMessageTx);

    if (!messages || messages?.length === 0) {
        console.log("Message not found");
        return;
    }

    const claimMessageTx = await l1ClaimingService.claimMessage(messages[0]) // we get the first message which is the only one sent for the tx
    console.log("claiming message hash:", claimMessageTx);

    const receiverContract = getL1ReceiverContract();
    const greetingMessageStored = await receiverContract.messageReceived();

    console.log("message sent by our sender contract:  ", greetingMess);
    console.log("message stored by our receiver contract:  ", greetingMessageStored);
}

sendMessage();
claimMessage();