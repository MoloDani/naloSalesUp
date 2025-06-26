import Head from "next/head";
import React from "react";

export default function Refund() {
  return (
    <>
      <Head>
        <title>Affiliate Terms</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content={"NALO Visuals"} />
        <meta property="og:type" content="product"></meta>
      </Head>
      <section id="affiliate">
        <div className="flex flex-col items-center text-center gap-10 mx-[10vw] lg:mx-[30vw] my-20  lg:text-lg">
          <h1 className="text-3xl font-bold">
            Nalo Affiliate Program Terms & Conditions
          </h1>
          <p>
            <span className="text-xl font-bold">Eligibility</span> <br />
            Affiliates must own a verified payout account (e.g., PayPal, bank,
            etc.).
          </p>
          <p>
            <span className="text-xl font-bold">Commission Structure</span>{" "}
            <br />
            You’ll earn a fixed percentage for each successful referral sale
            tracked via your unique link.
          </p>
          <p>
            <span className="text-xl font-bold">Payout Schedule</span> <br />
            Payouts are issued monthly, 15 days after the end of each month.
          </p>
          <p>
            <span className="text-xl font-bold">Promotion Guidelines</span>{" "}
            <br />
            Affiliates must use ethical promotion methods - no spam or
            misleading claims.
          </p>
          <p>
            <span className="text-xl font-bold">Use of Assets</span> <br />
            Do not resell, redistribute, or share ANY assets from the pack.
            Doing so results in immediate removal from the program and
            forfeiture of commissions.
          </p>
          <p>
            <span className="text-xl font-bold">Termination</span> <br />
            We reserve the right to remove affiliates for any violation of terms
            or unethical behavior.
          </p>
        </div>
      </section>
    </>
  );
}
