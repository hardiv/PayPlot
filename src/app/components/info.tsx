import React from "react";
import TransactionWidget from "@components/transactionWidget";

export default function Info() {
  // Generate a list of transactions for demonstration
  const transactions = Array.from(
    { length: 20 },
    (_, index) => `Transaction ${index + 1}`
  );

  return (
    <div className="mt-5 overflow-auto" style={{ height: 275 }}>
      <p className="text-white">Wallet ID:</p>
      <p className="text-white">Value Inflow:</p>
      <p className="text-white">Value Outflow:</p>
      <p className="text-white">Total Value:</p>
      <p className="text-white">Transactions:</p>
      <p className="text-white">Credibility Rating (Beta):</p>
      <p className="text-white text-lg mt-2">Transactions</p>
      {transactions.map((transaction, index) => (
        <TransactionWidget key={index} transaction={transaction} />
      ))}
    </div>
  );
}
