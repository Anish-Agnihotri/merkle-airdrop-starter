import Image from "next/image";
import Layout from "components/Layout"; // Layout wrapper
import styles from "styles/pages/Home.module.scss"; // Page styles

const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";
const heading: string = process.env.NEXT_PUBLIC_HEADING ?? "Some heading";
const description: string =
  process.env.NEXT_PUBLIC_DESCRIPTION ?? "Some description";

export default function Home() {
  return (
    <Layout>
      <div className={styles.home}>
        <div>
          <Image
            src={process.env.NEXT_PUBLIC_LOGO_PATH ?? "/logo.png"}
            alt="Logo"
            width={250}
            height={250}
          />
        </div>
        {process.env.NEXT_PUBLIC_ARTICLE ? (
          <a
            href={process.env.NEXT_PUBLIC_ARTICLE}
            target="_blank"
            rel="noopener noreferrer"
          >
            Introducing {tokenName}{" "}
            <Image src="/arrow.svg" alt="Arrow" height={12} width={12} />
          </a>
        ) : null}
        <h1>{heading}</h1>
        <p>{description}</p>
        <button disabled>Connect Wallet to Claim Tokens</button>
      </div>
    </Layout>
  );
}
