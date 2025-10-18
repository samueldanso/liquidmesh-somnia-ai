import { createConfig } from "@privy-io/wagmi";
import { somniaTestnet } from "viem/chains";
import { http } from "wagmi";
import { env } from "@/env";

// Dynamic chain selection based on environment
export const getDefaultChain = () => {
  return env.NEXT_PUBLIC_CHAIN_ID === "50312" ? somniaTestnet : somniaTestnet;
};

// Chain configuration
export const chains = [somniaTestnet];
export const supportedChains = [somniaTestnet];

// Wagmi configuration
export const wagmiConfig = createConfig({
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http(),
  },
});
