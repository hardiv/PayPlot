import React from "react";
import TransactionWidget from "@components/transactionWidget";
import { WalletData } from "@/backend/walletHistorySubscan";

interface InfoProps {
  walletID: string;
  walletData: WalletData;
}

export default function Info(props: InfoProps) {
  const walletData = props.walletData;
  const walletID = props.walletID;
  // Generate a list of transactions for demonstration
  const transactions = walletData.transactions;

  return (
    <div className="mt-5 overflow-auto" style={{ height: 275 }}>
      <p className="text-white">Wallet ID: {props.walletID}</p>
      <p className="text-white">Volume Inflow: {walletData.totalInflow}</p>
      <p className="text-white">Volume Outflow: {walletData.totalOutflow}</p>
      <p className="text-white">Total Volume: {walletData.totalInflow - walletData.totalOutflow}</p>
      <p className="text-white">Transactions: {transactions.length} </p>
      <p className="text-white">Credibility Rating (Beta): TODO</p>
      <p className="text-white text-lg mt-2">Transactions</p>
      {transactions.map((transaction, index) => (
        <TransactionWidget key={index} transaction={transaction}/>
      ))}
    </div>
  );
}
