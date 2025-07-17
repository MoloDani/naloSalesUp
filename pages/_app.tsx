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
        <meta
          name="description"
          content="Get over 300+ premium editing assets, AE presets, overlays, 3D elements & SFX. Plus monthly free updates. Join Nalo Packs today!"
        />
        <meta
          property="og:title"
          content="Nalo Packs – Premium Editing Assets & Effects"
        />
        <meta
          property="og:description"
          content="Over 300+ premium assets for editors & directors. Includes AE presets, 3D objects, SFX, and more. Get monthly updates for free!"
        />
        <meta property="og:url" content="https://www.nalopacks.com" />
        <meta property="og:type" content="website" />
        <title>Nalo Packs</title>
        <link
          rel="icon"
          type="image/png"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAKMWlDQ1BJQ0MgUHJvZmlsZQAAeJydlndUU9kWh8+9N71QkhCKlNBraFICSA29SJEuKjEJEErAkAAiNkRUcERRkaYIMijggKNDkbEiioUBUbHrBBlE1HFwFBuWSWStGd+8ee/Nm98f935rn73P3Wfvfda6AJD8gwXCTFgJgAyhWBTh58WIjYtnYAcBDPAAA2wA4HCzs0IW+EYCmQJ82IxsmRP4F726DiD5+yrTP4zBAP+flLlZIjEAUJiM5/L42VwZF8k4PVecJbdPyZi2NE3OMErOIlmCMlaTc/IsW3z2mWUPOfMyhDwZy3PO4mXw5Nwn4405Er6MkWAZF+cI+LkyviZjg3RJhkDGb+SxGXxONgAoktwu5nNTZGwtY5IoMoIt43kA4EjJX/DSL1jMzxPLD8XOzFouEiSniBkmXFOGjZMTi+HPz03ni8XMMA43jSPiMdiZGVkc4XIAZs/8WRR5bRmyIjvYODk4MG0tbb4o1H9d/JuS93aWXoR/7hlEH/jD9ld+mQ0AsKZltdn6h21pFQBd6wFQu/2HzWAvAIqyvnUOfXEeunxeUsTiLGcrq9zcXEsBn2spL+jv+p8Of0NffM9Svt3v5WF485M4knQxQ143bmZ6pkTEyM7icPkM5p+H+B8H/nUeFhH8JL6IL5RFRMumTCBMlrVbyBOIBZlChkD4n5r4D8P+pNm5lona+BHQllgCpSEaQH4eACgqESAJe2Qr0O99C8ZHA/nNi9GZmJ37z4L+fVe4TP7IFiR/jmNHRDK4ElHO7Jr8WgI0IABFQAPqQBvoAxPABLbAEbgAD+ADAkEoiARxYDHgghSQAUQgFxSAtaAYlIKtYCeoBnWgETSDNnAYdIFj4DQ4By6By2AE3AFSMA6egCnwCsxAEISFyBAVUod0IEPIHLKFWJAb5AMFQxFQHJQIJUNCSAIVQOugUqgcqobqoWboW+godBq6AA1Dt6BRaBL6FXoHIzAJpsFasBFsBbNgTzgIjoQXwcnwMjgfLoK3wJVwA3wQ7oRPw5fgEVgKP4GnEYAQETqiizARFsJGQpF4JAkRIauQEqQCaUDakB6kH7mKSJGnyFsUBkVFMVBMlAvKHxWF4qKWoVahNqOqUQdQnag+1FXUKGoK9RFNRmuizdHO6AB0LDoZnYsuRlegm9Ad6LPoEfQ4+hUGg6FjjDGOGH9MHCYVswKzGbMb0445hRnGjGGmsVisOtYc64oNxXKwYmwxtgp7EHsSewU7jn2DI+J0cLY4X1w8TogrxFXgWnAncFdwE7gZvBLeEO+MD8Xz8MvxZfhGfA9+CD+OnyEoE4wJroRIQiphLaGS0EY4S7hLeEEkEvWITsRwooC4hlhJPEQ8TxwlviVRSGYkNimBJCFtIe0nnSLdIr0gk8lGZA9yPFlM3kJuJp8h3ye/UaAqWCoEKPAUVivUKHQqXFF4pohXNFT0VFysmK9YoXhEcUjxqRJeyUiJrcRRWqVUo3RU6YbStDJV2UY5VDlDebNyi/IF5UcULMWI4kPhUYoo+yhnKGNUhKpPZVO51HXURupZ6jgNQzOmBdBSaaW0b2iDtCkVioqdSrRKnkqNynEVKR2hG9ED6On0Mvph+nX6O1UtVU9Vvuom1TbVK6qv1eaoeajx1UrU2tVG1N6pM9R91NPUt6l3qd/TQGmYaYRr5Grs0Tir8XQObY7LHO6ckjmH59zWhDXNNCM0V2ju0xzQnNbS1vLTytKq0jqj9VSbru2hnaq9Q/uE9qQOVcdNR6CzQ+ekzmOGCsOTkc6oZPQxpnQ1df11Jbr1uoO6M3rGelF6hXrtevf0Cfos/ST9Hfq9+lMGOgYhBgUGrQa3DfGGLMMUw12G/YavjYyNYow2GHUZPTJWMw4wzjduNb5rQjZxN1lm0mByzRRjyjJNM91tetkMNrM3SzGrMRsyh80dzAXmu82HLdAWThZCiwaLG0wS05OZw2xljlrSLYMtCy27LJ9ZGVjFW22z6rf6aG1vnW7daH3HhmITaFNo02Pzq62ZLde2xvbaXPJc37mr53bPfW5nbse322N3055qH2K/wb7X/oODo4PIoc1h0tHAMdGx1vEGi8YKY21mnXdCO3k5rXY65vTW2cFZ7HzY+RcXpkuaS4vLo3nG8/jzGueNueq5clzrXaVuDLdEt71uUnddd457g/sDD30PnkeTx4SnqWeq50HPZ17WXiKvDq/XbGf2SvYpb8Tbz7vEe9CH4hPlU+1z31fPN9m31XfKz95vhd8pf7R/kP82/xsBWgHcgOaAqUDHwJWBfUGkoAVB1UEPgs2CRcE9IXBIYMj2kLvzDecL53eFgtCA0O2h98KMw5aFfR+OCQ8Lrwl/GGETURDRv4C6YMmClgWvIr0iyyLvRJlESaJ6oxWjE6Kbo1/HeMeUx0hjrWJXxl6K04gTxHXHY+Oj45vipxf6LNy5cDzBPqE44foi40V5iy4s1licvvj4EsUlnCVHEtGJMYktie85oZwGzvTSgKW1S6e4bO4u7hOeB28Hb5Lvyi/nTyS5JpUnPUp2Td6ePJninlKR8lTAFlQLnqf6p9alvk4LTduf9ik9Jr09A5eRmHFUSBGmCfsytTPzMoezzLOKs6TLnJftXDYlChI1ZUPZi7K7xTTZz9SAxESyXjKa45ZTk/MmNzr3SJ5ynjBvYLnZ8k3LJ/J9879egVrBXdFboFuwtmB0pefK+lXQqqWrelfrry5aPb7Gb82BtYS1aWt/KLQuLC98uS5mXU+RVtGaorH1futbixWKRcU3NrhsqNuI2ijYOLhp7qaqTR9LeCUXS61LK0rfb+ZuvviVzVeVX33akrRlsMyhbM9WzFbh1uvb3LcdKFcuzy8f2x6yvXMHY0fJjpc7l+y8UGFXUbeLsEuyS1oZXNldZVC1tep9dUr1SI1XTXutZu2m2te7ebuv7PHY01anVVda926vYO/Ner/6zgajhop9mH05+x42Rjf2f836urlJo6m06cN+4X7pgYgDfc2Ozc0tmi1lrXCrpHXyYMLBy994f9Pdxmyrb6e3lx4ChySHHn+b+O31w0GHe4+wjrR9Z/hdbQe1o6QT6lzeOdWV0iXtjusePhp4tLfHpafje8vv9x/TPVZzXOV42QnCiaITn07mn5w+lXXq6enk02O9S3rvnIk9c60vvG/wbNDZ8+d8z53p9+w/ed71/LELzheOXmRd7LrkcKlzwH6g4wf7HzoGHQY7hxyHui87Xe4Znjd84or7ldNXva+euxZw7dLI/JHh61HXb95IuCG9ybv56Fb6ree3c27P3FlzF3235J7SvYr7mvcbfjT9sV3qID0+6j068GDBgztj3LEnP2X/9H686CH5YcWEzkTzI9tHxyZ9Jy8/Xvh4/EnWk5mnxT8r/1z7zOTZd794/DIwFTs1/lz0/NOvm1+ov9j/0u5l73TY9P1XGa9mXpe8UX9z4C3rbf+7mHcTM7nvse8rP5h+6PkY9PHup4xPn34D94Tz+6TMXDkAAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAA8hJREFUeJzt2UtonUUUB/Bf0jYqapNUqtjGkgafVHxVrYIvfC/cCbVosCAudKGgCwUr2iL42ogLcaFQUQQ3ii6sYlUEiw2togSq+KjFR6v2YSy2qKkmLuaL3kzmeyS5H5fC/cOF+/3nzJnzn/nmzJl7O8bHxx3O6Gx1ALNFW0Cr0RbQahz2AuY2Pix75aJm+T0Db2MM6/BCsxxvWzU06bmuFViFJejHejxS0zi1CZgbPT+Iq+oYqC4BRye4x5rkZxLqEtCT4M7P4fOwGj/iY6zIM6pLwPEJrgMLp+FjrSB4OYZwecqoLgEDOXzVynGpkAAasRHdsWEdArpxck5bV0Uftye4ebgvJusQcA7m5LRNmcEc3JnD3xUTdQi4saAttTdirEFvTtvemIgFDOBmnFhhoBTmCNkjD0tL+p+g+NB7PSZiAR/gZWyXfg/LsBbzC9qvL2g7Khu/o8Dmq5iIBZzU4Ow5PFTgLMaAcOIW4TrpDb4Cwzi9pP+OmIgFvBc9r8NLgqAi9GNTic0EhnA3rsQgXsy4vMzViO0xEdcsT5haswziMtyD1xJOb8LzOKZCAHAcnq5o24jf8F1MxgI24gf/v0oTWIJX8Ynwnv4sZJRLcHHJwGM4oHhvVMEuHIrJWAA8g8dznCzPPtPB+7gNm7F4mn0bsSdFps6B9bMYJIUHhFW9EF/Ows/uFJkSsFuYtWZgDbZm33fhLCEpzASVBdCcVXgKj0bcKG7FNUJC2B+1/4oPM7sYI6lBUnuAcOKNmSzwG6E+vyI/5v+CvFfYS3l4N/t0YxkW4KCwWvPxfaJPLBb5Ag5gA25o4I7EtcLsDeJS9GVt/+BrvIFnJdJdDvbjo4g7RboYPJhykCeAkDYbBfRhpVBqbMgG6RMOud+xs1LI5ci7M/yVIosEvJXgVgsCCLOeN9O9wu2rF8cKIjuz4P4UZnNEqC73Zb4mMJzj8+8UWSTgF3yKcxu4qyObhTgPZwrv8qlYJBxypRdyYb/swU/4Fp8JG3nU1MtPcmWKBMA7JgvoECrOUaEwu0B5nVSELuFwWyxc+ldm/FjCNnlJKhOwCfdH3MPTCHCmSKX3I6oaNmKz9Gy0AslisUzAPokStkXoSZFV7sRbmhvHjBFXyCjfA/AkbpnmYHuFwm2HUMjtFGqZEfwhlMWdQgLoEe7Ci7Ig+3GaivfyKgKGhZtZ0eb9XKhhtmT227JAZ4p5wk/0Zwsn/gIh+01BFQGyzl24I+szmgX7plC5fjGLYFM4JEzEsJLqtaP9P3GL0RbQarQFtBptAa3GvxYVqy1E5LO1AAAAAElFTkSuQmCC"
        />
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
