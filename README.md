Bridge messages between two smart contracts on L1 and L2

Create a Hardhat or Foundry project which will contain two simple Smart Contracts which will send messages to each other. 


The sender contract will be a Solidity contract deployed on Linea Sepolia which will contain a method called 

greet(string messageToL)

which initiates the Cross-Chain call using L2MessageService smart contract on Linea L2. 


The receiving contract will be a Solidity contract deployed on Ethereum Sepolia that should persist the receiving message coming from the L2 into a variable inside the contract.


Deploy the contracts and run the functions on-chain, documenting the inner workings and end results