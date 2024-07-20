"use client";
import { useEffect, useState } from "react";

import "@styles/style.css";
import NavBar from "@/app/components/navbar";
import Search from "@/app/sections/search";
import {fetchWalletData} from "../backend/moralis/walletHistory"

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // const walletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
  // fetchWalletData(walletAddress);

  const walletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
  fetchWalletData(walletAddress).then(walletData => {
    console.log('Transaction History:', walletData.transactions);
    console.log('Total Inflow:', walletData.totalInflow);
    console.log('Total Outflow:', walletData.totalOutflow);
    console.log('Min Timestamp:', walletData.minTimestamp);
    console.log('Max Timestamp:', walletData.maxTimestamp);
  });
  


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <head>
        <title>Home | PayPlot</title>
      </head>
      <body>
        <div className="min-h-screen w-full">
          <NavBar scrolled={scrolled} />
          <div className="flex-grow mt-navbar">
            <section className="flex flex-col items-center justify-center w-full h-huscle-screen bg-background">
              <h1 className="text-5xl text-white items-center justify-center">Web3 Transaction Visualiser</h1>
            </section>
            <Search/>
          </div>
        </div>
      </body>
    </>
  );
}
