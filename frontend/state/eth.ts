import { ethers } from "ethers"; // Ethers
import Onboard from "bnc-onboard"; // Onboard.js
import { useEffect, useState } from "react"; // React
import { createContainer } from "unstated-next"; // State management

// Types
import type {
  API,
  WalletInitOptions,
  WalletModule,
} from "bnc-onboard/dist/src/interfaces";
import type { Web3Provider } from "@ethersproject/providers";

// Network
const networkId = process.env.NEXT_PUBLIC_RPC_NETWORK
  ? // Use network
    Number(process.env.NEXT_PUBLIC_RPC_NETWORK)
  : // Else, default to Rinkeby
    4;

// Onboard.js wallet providers
const wallets: (WalletModule | WalletInitOptions)[] = [
  { walletName: "metamask" },
  {
    walletName: "walletConnect",
    rpc: {
      [networkId]: process.env.NEXT_PUBLIC_RPC_URL ?? "",
    },
  },
];

// Token name
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";

/**
 * Provides functionality for Eth account/state management
 */
function useEth() {
  const [address, setAddress] = useState<string | null>(null); // User address
  const [onboard, setOnboard] = useState<API | null>(null); // Onboard provider
  const [provider, setProvider] = useState<Web3Provider | null>(null); // Ethers provider

  /**
   * Unlock wallet, store ethers provider and address
   */
  const unlock = async () => {
    // Enables wallet selection via BNC onboard
    if (onboard) {
      const connected = await onboard.walletSelect();
      if (connected) await onboard.walletCheck();
    }
  };

  // --> Lifecycle: on mount
  useEffect(() => {
    // Onboard provider
    const onboard = Onboard({
      networkId,
      // Hide Blocknative branding
      hideBranding: true,
      // Setup custom wallets for selection
      walletSelect: {
        heading: `Connect to ${tokenName}`,
        description: `Please select a wallet to authenticate with ${tokenName}.`,
        wallets: wallets,
      },
      // Track subscriptions
      subscriptions: {
        // On wallet update
        wallet: async (wallet) => {
          // If wallet provider exists
          if (wallet.provider) {
            // Collect ethers provider
            const provider = new ethers.providers.Web3Provider(wallet.provider);

            // Collect address
            const signer = await provider.getSigner();
            const address: string = await signer.getAddress();

            // Update provider, address, and raw address
            setProvider(provider);
            setAddress(address);
          } else {
            // Nullify data
            setProvider(null);
            setAddress(null);
          }
        },
      },
      // Force connect on walletCheck for WalletConnect
      walletCheck: [{ checkName: "network" }, { checkName: "connect" }],
    });

    // Update onboard
    setOnboard(onboard);
  }, []);

  return { address, provider, unlock };
}

// Create unstated-next container
export const eth = createContainer(useEth);
