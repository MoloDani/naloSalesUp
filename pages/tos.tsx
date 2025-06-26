import Head from "next/head";
import React from "react";

export default function Policy() {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content={"NALO Visuals"} />
        <meta property="og:type" content="product"></meta>
      </Head>
      <section id="terms of service">
        <div className="flex flex-col items-start gap-10 mx-[10vw] lg:mx-[30vw] my-20 text-left lg:text-lg">
          <p className="-my-10">*for nerds*</p>
          <p className="text-3xl font-bold mb-5">TERMS OF SEVICE</p>
          <p>
            <span className="text-xl font-bold">Support</span> <br />
            If you need help with your purchase or setting up plugins, contact
            us: <br />
            <span className="font-bold">Email</span>:{" "}
            <a className="underline" href="mailto:support@nalovisuals.com">
              support@nalovisuals.com
            </a>{" "}
            <br />
            <span className="font-bold">Instagram</span>:{" "}
            <a
              className="underline"
              href="https://www.instagram.com/nalo.visuals/"
            >
              @nalo.visuals
            </a>{" "}
            <br />
            We usually reply within 24 hours (1 business day)
          </p>
          <p>
            <span className="text-xl font-bold">Privacy & Safety</span> <br />{" "}
            We only collect the info needed to process your order. Your data is
            protected and never shared. Payments are handled through{" "}
            <a
              href="https://stripe.com/en-ro/resources/more/payment-security"
              className="text-custom underline"
              target="_blank"
            >
              Stripe
            </a>
            .We don’t store your payment details. Your info is secured and used
            only to support your order. Contact{" "}
            <a
              href="mailto: support@nalovisuals.com"
              className="text-custom underline"
            >
              support
            </a>{" "}
            for privacy-related questions.
          </p>
          <p>
            <span className="text-xl font-bold">Delivery</span> <br />
            Downloads are sent instantly after payment. Check your email for the
            download link.
          </p>
          <p>
            <span className="text-xl font-bold">Refunds</span> <br />
            No refunds unless it qualifies under specific cases in our Refund
            Policy.We’ll always make sure your purchase works as promised.
          </p>

          <p>
            <span className="text-xl font-bold">Terms</span> <br />
            By using this site and buying from us, you agree to these terms. We
            may update them anytime.
          </p>
          <p>
            <span className="text-xl font-bold">Contact Us</span> <br />
            For any other inquiries, please feel free to reach out to us.
          </p>
          <p className="self-center font-bold">
            Thank you for choosing{" "}
            <a href="/" className="text-custom underline">
              nalopacks.com
            </a>{" "}
            for your music video editing needs 💚
          </p>
        </div>
      </section>
    </>
  );
}
