import { LineaSDK, Message, OnChainMessageStatus } from "@consensys/linea-sdk";
import * as dotenv from "dotenv";
dotenv.config();


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


async function main() {
    const message = await l2Contract.getMessageByMessageHash("0x8ab7e8ac94858a20deee9eab8f1744031abdff6b00a36f617391882fb66b6c27");
    const messageStatus = await l1ClaimingService.getMessageStatus("0x8ab7e8ac94858a20deee9eab8f1744031abdff6b00a36f617391882fb66b6c27");


    if (!message) {
        console.log("Message not found");
        return;
    }

    console.log(message);
    console.log(messageStatus);

    // const messages = await l1ClaimingService.getL2MessageHashesInBlockRange(1876170, 1876198)
    // console.log(messages);


    const tx = await l1ClaimingService.claimMessage(message)
    console.log(tx);


    if (messageStatus == OnChainMessageStatus.CLAIMABLE) {
        const estimatedGas = await l1ClaimingService.estimateClaimMessageGas(message); // Optional
        await l1ClaimingService.claimMessage(message);
    }
}

main();