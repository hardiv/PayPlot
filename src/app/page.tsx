"use client";
import { useEffect, useState } from "react";

import "@styles/style.css";
import NavBar from "@/app/components/navbar";
import Search from "@/app/sections/search";
import {fetchWalletData} from "../backend/moralis/walletHistory"

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  const walletAddress = '0x63066bd226CDb299F791aebF79E943288eAc3D5e';
  fetchWalletData(walletAddress);

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
