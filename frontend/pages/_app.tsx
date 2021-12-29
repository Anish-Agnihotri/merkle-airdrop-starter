import "styles/global.scss"; // Global styles
import type { AppProps } from "next/app"; // Types

// Export application
export default function MerkleAirdropStarter({
  Component,
  pageProps,
}: AppProps) {
  return <Component {...pageProps} />;
}
