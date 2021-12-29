import Layout from "components/Layout"; // Layout wrapper
import { useEffect, useState } from "react";
import { eth } from "state/eth";
import styles from "styles/pages/Claim.module.scss";

/*
  States:
  1. Loading claim status and merkle entry state
  2. Already claimed state
  3. Pending claim state
  4. No claim available state
*/
export default function Claim() {
  // Global ETH state
  const { address, unlock }: { address: string | null; unlock: Function } =
    eth.useContainer();
  // Loading status
  const [loading, setLoading] = useState<boolean>(true);
  // Claimed
  const [claimed, setClaimed] = useState<boolean>(false);
  // Available tokens
  const [availableTokens, setAvailableTokens] = useState<number>(0);

  const collectClaimDetails = async () => {};

  // On load --> collect details about address
  useEffect(() => {
    // Collect only if authenticated
    if (address) {
      collectClaimDetails();
    }
  }, [address]);

  return (
    <Layout>
      <div className={styles.claim}>
        {!address ? (
          <div className={styles.card}>
            <h1>You are not authenticated.</h1>
            <p>Please connect with your wallet to check your airdrop.</p>
            <button onClick={() => unlock()}>Connect Wallet</button>
          </div>
        ) : loading ? (
          <div className={styles.card}>
            <h1>Loading airdrop details...</h1>
            <p>Please hold while we collect details about your address.</p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
