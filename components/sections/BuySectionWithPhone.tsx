import React, { useState } from "react";

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const pound = 129,
    dolar = 167;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="buy-now"
      className="flex flex-row w-full items-center justify-center"
    >
      <img
        className="hidden lg:block max-w-[50vw] max-h-[95vh] pr-10 -ml-40"
        src="/assets/IPHONE_png_v2bg.png"
        alt="Picture"
      />
      <div className="flex flex-col pb-40">
        <h1 className="text-5xl font-bold mb-20">Never fall behind</h1>

        <p className=" text-xl mb-20 w-[30vw]">
          Regular updates to the Ultimate library mean you'll always be a step
          ahead of other editors
        </p>

        <a
          href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
          target="_blank"
          className=" p-2 pb-3 text-2xl text-white rounded-xl font-bold box-border transition-all duration-150 text-center group w-[200px] -mt-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: isHovered
              ? "transparent"
              : "linear-gradient(to bottom, #085f20, #64b76c)",
            borderRadius: "0.8rem",
            border: isHovered ? "2px solid #64b76c" : "2px solid black",
            padding: "10px 20px", // Make sure padding remains consistent
            boxSizing: "border-box", // Ensures the border doesn't affect the size
          }}
        >
          <span className="transition-all duration-300 text-white">
            Buy Now
          </span>
        </a>
      </div>
    </section>
  );
};

export default BuySection;
