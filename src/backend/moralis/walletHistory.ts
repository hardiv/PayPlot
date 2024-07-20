import Moralis from 'moralis';

const REACT_APP_MORALIS_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkzMGFlMjBmLTNiZTMtNGE5MS1iNzZjLTQwMzRlMmIwYzUxMCIsIm9yZ0lkIjoiNDAwNzg5IiwidXNlcklkIjoiNDExODM0IiwidHlwZUlkIjoiYzNkNTc1Y2EtZTE0Ny00ZTkyLWE4ZTgtOGQwMDYxZTliMjk1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjE0OTE0MjQsImV4cCI6NDg3NzI1MTQyNH0.yDK78Sa4Ct-4o1OPt1EAA_FXm504T-S9Glu41KgkJI0"
Moralis.start({
  apiKey: REACT_APP_MORALIS_API_KEY as string
});

interface Transaction {
  transactionId: string;
  fromAddress: string;
  toAddress: string | undefined;
  amount: string;
  date: string;
}

interface WalletData {
  transactions: Transaction[];
  totalInflow: number;
  totalOutflow: number;
  minTimestamp: string;
  maxTimestamp: string;
}

// Define the function to fetch wallet data
export async function fetchWalletData(address: string): Promise<WalletData> {
  try {
    // Validate the address
    if (!address) {
      throw new Error('Wallet address is required.');
    }

    // Fetch wallet data from Moralis API
    const response = await Moralis.EvmApi.wallets.getWalletHistory({
      order: 'DESC',
      address: address
    });

    // Check if response has a data property
    if (!response.result || response.result.length === 0) {
      console.log('No transaction history found for this wallet address.');
      return {
        transactions: [],
        totalInflow: 0,
        totalOutflow: 0,
        minTimestamp: '',
        maxTimestamp: ''
      };
    }

    // Extract relevant transaction data and calculate inflows and outflows
    let totalInflow = 0;
    let totalOutflow = 0;
    let minTimestamp = response.result[0].blockTimestamp;
    let maxTimestamp = response.result[0].blockTimestamp;

    const transactions: Transaction[] = response.result.map(transaction => {
      const amount = parseFloat(transaction.value);
      const fromAddress = transaction.fromAddress.lowercase;
      const toAddress = transaction.toAddress?.lowercase;
      
      if (fromAddress === address.toLowerCase()) {
        totalOutflow += amount;
      } else if (toAddress === address.toLowerCase()) {
        totalInflow += amount;
      }

      // Update min and max timestamps
      if (transaction.blockTimestamp < minTimestamp) {
        minTimestamp = transaction.blockTimestamp;
      }
      if (transaction.blockTimestamp > maxTimestamp) {
        maxTimestamp = transaction.blockTimestamp;
      }

      return {
        transactionId: transaction.hash,
        fromAddress: transaction.fromAddress.lowercase,
        toAddress: transaction.toAddress?.lowercase,
        amount: transaction.value,
        date: transaction.blockTimestamp
      };
    });

    return {
      transactions,
      totalInflow,
      totalOutflow,
      minTimestamp,
      maxTimestamp
    };

  } catch (error) {
    // Handle errors and print them to the console
    console.error('Error fetching wallet data:', (error as Error).message);
    return {
      transactions: [],
      totalInflow: 0,
      totalOutflow: 0,
      minTimestamp: '',
      maxTimestamp: ''
    };
  }
}


// // Example usage
// const walletAddress = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'; // Replace with actual address
// fetchWalletData(walletAddress);
