'use client'

import { PropsWithChildren } from "react";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { infuraProvider } from "@wagmi/core/providers/infura";
import {
  celo,
  polygon,
  polygonMumbai,
  sepolia,
} from "viem/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai, celo, sepolia], // Dummy list of chains
  [infuraProvider({ apiKey: process.env.INFURA_KEY! })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
  ],
});

export default function MyWagmiProvider(props: PropsWithChildren) {
  return <WagmiConfig config={config}>{props.children}</WagmiConfig>;
}
