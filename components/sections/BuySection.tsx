import React, { useState } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const price = isPound ? 179 : 245;
  const symbol = isPound ? "£" : "$";

  const handleClick = () => {
    window.gtag?.('event', 'click', {
      event_category: 'Button',
      event_label: 'HeroButton',
    });
    console.log('Button clicked');
  };


  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="buy-now-desktop"
      className="flex flex-col lg:flex-row items-center justify-center w-full overflow-hidden px-4 pt-0"
    >
      {/* USB loop */}
      <video
        className="hidden lg:block w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[45vw] h-auto mb-10 lg:mb-0 lg:-mx-28"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        {isSafari ? (
          <source src="/assets/USB_LOOP.mov" type="video/quicktime" />
        ) : (
          <source src="/assets/USB_LOOP.webm" type="video/webm" />
        )}
      </video>

      <img
        src="/assets/usb-image.png"
        alt=""
        className="block lg:hidden w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[45vw] mb-16  h-auto lg:mb-0 lg:-mx-28"
      />

      {/* Price + CTA */}
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex items-center mb-2 lg:pr-36 sm:pr-0">
          <h2 className="text-2xl sm:text-2xl lg:text-4xl font-semibold px-2 sm:px-5 text-center lg:text-left">
            Get it all for <span className="text-custom">just</span>
          </h2>

          {/* Currency toggle */}
          <label className="relative inline-block w-[4.5rem] sm:w-20 lg:w-24 h-7 lg:h-9 cursor-pointer ml-2 -mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={!isPound}
              onChange={() => setIsPound(!isPound)}
              className="sr-only peer"
            />
            <div className="w-full h-full bg-custom rounded-full peer-checked:bg-gray-300 transition-all" />
            <div className="absolute top-1 left-1 w-10 h-5 lg:w-11 lg:h-7 bg-white rounded-full shadow-md flex items-center justify-center text-xs sm:text-sm font-semibold text-gray-700 transition-all peer-checked:left-[1.8rem] lg:peer-checked:left-[3rem]">
              {isPound ? "GBP" : "USD"}
            </div>
          </label>
        </div>

        {/* ---------- PRICE (colour now swaps!) ---------- */}
        <h1
          className={`text-[8rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold -mt-10 sm:-mt-10 md:-mt-12 lg:-mt-16
            ${isPound ? "white" : "text-custom"}`}
        >
          {symbol}
          {price}
        </h1>

        <a
          href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="relative inline-block rounded-[1.6rem] w-[240px] sm:w-[300px] -mt-8 sm:-mt-12 h-[100px] scale-[0.7] lg:-ml-[1.8rem]"
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

export default BuySection;
