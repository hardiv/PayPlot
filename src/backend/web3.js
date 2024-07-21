import { ethers } from 'ethers';
import { fetchWalletData } from '@/backend/walletHistorySubscan';

// Replace with your contract's ABI and address
const contractABI = [
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
  
];

const contractAddress = '0xAC9C7428528D4067649a3b292cb23518386Fae19';

let provider;
let contract;
let isRequestPending = false;

export async function init() {
  try {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Initialize the provider
      provider = new ethers.BrowserProvider(window.ethereum);

      // Only request accounts if no request is already pending
      if (!isRequestPending) {
        isRequestPending = true;

        try {
          await provider.send("eth_requestAccounts", []); // Request accounts
        } catch (error) {
          if (error.code === -32002) {
            // Handle case where a request is already pending
            console.warn('Request already pending. Please wait.');
          } else {
            // Handle other errors
            console.error('Error requesting accounts:', error);
            alert('An error occurred while requesting accounts. Please check the console for details.');
          }
          isRequestPending = false;
          return; // Exit early if there's an error
        }

        isRequestPending = false; // Reset the flag after successful request
      }

      // Get the signer and create the contract instance
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log('MetaMask connected and contract instance created.');
    } else {
      console.error('MetaMask is not installed');
    }
  } catch (error) {
    console.error('Error initializing MetaMask or contract:', error);
    alert('An error occurred. Please check the console for details.');
  }
}


// Function to call `upvoteWallet`
export async function upvoteWallet(userAddress) {
  if (!contract) {
    print("Calling init")
    await init();
    print("Init finished")
  }
  try {
    print("Calling contract upvote")
    const tx = await contract.upvoteWallet(userAddress);
    print("Called upvote, now waiting for tx to be mined")
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
      credibility: await getCredibility(info[0].toNumber(), info[1].toNumber(), userAddress)
    };
  } catch (error) {
    console.error('Error getting wallet info:', error);
    return null;
  }
}

// Normalization function to always be between 0 and 100
function normalize(value, max) {
  return Math.min(Math.max((value / max) * 100, 0), 100);
}

export async function getCredibility(upvotes, downvotes, userAddress) {
  const walletData = await fetchWalletData(userAddress);
  const numTransactions = walletData.transactions.length;

  const rawCredibility = Math.max(upvotes - downvotes, 0) * numTransactions;

  // Assuming a maximum credibility score for normalization
  const MAX_CREDIBILITY = 10000; // Define this based on your system

  return normalize(rawCredibility, MAX_CREDIBILITY);
}
