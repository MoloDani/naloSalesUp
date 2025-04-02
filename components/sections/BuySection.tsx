import React, { useState } from "react";

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const pound = 129,
    dolar = 167;

  return (
    <section id="buy-now" className="flex flex-col w-screen items-center">
      <img className="hidden lg:block w-[40vw] mb-4" src="" alt="Picture" />
      <div className="flex flex-col ">
        <div className="flex flex-row">
          <h2 className="text-2xl lg:text-4xl font-semibold pl-10 mb-2">
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
          rel="noopener noreferrer"
          className="px-5 py-3 text-center text-white text-xl font-bold rounded-xl bg-gradient-to-t from-[#65b87c] to-[#085f2b] transition-all duration-200 
             hover:from-transparent hover:to-transparent hover:border-2 hover:border-[#085f2b] hover:text-[#085f2b]"
        >
          Buy Now
        </a>
      </div>
    </section>
  );
};

export default BuySection;
