"use client";
import { useEffect, useState } from "react";

import "@styles/style.css";
import NavBar from "@/app/components/navbar";
import Search from "@/app/sections/search";
import { fetchWalletData, getAddressBalance, verifyAddressExists } from "@/backend/walletHistorySubscan";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  

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
            <Search/>
            <section className="flex flex-col items-center justify-center w-full h-huscle-screen bg-background">
              <p className="text-3xl text-white items-center justify-center">What do you think of this wallet? (ID: TODO put ID here)</p>
              <p>Reliable</p>
              <p>not relaible</p>
            </section>
          </div>
        </div>
      </body>
    </>
  );
}
