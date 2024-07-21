import { ethers } from 'ethers';

// Replace with your contract's ABI and address
const contractABI = [
  {
    "_format": "hh-sol-artifact-1",
    "contractName": "MoonbaseStorage",
    "sourceName": "contracts/MoonbaseStorage.sol",
    "abi": [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "downvotes",
            "type": "uint256"
          }
        ],
        "name": "WalletInfoUpdated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "downvoteWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "getWalletInfo",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_upvotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_downvotes",
            "type": "uint256"
          }
        ],
        "name": "updateWalletInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "upvoteWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "walletInfos",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "downvotes",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "bytecode": "0x608060405234801561001057600080fd5b5061084e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806312300c6d1461005c578063326fbd61146100785780637d5c1914146100a95780638a7ea38a146100da578063a9462e0a146100f6575b600080fd5b610076600480360381019061007191906105e4565b610112565b005b610092600480360381019061008d91906105bb565b6101bb565b6040516100a09291906106ef565b60405180910390f35b6100c360048036038101906100be91906105bb565b6101df565b6040516100d19291906106ef565b60405180910390f35b6100f460048036038101906100ef91906105bb565b610257565b005b610110600480360381019061010b91906105bb565b6103f4565b005b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508281600001819055508181600101819055503373ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f84846040516101ae9291906106ef565b60405180910390a2505050565b60006020528060005260406000206000915090508060000154908060010154905082565b60008060008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806040016040529081600082015481526020016001820154815250509050806000015181602001519250925050915091565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156102c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bd906106af565b60405180910390fd5b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546103189190610729565b925050819055508073ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546040516103e99291906106ef565b60405180910390a250565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610463576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045a906106cf565b60405180910390fd5b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008282546104b59190610729565b925050819055508073ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546040516105869291906106ef565b60405180910390a250565b6000813590506105a0816107ea565b92915050565b6000813590506105b581610801565b92915050565b6000602082840312156105cd57600080fd5b60006105db84828501610591565b91505092915050565b600080604083850312156105f757600080fd5b6000610605858286016105a6565b9250506020610616858286016105a6565b9150509250929050565b600061062d601d83610718565b91507f43616e6e6f74207570766f746520796f7572206f776e2077616c6c65740000006000830152602082019050919050565b600061066d601f83610718565b91507f43616e6e6f7420646f776e766f746520796f7572206f776e2077616c6c6574006000830152602082019050919050565b6106a9816107b1565b82525050565b600060208201905081810360008301526106c881610620565b9050919050565b600060208201905081810360008301526106e881610660565b9050919050565b600060408201905061070460008301856106a0565b61071160208301846106a0565b9392505050565b600082825260208201905092915050565b6000610734826107b1565b915061073f836107b1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610774576107736107bb565b5b828201905092915050565b600061078a82610791565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6107f38161077f565b81146107fe57600080fd5b50565b61080a816107b1565b811461081557600080fd5b5056fea26469706673582212209e53493f4330c83b40b057494604efa443e6c82cc779a86acbeca799a86da1e564736f6c63430008000033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100575760003560e01c806312300c6d1461005c578063326fbd61146100785780637d5c1914146100a95780638a7ea38a146100da578063a9462e0a146100f6575b600080fd5b610076600480360381019061007191906105e4565b610112565b005b610092600480360381019061008d91906105bb565b6101bb565b6040516100a09291906106ef565b60405180910390f35b6100c360048036038101906100be91906105bb565b6101df565b6040516100d19291906106ef565b60405180910390f35b6100f460048036038101906100ef91906105bb565b610257565b005b610110600480360381019061010b91906105bb565b6103f4565b005b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508281600001819055508181600101819055503373ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f84846040516101ae9291906106ef565b60405180910390a2505050565b60006020528060005260406000206000915090508060000154908060010154905082565b60008060008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020604051806040016040529081600082015481526020016001820154815250509050806000015181602001519250925050915091565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156102c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bd906106af565b60405180910390fd5b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008282546103189190610729565b925050819055508073ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546040516103e99291906106ef565b60405180910390a250565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610463576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045a906106cf565b60405180910390fd5b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160008282546104b59190610729565b925050819055508073ffffffffffffffffffffffffffffffffffffffff167ff0d7501d53b36eeb122686155ebc0138be5c8c231b06fba92b35850e673b319f6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001546000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101546040516105869291906106ef565b60405180910390a250565b6000813590506105a0816107ea565b92915050565b6000813590506105b581610801565b92915050565b6000602082840312156105cd57600080fd5b60006105db84828501610591565b91505092915050565b600080604083850312156105f757600080fd5b6000610605858286016105a6565b9250506020610616858286016105a6565b9150509250929050565b600061062d601d83610718565b91507f43616e6e6f74207570766f746520796f7572206f776e2077616c6c65740000006000830152602082019050919050565b600061066d601f83610718565b91507f43616e6e6f7420646f776e766f746520796f7572206f776e2077616c6c6574006000830152602082019050919050565b6106a9816107b1565b82525050565b600060208201905081810360008301526106c881610620565b9050919050565b600060208201905081810360008301526106e881610660565b9050919050565b600060408201905061070460008301856106a0565b61071160208301846106a0565b9392505050565b600082825260208201905092915050565b6000610734826107b1565b915061073f836107b1565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610774576107736107bb565b5b828201905092915050565b600061078a82610791565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6107f38161077f565b81146107fe57600080fd5b50565b61080a816107b1565b811461081557600080fd5b5056fea26469706673582212209e53493f4330c83b40b057494604efa443e6c82cc779a86acbeca799a86da1e564736f6c63430008000033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
  
];

const contractAddress = '0xAC9C7428528D4067649a3b292cb23518386Fae19';

let provider;
let contract;

export async function init() {
  // Connect to MetaMask
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request accounts
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    console.error('MetaMask is not installed');
  }
}

// Function to call `upvoteWallet`
export async function upvoteWallet(userAddress) {
  if (!contract) {
    await init();
  }
  try {
    const tx = await contract.upvoteWallet(userAddress);
    await tx.wait(); // Wait for transaction to be mined
    console.log('Upvote transaction successful');
  } catch (error) {
    console.error('Error upvoting wallet:', error);
  }
}

// Function to call `downvoteWallet`
export async function downvoteWallet(userAddress) {
  if (!contract) {
    await init();
  }
  try {
    const tx = await contract.downvoteWallet(userAddress);
    await tx.wait(); // Wait for transaction to be mined
    console.log('Downvote transaction successful');
  } catch (error) {
    console.error('Error downvoting wallet:', error);
  }
}

// Function to get wallet information
export async function getWalletInfo(userAddress) {
  if (!contract) {
    await init();
  }
  try {
    const info = await contract.getWalletInfo(userAddress);
    return {
      upvotes: info[0].toNumber(), // Assuming info[0] is the upvotes
      downvotes: info[1].toNumber(), // Assuming info[1] is the downvotes
    };
  } catch (error) {
    console.error('Error getting wallet info:', error);
    return null;
  }
}
