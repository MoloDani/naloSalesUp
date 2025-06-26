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
        <div className="flex flex-col items-start gap-10 mx-[10vw] lg:mx-[30vw] my-20 text-left lg:text-lg">
          <p className="text-3xl font-bold mb-5">REFUND POLICY</p>
          <p>
            *We don’t offer refunds due to the nature of digital products except
            in the case of double payment or overcharge. We’ll make sure
            everything you buy works as expected.*
          </p>
          <p>
            <span className="text-xl font-bold">
              Double Payment or Overcharge:
            </span>{" "}
            <br />
            If you were charged twice or notice an overcharge, contact us right
            away at{" "}
            <a href="./support" className="underline font-bold">
              Support
            </a>
            .
          </p>
          <p>
            <span className="text-xl font-bold">Refund Timeframe:</span> <br />{" "}
            Once confirmed, we’ll process your refund within{" "}
            <span className="font-bold">24 hours (1 business day)</span> <br />{" "}
            Note: Your bank or payment provider might take longer to show the
            refund on your end.
          </p>
          <p>
            <span className="text-xl font-bold">How to Reach Us</span> <br />
            For any payment issues, email us at{" "}
            <a href="mailto:suport@nalovisuals.com" className="font-bold">
              suport@nalovisuals.com
            </a>
          </p>
          <p>
            <span className="text-xl font-bold">Our Commitment</span> <br /> We
            are committed to providing excellent customer service and resolving
            any payment-related concerns promptly and efficiently. <br /> Your
            satisfaction is our priority.
          </p>
        </div>
      </section>
    </>
  );
}
