import React, { useEffect, useRef } from "react";
import { WalletData } from "@/backend/moralis/walletHistory";

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
