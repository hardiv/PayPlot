import React, { useState, FormEvent } from "react";
import Info from "@components/info";
import Graph from "@components/graph";
import { WalletData } from "@/backend/moralis/walletHistoryMoralis";

export default function Search() {
  const [wallet, setWallet] = useState("0");
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [entered, setEntered] = useState(false);
  const [valid, setValid] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmittedValue(inputValue);
    setEntered(true);
    setValid(inputValue === "valid");
    setWallet(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value !== submittedValue) {
      setEntered(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const walletDataDummy : WalletData = {
    transactions: [],
    totalInflow: 5,
    totalOutflow: 3,
    minTimestamp: '',
    maxTimestamp: ''
  }

  // console.log("in search.tsx")

  return (
    <section className="flex flex-col items-center w-full h-huscle-screen bg-background">
      <div className="flex w-full flex-col items-center flex-[2]">
        <h1 className="text-4xl text-white mt-10 font-bakbak">
          Visualise your transactions in{" "}
          <span className="text-purple">seconds</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center mt-5"
        >
          <input
            type="text"
            placeholder="Enter a wallet address..."
            value={inputValue}
            onChange={handleInputChange}
            className="mt-5 p-2 w-3/4 max-w-md bg-[#616161] text-white placeholder-[#a6a6a6] font-bakbak rounded-[10px]"
          />
        </form>
      </div>
      <div className="flex flex-col items-center w-full flex-[8]">
        {entered ? (
          valid ? (
            <p className="text-white text-center pt-5">
              Displaying Data for Wallet ID: {wallet}
            </p>
          ) : (
            <p className="text-white text-center pt-5">
              Invalid Wallet ID. Try again.
            </p>
          )
        ) : (
          <p className="text-white text-center pt-5">
            Type a wallet ID above and hit enter!
          </p>
        )}
        <div className="flex flex-col w-full mt-5 h-full">
          <button
            onClick={toggleCollapse}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            {isCollapsed ? "Show Details" : "Hide Details"}
          </button>
          <div className="flex w-full mt-2 h-full">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-0 overflow-hidden" : "w-1/2 pl-5"
              } bg-background h-full`}
              style={{ whiteSpace: "nowrap" }}
            >
              {isCollapsed ? (
                <></>
              ) : (
                <Info walletID={wallet} walletData={walletDataDummy}/>
              )}
            </div>
            <div
              className={`flex-1 bg-background p-4 transition-all duration-300 ease-in-out ${
                isCollapsed ? "w-full" : "w-1/2"
              } h-full`}
            >
              <Graph walletID={wallet} walletData={walletDataDummy}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
