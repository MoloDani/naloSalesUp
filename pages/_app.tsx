import LoadingScreen from "@/components/sections/LoadingScreenn";
import Navbar from "@/components/ui/Navbar";
import BackToTop from "@/components/utils/BackToTop";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API request
    setTimeout(() => setLoading(false), 6500);
  }, []);

  return (
    <main className={`text-white ${inter.className} font-sans`}>
      <Head>
        <meta name="theme-color" content="#30ad31" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta property="og:title" content={"NALO Visuals"} />
        <meta property="og:type" content="product"></meta>
        <meta
          name="description"
          content={"Fastest VFX Post Porduction Agency"}
        />
        <meta
          property="og:description"
          content={"Fastest VFX Post Porduction Agency"}
        />
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta
          property="twitter:image"
          content={`https://media.discordapp.net/attachments/1044673805966135306/1148215648154046584/logo512.webp`}
        ></meta>
        <meta
          property="og:image"
          content={`https://media.discordapp.net/attachments/1044673805966135306/1148215648154046584/logo512.webp`}
        ></meta>
        <title>NALO Sale</title>
      </Head>
      <BackToTop />
      <Navbar />
      <div>
        {loading ? (
          <LoadingScreen onFinish={() => setLoading(false)} />
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </main>
  );
}
