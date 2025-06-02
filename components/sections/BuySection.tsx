// BuySection.tsx
import React, { useState } from "react";

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const pound = 129,
    dolar = 167;

  const [isHovered, setIsHovered] = useState(false);

  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="buy-now"
      className="
        flex flex-col lg:flex-row
        w-full
        items-center justify-center
        lg:-mt-32
        mt-16
        px-4
      "
    >
      {/* VIDEO */}
      <div className="w-full lg:w-[45vw] flex justify-center lg:justify-start mb-8 lg:mb-0">
        <video
          className="
            w-full
            max-w-[600px]
            h-auto
            rounded-lg
            shadow-lg
          "
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {isSafari ? (
            <source src="/assets/USB_LOOP.mov" type="video/quicktime" />
          ) : (
            <source src="/assets/USB_LOOP.webm" type="video/webm" />
          )}
          {/* Fallback */}
          Sorry, your browser doesn't support the video tag.
        </video>
      </div>

      {/* TEXT & TOGGLE & PRICE */}
      <div className="flex flex-col items-center lg:items-start">
        {/* Heading + Toggle on one line */}
        <div
          className="
            flex flex-row flex-wrap
            items-center
            justify-center
            sm:justify-start
            lg:justify-start
            gap-3
            sm:gap-4
            lg:gap-6
            mb-4
          "
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold px-2 mb-0">
            Get it all for <span className="text-custom">just</span>
          </h2>

          {/* Toggle Switch */}
          <div className="flex items-center">
            <label className="relative inline-block w-20 h-8 sm:w-24 sm:h-10 cursor-pointer">
              <input
                type="checkbox"
                checked={!isPound}
                onChange={() => setIsPound(!isPound)}
                className="sr-only peer cursor-pointer"
              />
              {/* Track */}
              <div className="w-full h-full bg-custom rounded-full peer-checked:bg-gray-300 transition-all"></div>
              {/* Thumb */}
              <div className="absolute top-[2px] left-[2px] w-9 h-7 sm:w-12 sm:h-9 bg-white rounded-full shadow-md flex items-center justify-center text-xs sm:text-base font-semibold text-gray-700 transition-all peer-checked:left-[2.6rem] sm:peer-checked:left-[2.8rem]">
                {isPound ? "GBP" : "USD"}
              </div>
            </label>
          </div>
        </div>

        {/* PRICE */}
        <h1
          className={`
            font-bold 
            mb-6 
            transition-all 
            animate-fade-in 
            hover:cursor-default
            ${isPound ? "text-white" : "text-custom"}
            text-[6rem]
            sm:text-[8rem]
            md:text-[10rem]
            lg:text-[12rem]
          `}
        >
          {isPound ? "£" : "$"}
          {isPound ? pound : dolar}
        </h1>

        {/* BUY BUTTON */}
        <a
          href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
          target="_blank"
          rel="noreferrer"
          className="
            text-3xl sm:text-4xl text-white 
            rounded-xl font-bold 
            transition-all duration-150 
            text-center
          "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered
              ? "transparent"
              : "linear-gradient(to bottom, #085f20, #64b76c)",
            borderRadius: "0.8rem",
            border: isHovered ? "2px solid #64b76c" : "2px solid black",
            padding: "14px 28px",
            boxSizing: "border-box",
          }}
        >
          <span className="transition-all duration-300">Buy Now</span>
        </a>
      </div>
    </section>
  );
};

export default BuySection;
