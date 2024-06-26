Bridge messages between two smart contracts on L1 and L2

Create a Hardhat or Foundry project which will contain two simple Smart Contracts which will send messages to each other. 


The sender contract will be a Solidity contract deployed on Linea Sepolia which will contain a method called 

greet(string messageToL)

which initiates the Cross-Chain call using L2MessageService smart contract on Linea L2. 


The receiving contract will be a Solidity contract deployed on Ethereum Sepolia that should persist the receiving message coming from the L2 into a variable inside the contract.


Deploy the contracts and run the functions on-chain, documenting the inner workings and end results

**ALL DONE**
send message tx: https://sepolia.lineascan.build/tx/0xb63b383dfc339b3a7314e0f50d5e7566989e8b9fc62ecbe430ce7be4647f0310
claim message tx: https://sepolia.etherscan.io/tx/0x9b11b06781f66eebec343c0e0b4195d450c0f09054622d5d31a3f6902d1d29ab

here we can see the state change of our receiver contract: https://sepolia.etherscan.io/tx/0x9b11b06781f66eebec343c0e0b4195d450c0f09054622d5d31a3f6902d1d29ab#statechange

## PROCESS

What actions are needed to be perform in order to bridge messages between L2 and L1

- 1. We need to create the L2 smart contract that will send the message using the L2MessageService:  [The Sender](src/Sender.sol)

- 2. We need to create the L1 smart contract that will receive the message through a callback via the L1MessageService by claiming the message: [The Receiver](src/Receiver.sol)

- 3. These 2 contracts created and deployed [L2Sender](https://sepolia.lineascan.build/address/0x6Fdb7029A5B191F9c9Dc2F2427CE77c0A112aFC5) and [L1Receiver](https://sepolia.etherscan.io/address/0x241dAC5359431D8CCA3Ff8d8F645a5F396DB67aa)
We Can now send a message through our Sender by invoking the function greet with the address of the L1Receiver and the message to greet with as arguments
this function interact with the L2LineaMessageService to send the message to the protocol

- 4. Once the message is sent (we can see the MessageSent Event emitted), we are now ready to claim the message with the Linea SDK, It needs to be claimed with proof now since [AlphaV2](https://docs.linea.build/developers/linea-version#alpha-v2-release-notes), [a script](claim/index.ts) is written to help you claim the sent message, all you need is the message sent TX on the L2 to help you retrive the message with the SDK helper functions


