import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // --- countdown state ---
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  const price = isPound ? 179 : 245;
  const symbol = isPound ? "£" : "$";

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "BuySection_Button",
    });
    console.log("Button clicked");
  };

  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  // ---------- COUNTDOWN LOGIC ----------
  useEffect(() => {
    // next 1st of December (if it's already past this year, use next year)
    const getTargetDate = () => {
      const now = new Date();
      let year = now.getFullYear();
      const dec1ThisYear = new Date(year, 11, 1, 0, 0, 0); // month 11 = December
      if (now > dec1ThisYear) {
        year += 1;
      }
      return new Date(year, 11, 1, 0, 0, 0);
    };

    const targetDate = getTargetDate();

    const updateCountdown = () => {
      const now = new Date().getTime();
      let diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hourMs = 1000 * 60 * 60;
      const minMs = 1000 * 60;

      const hours = Math.floor(diff / hourMs);
      diff -= hours * hourMs;

      const minutes = Math.floor(diff / minMs);
      diff -= minutes * minMs;

      const seconds = Math.floor(diff / 1000);

      const h = String(hours).padStart(2, "0");
      const m = String(minutes).padStart(2, "0");
      const s = String(seconds).padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
    };

    updateCountdown(); // run immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="buy-now-desktop"
      className="flex flex-col lg:flex-row items-center justify-center w-full overflow-hidden px-4 -pt-20 py-5"
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

        {/* PRICE */}
        <h1
          className={`text-[8rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold -mt-10 sm:-mt-10 md:-mt-12 lg:-mt-16 ${
            isPound ? "white" : "text-custom"
          }`}
        >
          {symbol}
          {price}
        </h1>

        {/* BUTTON + COUNTDOWN */}
        <div className="flex items-center gap-6 -mt-8 sm:-mt-12 lg:-ml-[1.8rem]">
          <a
            href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative inline-block rounded-[1.6rem] w-[240px] sm:w-[300px] h-[100px] scale-[0.7]"
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

          {/* Countdown text */}
          <div className="text-3xl sm:text-4xl font-semibold text-white">
            {timeLeft}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;
