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
  const isHome = router.pathname === "/";
  const [loading, setLoading] = useState(isHome);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const t1 = setTimeout(() => {
      setLoading(false);
      // small delay so the fade-in class kicks in
      setTimeout(() => setFadeIn(true), 60);
    }, 3100);
    return () => clearTimeout(t1);
  }, []);

  return (
    <main className={`text-white ${inter.className} font-sans`}>
      <Head>
        <meta name="theme-color" content="#30ad31" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
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
      <Analytics />
      {isHome && loading ? (
        // only show the loader on `/`
        <LoadingScreen onFinish={() => setLoading(false)} />
      ) : (
        // on any other page (or after loader), just fade in your actual page
        <div
          className={`transition-opacity duration-1000 ease-in-out ${
            fadeIn || !isHome ? "opacity-100" : "opacity-0"
          }`}
        >
          <Component {...pageProps} />
        </div>
      )}
    </main>
  );
}
