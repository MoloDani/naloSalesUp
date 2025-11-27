import React, { useState } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySectionWithPhone = () => {
  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "BuyWithPhone_Button",
    });
    console.log("Button clicked");
  };

  return (
    <section
      id="buy-now-phone"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full overflow-hidden px-4 sm:pt-12 my-10 lg:my-0"
    >
      {/* MEDIA (Image on mobile, Video on desktop) */}
      <div className="order-1 lg:order-2 w-full flex justify-center">
        {/* Desktop video */}
        <video
          className="hidden lg:block w-auto lg:h-[80vh] lg:pr-10"
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
              src="/assets/re-rendered MOV Google Meet-1.mov"
              type="video/quicktime"
            />
          ) : (
            <source
              src="/assets/webm GOOGLE MEET ANIMATION 1.webm"
              type="video/webm"
            />
          )}
        </video>

        {/* Mobile image */}
        <img
          src="/assets/meet_image.png"
          alt="Preview"
          className="block lg:hidden h-[40vw] -mb-10"
        />
      </div>

      {/* TEXT + CTA */}
      <div className="order-2 lg:order-1 flex flex-col items-center lg:items-end w-full max-w-[95vw] sm:max-w-[70vw] lg:max-w-[40vw]">
        <h1 className="text-3xl sm:text-6xl font-bold mb-4 text-center lg:text-right">
          <span className="text-custom">1-1</span> Guidance
        </h1>

        <p className="text-center lg:text-right text-base sm:text-2xl mb-6 font-semibold">
          Everyone has a free 15–30 min call with us <br />
          to make sure you know how to use everything <br />
          (Perfect for beginners)
        </p>

        <a
          href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="align-center lg:align-right relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] -mt-[1.8rem] h-[100px] scale-[0.7] lg:scale-[0.6]"
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

export default BuySectionWithPhone;
