import Moralis from 'moralis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY as string
});

export async function fetchWalletData(address: string): Promise<void> {
  try {
    // Validate the address
    if (!address) {
      throw new Error('Wallet address is required.');
    }

    // Fetch wallet data from Moralis API
    const response = await Moralis.EvmApi.wallets.getWalletHistory({
      // chain: '0x1', // Ethereum Mainnet
      order: 'DESC',
      address: address
    });

    // Print the transaction history to the console
    console.log('Transaction History:', response.result.at(0));
  } catch (error) {
    // Handle errors and print them to the console
    console.error('Error fetching wallet data:', (error as Error).message);
  }
}

// // Example usage
// const walletAddress = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'; // Replace with actual address
// fetchWalletData(walletAddress);
