import LoadingScreen from "@/components/sections/LoadingScreenn";
import BackToTop from "@/components/utils/BackToTop";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const isHome = router.pathname === "/";
    if (!isHome) {
      setLoading(false);
      setFadeIn(true);
      return;
    }

    const t1 = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFadeIn(true), 60);
    }, 3100);

    return () => clearTimeout(t1);
  }, [router.isReady, router.pathname]);

  return (
    <main className={`text-white ${inter.className} font-sans`}>
      <Head>
        <meta name="description" content="Your description about Nalo Packs." />
        <meta property="og:title" content="Nalo Packs" />
        <meta
          property="og:description"
          content="Your description about Nalo Packs."
        />
        <title>Nalo Packs</title>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <Analytics />

      {loading ? (
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        <div
          className={`transition-opacity duration-1000 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <Component {...pageProps} />
        </div>
      )}
    </main>
  );
}
