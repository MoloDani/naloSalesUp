import Footer from "@/components/ui/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="relative">
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
