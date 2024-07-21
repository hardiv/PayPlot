import React, { useEffect, useRef } from "react";
import { WalletData } from "@/backend/walletHistorySubscan";

interface GraphProps {
  walletID: string;
  walletData: WalletData;
}

const Graph: React.FC<GraphProps> = ({ walletID, walletData }) => {

  return (
    <>
    <p>TODO: Graph goes here</p>
    </>
  );
};

export default Graph;
