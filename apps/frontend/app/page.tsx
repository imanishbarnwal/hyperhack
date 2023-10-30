"use client";

import { useAccount, useChainId, useNetwork } from "wagmi";
import Connect from "./components/buttons/Connect";
import Disconnect from "./components/buttons/Disconnect";
import Mint from "./components/buttons/Mint";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { goerli, polygonMumbai } from "viem/chains";

export default function Page() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-4">
      {isDisconnected && <Connect />}
      {isConnected && (
        <div className="flex flex-col w-full h-full justify-center items-center gap-4">
          <div className="flex flex-col">
            <h1>
              <span className="font-bold">Connected to: </span>
              {address}
            </h1>
            <h1>
              <span className="font-bold">Current chain: </span>
              {(chain?.id === polygonMumbai.id || chain?.id === goerli.id) ? chain?.name : `Sorry, we don\'t support this chain yet (Chain id: ${chain?.id})`}
            </h1>
          </div>
          <div className="flex gap-4">
            <Mint />
            <Disconnect />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );

  async function mintNFT() {}

  // return (
  //   <div>
  //     <div className="z-[10]">
  //       <div className="rounded-b-lg flex items-center justify-between w-full h-20 px-12">
  //         <Link
  //           className="flex-1 font-semibold text-4xl text-green-600 hover:text-green-500"
  //           href="/"
  //         >
  //           <div className="flex justify-center pl-56">
  //             {" "}
  //             <button className="rounded-md border-2 bg-[#C03540] p-2 mt-6">
  //               <img
  //                 src="https://www.azuki.com/Azuki%20Logo%20White.svg"
  //                 className="h-12 w-48"
  //               />
  //             </button>
  //           </div>
  //         </Link>
  //         <div className="">
  //           {/* <ConnectButton chainStatus="icon" showBalance={false} /> */}
  //           <Connect />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="h-5/6">
  //       <div className="flex flex-1 items-center justify-end z-[10]">
  //         {isConnected && (
  //           <div className="drop-shadow-2xl bg-[#C03540] w-[370px] p-4 flex flex-row items-center justify-between mt-[610px] space-x-2 mr-10">
  //             <div className="text-white text-xl font-semibold">
  //               OPEN FOR MINTING
  //             </div>
  //             <button
  //               onClick={() => mintNFT()}
  //               className="bg-black text-white font-normal text-lg p-2 px-10"
  //             >
  //               Mint
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //       {isConnected && (
  //         <div className="mt-2 flex items-center justify-center font-semibold text-xl">
  //           Powered By HyperLane
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
