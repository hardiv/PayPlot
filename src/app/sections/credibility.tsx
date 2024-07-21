import React from "react";

interface CredibilityProps {
  walletID: string;
  entered: boolean;
  valid: boolean;
}

export default function Credibility({
  walletID,
  entered,
  valid,
}: CredibilityProps) {
  const handleUpvote = () => {
    console.log(`Upvoted wallet ID: ${walletID}`);
  };

  const handleDownvote = () => {
    console.log(`Downvoted wallet ID: ${walletID}`);
  };

  return (
    <section className="flex flex-col items-center w-full h-huscle-screen bg-background">
      <div className="flex w-full flex-col items-center flex-[2]">
        <h1 className="text-4xl text-white mt-10 font-bakbak">
          Credibility Information
        </h1>
        {entered && valid ? (
          <>
            <p className="mt-10">Wallet ID: {walletID}</p>
            <p className="mt-10 text-3xl">
              Credibility Score: {walletID} (Poor)
            </p>
            <p className="mt-10">Upvotes: {walletID}</p>
            <p className="mt-10">Downvotes: {walletID}</p>
            <div className="mt-10 flex space-x-4">
              <button
                onClick={handleUpvote}
                className="p-2 bg-[#abbb35] text-white rounded-md"
              >
                Upvote
              </button>
              <button
                onClick={handleDownvote}
                className="p-2 bg-[#ff2060] text-white rounded-md"
              >
                Downvote
              </button>
            </div>
          </>
        ) : (
          <p className="mt-10 text-white text-center">
            {entered
              ? "Invalid Wallet ID. Try again."
              : "Enter a wallet ID on the page above!."}
          </p>
        )}
      </div>
    </section>
  );
}
