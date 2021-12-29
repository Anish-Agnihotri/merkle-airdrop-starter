import Head from "next/head"; // HTML Head

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
    </Head>
  );
}
