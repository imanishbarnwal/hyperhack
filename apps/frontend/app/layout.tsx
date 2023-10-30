import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import MyWagmiProvider from "./providers/MyWagmiProvider";
import ClientOnlyProvider from "./providers/ClientOnlyProvider";

const ubuntu = Ubuntu_Mono({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "OxmniPresent",
  description: "One-click chain agnostic NFT minting",
  openGraph: {
    images: [
      {
        url: 'https://gateway.pinata.cloud/ipfs/QmWBDcabHWgcTsdyJmLuHXq7ADuipjZd8RpLr9ePkoJYkC',
        width: 1024,
        height: 1024,
        alt: 'OxmniPresent Logo',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <MyWagmiProvider>
          <ClientOnlyProvider>{children}</ClientOnlyProvider>
        </MyWagmiProvider>
      </body>
    </html>
  );
}
