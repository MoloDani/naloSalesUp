import Footer from "@/components/ui/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="description" content="Your description about Nalo Packs." />
        <meta property="og:title" content="Nalo Packs" />
        <meta
          property="og:description"
          content="Your description about Nalo Packs."
        />
      </Head>
      <body className="relative">
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
