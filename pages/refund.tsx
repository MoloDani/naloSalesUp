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
      </Head>
      <section id="refund policy">
        <div className="flex flex-col items-center gap-10 mx-[10vw] lg:mx-[30vw] my-20 text-left lg:text-lg">
          <h1 className="text-3xl font-bold mb-10">REFUND POLICY</h1>
          <p>
            *Due to the nature of digital products we cannot offer refunds but
            only for the below reason. We will work with you to make sure that
            everything you purchase is working properly*{" "}
          </p>
          <p>
            <span className="text-xl font-bold">
              Double Payment or Overcharge:
            </span>{" "}
            <br />
            If you believe that you have been charged twice for a single
            transaction or have experienced any overcharge issue related to the
            purchase of our packs, please contact us immediately at{" "}
            <a href="mailto:support@nalovisuals.com" className="underline">
              support@nalovisuals.com
            </a>{" "}
            or you can also contact our <a href="">Customer Care Team</a>{" "}
            {/*(link to issue the problem to support@nalovisuals.com)*/}
          </p>
          <p>
            <span className="text-xl font-bold">Refund Timeframe:</span> <br />{" "}
            We understand the urgency of resolving payment issues. Our
            commitment is to refund your money within 24 hours{" "}
            <i>(1 business day)</i> of confirming the double payment or
            overcharge. Please note that the actual time it takes for the refund
            to reflect in your account may vary depending on your payment
            provider.
          </p>
          <p>
            <span className="text-xl font-bold">How to Contact Us:</span> <br />
            To report a double payment or overcharge issue and request a refund
            for your editing packs, please contact our{" "}
            <a href="./support" className="underline">
              Support
            </a>
          </p>
          <p>
            <span className="text-xl font-bold">Our Commitment:</span> <br /> We
            are committed to providing excellent customer service and resolving
            any payment-related concerns related to your editing pack purchases
            promptly and efficiently. <br /> Your satisfaction is our priority.
          </p>
        </div>
      </section>
    </>
  );
}
