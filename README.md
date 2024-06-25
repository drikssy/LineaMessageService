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