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
        className="hidden lg:block max-w-[50vw] max-h-[50vh] pr-32"
        src="/assets/IPHONE_png_v2bg.png"
        alt="Picture"
      />
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h2 className="text-2xl lg:text-4xl font-semibold pl-10 mb-2 px-5">
            Get it all for <span className="text-custom">just</span>
          </h2>

          {/* Toggle Switch with Currency Inside */}
          <div className="flex z-10 items-center mx-5">
            <label className="relative inline-block w-20 h-7 lg:w-24 lg:h-9 cursor-pointer">
              <input
                type="checkbox"
                checked={!isPound}
                onChange={() => setIsPound(!isPound)}
                className="sr-only peer cursor-pointer"
              />
              {/* Track */}
              <div className="w-full h-full bg-custom rounded-full peer-checked:bg-gray-300 transition-all pointer-events-none"></div>
              {/* Thumb with Currency Text */}
              <div className="absolute top-1 left-1 w-10 h-5 lg:w-11 lg:h-7 bg-white rounded-full shadow-md flex items-center justify-center text-sm font-semibold text-gray-700 transition-all peer-checked:left-[2.3rem] lg:peer-checked:left-[3rem] pointer-events-none">
                {isPound ? "GBP" : "USD"}
              </div>
            </label>
          </div>
        </div>

        {/* Price Display with Smooth Transition */}
        <h1
          className={`text-[10rem] lg:text-[12rem] font-bold -mt-16 text-custom transition-all animate-fade-in hover:cursor-default ${!isPound ? "text-custom" : "text-white"}`}
        >
          {isPound ? "£" : "$"}
          {isPound ? pound : dolar}
        </h1>

        {/* Stripe Payment Button */}
        <a
          href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
          target="_blank"
          className="p-2 pb-3 text-2xl text-white rounded-xl font-bold box-border transition-all duration-150 text-center group"
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
