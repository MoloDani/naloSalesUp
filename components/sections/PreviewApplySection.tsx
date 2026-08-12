import React, { useState } from "react";
import { BUY_LINK } from "@/lib/constants";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const PreviewApplySection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "PreviewApply_BuyNow_Button",
    });
  };

  return (
    <section
      id="preview-apply"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-2 w-full overflow-hidden px-4 py-16 lg:py-28"
    >
      {/* MEDIA (Video) - Left side on desktop */}
      <div className="order-1 w-full flex justify-center">
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
            src="/assets/Preview Part Vid.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* TEXT + CTA - Right side on desktop */}
      <div className="order-2 flex flex-col items-center lg:items-start w-full max-w-[95vw] sm:max-w-[70vw] lg:max-w-[40vw]">
        <h1 className="text-3xl sm:text-6xl lg:text-5xl font-bold mb-0 lg:mb-4 text-center lg:text-left lg:mx-0 sm:-mx-10">
          Preview & <span className="text-custom">Apply</span>
        </h1>

        <p className="text-center lg:text-left text-base sm:text-2xl lg:text-xl mb-6 font-semibold">
          Stop dragging and deleting. <br />
          Make sure it fits first.
        </p>

        <a
          href={BUY_LINK}
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="lg:origin-left align-center lg:align-left relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] -mt-[1.8rem] h-[100px] scale-[0.7] lg:scale-[0.6]"
        >
          <img
            src="/assets/button_idle.png"
            alt="Buy now"
            draggable={false}
            className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
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
    </section>
  );
};

export default PreviewApplySection;
