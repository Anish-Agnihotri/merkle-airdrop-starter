import Head from "next/head"; // HTML Head

// Setup project details
const url: string = process.env.NEXT_PUBLIC_URL ?? "https://token.com/";
const tokenName: string = process.env.NEXT_PUBLIC_TOKEN_NAME ?? "Token Name";
const description: string =
  process.env.NEXT_PUBLIC_DESCRIPTION ?? "Some description";

export default function Meta() {
  return (
    <Head>
      {/* Fonts: Inter */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap`}
        rel="stylesheet"
      />

      {/* Primary Meta */}
      <title>{tokenName}</title>
      <meta name="title" content={tokenName} />
      <meta name="description" content={description} />

      {/* Open Graph + Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={tokenName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}meta.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={tokenName} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}meta.png`} />

      {/* Favicon */}
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}
