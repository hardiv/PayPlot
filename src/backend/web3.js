import { ethers } from 'ethers';
import { fetchWalletData } from '@/backend/walletHistorySubscan';

// Replace with your contract's ABI and address
const contractABI = [ /*... ABI as provided ...*/ ];

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
