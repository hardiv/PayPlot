import React from "react";

interface TransactionWidgetProps {
  transaction: string;
}

const TransactionWidget: React.FC<TransactionWidgetProps> = ({ transaction }) => {
  return (
    <p className="text-white mb-1">
      {transaction}
    </p>
  );
};

export default TransactionWidget;
