import React, { useState } from "react";
import { BUY_LINK } from "@/lib/constants";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const EditingMadeSimpleSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "EditingMadeSimple_BuyNow_Button",
    });
  };

  return (
    <section
      id="editing-made-simple"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 w-full overflow-hidden px-4 py-24 lg:py-28"
    >
      {/* TEXT + CTA - Left side on desktop */}
      <div className="order-2 lg:order-1 flex flex-col items-center lg:items-end w-full lg:w-1/2 max-w-[95vw] sm:max-w-[70vw] lg:max-w-none">
        <h1 className="text-3xl sm:text-6xl lg:text-5xl font-bold mb-0 lg:mb-4 text-center lg:text-right lg:mx-0 sm:-mx-10">
          Editing Made <span className="text-custom">Simple</span>
        </h1>

        <p className="text-center lg:text-right text-base sm:text-2xl lg:text-xl mb-6 font-semibold">
          Fewer clicks. Fewer distractions. <br />
          More productivity.
        </p>

        <a
          href={BUY_LINK}
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="lg:origin-right align-center lg:align-right relative inline-block rounded-[1.6rem] w-[180px] sm:w-[220px]"
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
            className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>
      </div>

      {/* MEDIA (Video) - Right side on desktop */}
      <div className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-start">
        <video
          className="w-auto h-[22vh] lg:h-[45vh] rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
        >
          <source
            src="/assets/Editing Made Simple Part.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};

export default EditingMadeSimpleSection;
