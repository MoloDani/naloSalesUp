import React, { useState } from "react";

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const pound = 129,
    dolar = 167;

  return (
    <section id="buy-now" className="flex flex-col items-center p-6 relative">
      <img className="w-[40vw] mb-4" src="" alt="Picture" />
      <div className="flex flex-col justify-start self-end">
        <h2 className="text-4xl font-semibold mb-2">
          Get it all for <span className="text-custom">just</span>
        </h2>

        {/* Toggle Switch with Currency Inside */}
        <div className="flex z-10 items-center gap-3 mb-4 self-end -mt-10">
          <label className="relative inline-block w-24 h-10 cursor-pointer">
            <input
              type="checkbox"
              checked={!isPound}
              onChange={() => setIsPound(!isPound)}
              className="sr-only peer cursor-pointer"
            />
            {/* Track */}
            <div className="w-full h-full bg-custom rounded-full peer-checked:bg-gray-300 transition-all pointer-events-none"></div>
            {/* Thumb with Currency Text */}
            <div className="absolute top-1 left-1 w-11 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-sm font-semibold text-gray-700 transition-all peer-checked:left-[3rem] pointer-events-none">
              {isPound ? "GBP" : "USD"}
            </div>
          </label>
        </div>

        {/* Price Display with Smooth Transition */}
        <h1
          className={`text-[12rem] font-bold -mt-16 text-custom transition-all animate-fade-in hover:cursor-default ${!isPound ? "text-custom" : "text-white"}`}
        >
          {isPound ? "£" : "$"}
          {isPound ? pound : dolar}
        </h1>

        {/* Stripe Payment Button */}
        <a
          href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd" // Replace with your Stripe link
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 w-[300px] text-white text-xl font-bold rounded-xl border-4 border-custom bg-custom transition-all hover:bg-transparent hover:text-custom"
        >
          Buy Now
        </a>
      </div>
    </section>
  );
};

export default BuySection;
