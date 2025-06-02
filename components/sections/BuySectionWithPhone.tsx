// BuySectionWithPhone.tsx
import React, { useState } from "react";

const BuySectionWithPhone = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="buy-now-phone"
      className="
        flex flex-col lg:flex-row 
        w-full 
        items-center justify-center 
        py-16 
        px-4
      "
    >
      {/* IMAGE (only shows at lg+) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <img
          className="max-w-[400px] max-h-[600px]"
          src="/assets/IPHONE_png_v2bg.png"
          alt="Phone preview"
        />
      </div>

      {/* TEXT & BUTTON */}
      <div className="flex flex-col items-center lg:items-start lg:pl-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
          Never fall behind
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-center lg:text-left mb-8 w-full lg:w-[30vw]">
          Regular updates to the Ultimate library mean you'll always be a step
          ahead of other editors.
        </p>

        <a
          href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
          target="_blank"
          rel="noreferrer"
          className="
            text-3xl sm:text-4xl text-white 
            rounded-xl font-bold 
            box-border 
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
            padding: "12px 24px",
            boxSizing: "border-box",
            width: "220px",
          }}
        >
          <span className="transition-all duration-300">Buy Now</span>
        </a>
      </div>
    </section>
  );
};

export default BuySectionWithPhone;
