import LandingAffiliate from "@/components/sections/LandingAffiliate";
import Head from "next/head";
import React, { useState } from "react";

export default function Refund() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Head>
        <title>Affiliate</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content={"NALO Visuals"} />
        <meta property="og:type" content="product"></meta>
      </Head>
      <section id="affiliate">
        <LandingAffiliate />
        <div className="flex flex-col gap-10 mx-[10vw] lg:mx-[30vw] my-20 items-center lg:text-lg text-center">
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              What Is NALO Affiliate Program?
            </span>{" "}
            <br />A way to earn money by promoting our editing pack. You'll get
            the pack for free, work 1:1 with our team, and make up to 50%
            commission on each sale you bring in.
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              How Do I Join?
            </span>{" "}
            <br />
            Fill out the Google Form at the bottom of this page. Only those
            accepted will be charged £90 to join.
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              Why Do I Have To Pay £90?
            </span>{" "}
            <br /> -You earn that back on your first sale <br />
            -It filters out people who just want the pack for free (main reason
            lol) <br />
            -It makes sure you're committed to making content and selling
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              What If I Don't Make Any Sales?
            </span>{" "}
            <br /> If you don't make a sale after one full month of consistent
            posting (at least 15 posts), we'll refund your £90 after 2 weeks
            from your last post. We're confident that won't happen if you're
            consistent
          </p>
          <p className="mb-20">
            {" "}
            <span className="font-bold text-custom text-lg lg:text-4xl">
              What If I Already Bought The Pack?
            </span>{" "}
            <br />
            You'll be accepted automatically. On your first affiliate sale,
            you'll get £180 back instead of just £90. Then you earn 50% or 30%
            from future sales depending on you
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              How Much Can I Earn?
            </span>{" "}
            <br />
            -50% commission if you film & edit <br />
            -30% commission if you only film and we edit <br />
            All tracked through your unique affiliate link. <br />
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              What Do You Get if You're Accepted?
            </span>{" "}
            <br />
            -Free access to the pack <br />
            -Make your £90 back on the first sale than just profit <br />
            -1:1 help with marketing, editing, strategies <br />
            -Collab posts with us <br />
            -Boost your personal brand <br />
          </p>
          <p className="mb-20">
            <span className="font-bold text-custom text-lg lg:text-4xl">
              This Is NOT for You If:
            </span>{" "}
            <br />
            -You're lazy, lack belief, unteachable and don’t have time <br />
            -You can't invest £90 in something long-term <br />
            -You don't like working in a team <br />
            -You're not into creating content <br />
            -You don't have a decent camera or basic editing knowledge <br />
          </p>
          <p>
            <a
              href="https://forms.gle/v1F2JrDniJ47S8F77"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] -mt-[1.8rem] h-[100px] scale-[0.5] -mb-8"
            >
              <img
                src="/assets/Apply Here - 1.png"
                alt="Buy now"
                draggable={false}
                className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src="/assets/Apply Here - 2.png"
                alt=""
                draggable={false}
                className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>{" "}
            <br />
            If you’re accepted, we’ll contact you and have a 30 min call before
            we get started. Don’t waste our time if you know you’re not a good
            fit.
          </p>
        </div>
      </section>
    </>
  );
}
