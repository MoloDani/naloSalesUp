import React, { useState } from "react";
import { BUY_LINK } from "@/lib/constants";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "BuySection_Button",
    });
  };

  return (
    <section
      id="buy-now-desktop"
      className="flex flex-col lg:flex-row items-center justify-center w-full overflow-hidden px-4 pt-0 pb-4 lg:py-28"
    >
      {/* Price Animation Video - Both phone and PC */}
      <video
        className="w-full max-w-[70vw] sm:max-w-[70vw] lg:max-w-[40vw] h-auto mb-8 lg:mb-0 lg:mr-8 -rotate-90"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        {isSafari ? (
          <source src="/assets/PRICE_GIF_ANIMATION.mov" type="video/quicktime" />
        ) : (
          <source src="/assets/PRICE_GIF_ANIMATION.webm" type="video/webm" />
        )}
      </video>

      {/* PRICE + CTA */}
      <div className="flex flex-col items-center lg:items-start">
        {/* Original price crossed out */}
        <p className="text-custom text-3xl sm:text-4xl lg:text-5xl font-bold line-through opacity-80">
          £149
        </p>

        {/* Current price */}
        <h1 className="text-white text-[6rem] sm:text-[8rem] lg:text-[11rem] font-bold leading-none -mt-2 lg:-mt-4">
          £59
        </h1>

        {/* Buy Now Button */}
        <a
          href={BUY_LINK}
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="relative inline-block w-[180px] sm:w-[220px] rounded-[1.6rem] mt-2 lg:mt-4"
        >
          <img
            src="/assets/button_idle.png"
            alt="Buy now"
            draggable={false}
            className={`w-full h-auto transition-opacity duration-150 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/assets/button_hovered.png"
            alt=""
            draggable={false}
            className={`w-full h-auto absolute inset-0 transition-opacity duration-150 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>
      </div>
    </section>
  );
};

export default BuySection;
