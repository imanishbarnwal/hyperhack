import { useCallback, useState } from "react";
import { useNetwork } from "wagmi";
import HyperMintNFTABI from "../../abis/HyperMintNFT.json";
import HyperInitiateMintABI from "../../abis/HyperInitiateMint.json";
import { goerli, polygonMumbai } from "viem/chains";
import {
  getWalletClient,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { parseUnits } from "viem";
import LoadingButton from "./Loading";
import { toast } from "react-toastify";

export default function Mint() {
  const { chain } = useNetwork();

  const [isLoading, setIsLoading] = useState(false);

  const mint = useCallback(async () => {
    console.log(chain);
    if (!chain) return;

    const walletClient = await getWalletClient();
    if (!walletClient) return;

    setIsLoading(true);

    try {
      if (chain.id === polygonMumbai.id) {
        // Normal mint

        const { hash } = await writeContract({
          address: "0x790823a2ba1D662E24E18737E21ccDefa025bBB0",
          abi: HyperMintNFTABI,
          functionName: "initiateMint",
          value: parseUnits("1", 0),
        });

        const txn = await waitForTransaction({ hash: hash, chainId: chain.id });

        console.log(txn);
      } else if (chain.id === goerli.id) {
        // Cross-chain mint
        const { hash } = await writeContract({
          address: "0x357868069f3D84810c17DF3673847cA8760D927b",
          abi: HyperInitiateMintABI,
          functionName: "initiateMint",
          args: [
            polygonMumbai.id,
            "0x790823a2ba1D662E24E18737E21ccDefa025bBB0",
          ],
          value: parseUnits("0.01", 18),
        });

        const txn = await waitForTransaction({ hash: hash, chainId: chain.id });

        console.log(txn);
      } else {
        toast.error("Unsupported chain");
      }
    } catch (e) {
        console.error(e);
        toast.error(e.message);
    }

    setIsLoading(false);
  }, [chain]);

  return (
    <LoadingButton
      className="bg-secondary-300 hover:bg-secondary-700 disabled:bg-secondary-200 text-white font-bold py-2 px-4 rounded"
      onClick={mint}
      disabled={
        isLoading || (chain?.id !== polygonMumbai.id && chain?.id !== goerli.id)
      }
      loading={isLoading}
    >
      Mint
    </LoadingButton>
  );
}
