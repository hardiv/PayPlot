import React from "react";
import { Transaction } from "@/backend/moralis/walletHistory";

interface TransactionProps {
  key: number,
  transaction: Transaction
}

function TransactionWidget (props: TransactionProps) {
  const transaction = props.transaction;
  
  return (
    <div className="bg-gray-600 mb-2 mr-2 rounded-md p-4">
      <p className="text-white mb-1">ID : {transaction.transactionId}</p>
      <p className="">
        Transferred {transaction.amount} from {transaction.fromAddress} to {transaction.toAddress} on {transaction.date}
      </p>
    </div>
  );
};

export default TransactionWidget;
