import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "@styles/style.css";

type NavbarProps = {
  scrolled: boolean;
};

const NavBar = ({ scrolled }: NavbarProps) => {
  return (
    <div className={scrolled ? "navbarScrolled" : "navbar"}>
      <div className="mx-auto px-5 flex items-center h-full justify-items-start">
        <a href="/" title="Home">
          <Image
            src={""}
            alt="Logo"
            width={160}
            height={40}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default NavBar;
