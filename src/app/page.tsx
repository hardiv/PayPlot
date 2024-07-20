"use client";
import { useEffect, useState } from "react";

import "@styles/style.css";
import NavBar from "@/app/components/navbar";

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
            <section className="flex flex-col items-center justify-center w-full h-huscle-screen bg-background">
              <h1 className="text-6xl text-white">Section 1</h1>
            </section>
            <section className="flex flex-col items-center justify-center w-full h-huscle-screen bg-background">
              <h1 className="text-6xl text-white">Section 2</h1>
            </section>
          </div>
        </div>
      </body>
    </>
  );
}
