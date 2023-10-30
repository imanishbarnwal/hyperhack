"use client";

import { useAccount, useNetwork } from "wagmi";
import Connect from "./components/buttons/Connect";
import Disconnect from "./components/buttons/Disconnect";
import Mint from "./components/buttons/Mint";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { goerli, polygonMumbai } from "viem/chains";
import Image from "next/image";

export default function Page() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-4 bg-primary-500">
      <div className="relative h-[256px] w-[256px] lg:h-[512px] lg:w-[512px]">
        <Image src={'/logo.png'} alt="Logo" layout="fill" />
      </div>
      {isDisconnected && <Connect />}
      {isConnected && (
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-center">
                <span className="font-bold">Connected to: </span>
                {address}
              </h1>
              <h1>
                <span className="font-bold">Current chain: </span>
                {chain?.id === polygonMumbai.id || chain?.id === goerli.id
                  ? chain?.name
                  : `Sorry, we don\'t support this chain yet (Chain id: ${chain?.id})`}
              </h1>
            </div>
            <div className="flex gap-4">
              <Mint />
              <Disconnect />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
