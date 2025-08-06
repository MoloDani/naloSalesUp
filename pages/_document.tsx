import Footer from "@/components/ui/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="description" content="Best Drill Editing Pack." />
        <meta property="og:title" content="Nalo Packs" />
        <meta property="og:description" content="Best Drill Editing Pack." />
        <meta property="og:image" content="https://nalopacks.com/preview.jpg" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`} // Replace with your GA ID
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXX'); // Replace with your GA ID
      `,
          }}
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
