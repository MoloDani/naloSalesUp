import Head from "next/head";
import React from "react";

export default function Policy() {
  return (
    <>
      <Head>
        <title>Store Policy</title>
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
      <section id="store policy">
        <div className="flex flex-col items-center gap-10 mx-72 my-20 text-center text-lg">
          <h1 className="text-3xl font-bold">STORE POLICY</h1>
          <h1 className="text-2xl">Customer Care</h1>
          <p>
            Nalo Visuals is committed to providing exceptional customer service.
            If you have any questions, issues, or need assistance with your
            purchase, please contact us here: <br />
            Email: support@nalovisuals.com <br />
            Instagram: @nalo.visuals <br />
            We aim to respond to all inquiries within 24 hours.
          </p>
          <p>
            Privacy & Safety <br /> Your privacy and safety are our top
            priorities. We ensure that your personal information is secure and
            handled with care.
          </p>
          <h1>Here's how we pretect your data:</h1>
          <p>
            Data Collection: <br />
            We collect only the information necessary to process your order and
            provide a personalized shopping experience.
          </p>
          <p>
            Payment Security: <br />
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
            Data Protection: <br />
            We use advanced security measures to protect your information from
            unauthorized access. For any privacy-related questions, please
            contact our{" "}
            <a href="" className="text-custom">
              Support
            </a>
          </p>{" "}
          {/* link to support page */}
          <p>
            We deliver our digital products instantly after purchase. You will
            receive a confirmation email with download instructions immediately
            after your payment is processed.
          </p>
          <p>
            Refund Policy <br />
            Due to the nature of digital products we cannot offer refunds, only
            for the following <span className="text-custom">reasons</span>{" "}
            {/*(bold si colorat) (link to Refund policy page)*/}. We will work
            with you to make sure that everything you purchase is working
            properly!
          </p>
          <p>
            Terms of Service <br />
            By using our website and purchasing our products, you agree to our
            terms and conditions. We reserve the right to update our policies at
            any time.
          </p>
          <p>
            Contact Us <br /> For any other inquiries, please feel free to reach
            out to us.
          </p>
          <p>
            Thank you for choosing{" "}
            <span className="text-custom">nalopacks.com</span> for your music
            video editing needs!
          </p>
        </div>
      </section>
    </>
  );
}
