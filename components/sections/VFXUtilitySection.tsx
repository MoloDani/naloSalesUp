import React, { useState } from "react";
import { BUY_LINK } from "@/lib/constants";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const VFXUtilitySection = () => {
  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "VFXUtility_Button",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center w-full overflow-hidden px-4 py-16 lg:py-28">
      {/* Title + Video row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">

        {/* Video */}
        <video
          className="w-full max-w-[300px] sm:max-w-[450px] h-auto -mb-6"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {isSafari ? (
            <source
              src="/assets/VFX_Utility_Switch.mov"
              type="video/quicktime"
            />
          ) : (
            <source
              src="/assets/VFX_Utility_Switch.webm"
              type="video/webm"
            />
          )}
        </video>
      </div>

      {/* All In One */}
      <h3 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-white text-center mb-4">
        All In One
      </h3>

      {/* Description */}
      <p className="text-center text-base sm:text-2xl lg:text-xl mb-6 font-semibold">
        <span className="sm:whitespace-nowrap">147 presets, 100+ 2D/3D Overlays, 3D Objects, and the best productivity tool.</span>
        <br />
        No more searching through folders
      </p>

      {/* Buy Now button - same as MeetAnimation */}
      <a
        href={BUY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] h-[100px] scale-[0.7] sm:scale-[0.8]"
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
    </section>
  );
};

export default VFXUtilitySection;
