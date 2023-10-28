"use client";

import { useAccount } from "wagmi";
import Connect from "./components/buttons/Connect";
import Disconnect from "./components/buttons/Disconnect";

export default function Page() {
  const { address, isConnected, isDisconnected } = useAccount();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-4">
      {isDisconnected && (
        <Connect />
      )}
      {isConnected && (
        <div className="flex flex-col w-full h-full justify-center items-center gap-4">
          <h1>Connected to {address}</h1>
          <Disconnect />
        </div>
      )}
    </div>
  );
}
