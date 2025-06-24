import Head from "next/head";
import React from "react";

export default function Refund() {
  return (
    <>
      <Head>
        <title>Refund Policy</title>
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
      </Head>
      <section id="refund policy">
        <div className="flex flex-col items-center gap-10 mx-72 my-20 text-center text-lg">
          <h1 className="text-3xl font-bold mb-10">REFUND POLICY</h1>
          <p>
            *Due to the nature of digital products we cannot offer refunds but
            only for the below reason. We will work with you to make sure that
            everything you purchase is working properly*{" "}
          </p>
          <p>
            Double Payment or Overcharge: <br />
            If you believe that you have been charged twice for a single
            transaction or have experienced any overcharge issue related to the
            purchase of our packs, please contact us immediately at
            <a href="mailto:support@nalovisuals.com">
              support@nalovisuals.com
            </a>{" "}
            or you can also contact our <a href="">Customer Care Team</a>{" "}
            {/*(link to issue the problem to support@nalovisuals.com)*/}
          </p>
          <p>
            Refund Timeframe: <br /> We understand the urgency of resolving
            payment issues. Our commitment is to refund your money within 24
            hours (1 business day) of confirming the double payment or
            overcharge. Please note that the actual time it takes for the refund
            to reflect in your account may vary depending on your payment
            provider.
          </p>
          <p>
            How to Contact Us: <br />
            To report a double payment or overcharge issue and request a refund
            for your editing packs, please contact our <a href="">
              Support
            </a>{" "}
            (Link To Support Page)
          </p>
          <p>
            Our Commitment: <br /> We are committed to providing excellent
            customer service and resolving any payment-related concerns related
            to your editing pack purchases promptly and efficiently. <br /> Your
            satisfaction is our priority.
          </p>
        </div>
      </section>
    </>
  );
}
