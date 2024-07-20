import React, { useState, FormEvent } from "react";

export default function Search() {
  const [wallet, setWallet] = useState("0");
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [entered, setEntered] = useState(false);
  const [valid, setValid] = useState(false);

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

  return (
    <section className="flex flex-col items-center w-full h-huscle-screen bg-background">
      <div className="flex w-full flex-col items-center flex-[2]">
        <h1 className="text-4xl text-white mt-10 font-bakbak">
          Visualise your transactions in{" "}
          <span className="text-purple">seconds</span>
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
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
        {entered ? 
          valid ?
            <p className="text-white text-center pt-5">Displaying Data for Wallet ID: {wallet}</p>
            :
            <p className="text-white text-center pt-5">Invalid Wallet ID. Try again.</p>
          :
          <p className="text-white text-center pt-5">Type a wallet ID above and hit enter!</p>
        }
      </div>
    </section>
  );
}
