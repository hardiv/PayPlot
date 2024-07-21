import { useEffect, useState } from "react";
import { getWalletInfo } from "../../backend/web3"

export default function Credibility() {
  const [walletInfo, setWalletInfo] = useState({ upvotes: 0, downvotes: 0 });

  return (
    <section className="flex flex-col items-center justify-center w-full h-huscle-screen bg-background">
      <p className="text-3xl text-white items-center justify-center">What do you think of this wallet?</p>
      
      <p>Reliable</p>
      <p>Not relaible</p>
    </section>
  )
  
}
