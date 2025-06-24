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
          <h1 className="text-3xl font-bold">TERMS OF SEVICE</h1>
          <p>
            <span className="text-xl font-bold">Privacy & Safety</span> <br />{" "}
            Your privacy and safety are our top priorities. We ensure that your
            personal information is secure and handled with care.
          </p>
          <p>
            <span className="text-xl font-bold">Data Collection:</span> <br />
            We collect only the information necessary to process your order and
            provide a personalized shopping experience.
          </p>
          <p>
            <span className="text-xl font-bold">Payment Security:</span> <br />
            All payments are processed securely through trusted third-party
            banking services{" "}
            <a
              href="https://stripe.com/en-ro/resources/more/payment-security"
              className="text-custom underline"
              target="_blank"
            >
              Stripe
            </a>
            . We do not store your payment details.
          </p>
          <p>
            <span className="text-xl font-bold">Data Protection:</span> <br />
            We use advanced security measures to protect your information from
            unauthorized access. For any privacy-related questions, please
            contact our{" "}
            <a href="./support" className="text-custom underline">
              Support
            </a>
          </p>
          <p>
            We deliver our digital products instantly after purchase. You will
            receive a confirmation email with download instructions immediately
            after your payment is processed.
          </p>
          <p>
            <span className="text-xl font-bold">Refund Policy</span> <br />
            Due to the nature of digital products we cannot offer refunds, only
            for the following{" "}
            <a href="./refund" className="text-custom underline">
              reasons
            </a>
            . We will work with you to make sure that everything you purchase is
            working properly!
          </p>
          <p>
            <span className="text-xl font-bold">Terms of Service</span> <br />
            By using our website and purchasing our products, you agree to our
            terms and conditions. We reserve the right to update our policies at
            any time.
          </p>
          <p className="">
            <span className="text-xl font-bold">Contact Us</span> <br />
            For any other inquiries, please feel free to reach out to us
          </p>
          <p className="align-middle">
            Thank you for choosing{" "}
            <a href="/" className="text-custom underline">
              nalopacks.com
            </a>{" "}
            for your music video editing needs!
          </p>
        </div>
      </section>
    </>
  );
}
