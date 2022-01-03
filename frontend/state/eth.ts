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
    networkId,
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
      // Initialize wallet
      const walletSelected: boolean = await onboard.walletSelect();
      // If initialized, ready wallet
      if (walletSelected) {
        await onboard.walletCheck();
      }
    }
  };

  /**
   * Initialize onboard instance and store
   */
  const initializeOnboard = () => {
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
        // On address update
        address: async (address) => {
          // Update address
          setAddress(address);
          // If no address, nullify provider
          if (!address) {
            setProvider(null);
          }
        },
        // On wallet update
        wallet: async (wallet) => {
          // If wallet provider exists
          if (wallet.provider) {
            // Collect ethers provider
            const provider = new ethers.providers.Web3Provider(wallet.provider);

            // Update provider
            setProvider(provider);

            // Update selected wallet
            window.localStorage.setItem("selectedWallet", wallet.name ?? "");
          } else {
            // Nullify data
            setProvider(null);
          }
        },
      },
      // Force connect on walletCheck for WalletConnect
      walletCheck: [{ checkName: "connect" }, { checkName: "network" }],
    });

    // Update onboard
    setOnboard(onboard);
  };

  // --> Lifecycle: on mount
  useEffect(initializeOnboard, []);
  useEffect(() => {
    // If wallet was already selected and onboard exists
    const previouslySelectedWallet =
      window.localStorage.getItem("selectedWallet");
    if (previouslySelectedWallet && onboard) {
      // Select, existing wallet
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  return { address, provider, unlock };
}

// Create unstated-next container
export const eth = createContainer(useEth);
