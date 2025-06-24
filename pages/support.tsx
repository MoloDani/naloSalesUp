import Head from "next/head";
import React from "react";

export default function Support() {
  return (
    <>
      <Head>
        <title>Support</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content={"NALO Visuals"} />
        <meta property="og:type" content="product"></meta>
      </Head>
      <section id="refund policy">
        <div className="flex flex-col items-center gap-8 mx-[10vw] lg:mx-[30vw] my-20 text-left lg:text-lg min-h-[70vh]">
          <h1 className="text-3xl font-bold mb-10">SUPPORT</h1>
          <p className="text-center">
            If you want any support or help with your purchase, or if you have
            any questions before purchasing, feel free to contact us using the
            methods below:
          </p>
          <a
            href="https://www.instagram.com/nalo.visuals/"
            target="_blank"
            className="font-bold"
          >
            Instagram: @nalo.visuals
          </a>
          <a href="tel:+447366268494" className="font-bold">
            Whatsapp: +44 7366 268494
          </a>
          <a href="mailto:nalovisuals@gmail.com" className="font-bold">
            Email: nalovisuals@gmail.com
          </a>
          <a
            href="https://discord.gg/Tp4cge7sBS"
            target="_blank"
            className="font-bold"
          >
            Discord Server
          </a>
        </div>
      </section>
    </>
  );
}
