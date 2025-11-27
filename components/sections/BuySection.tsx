import React, { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySection = () => {
  const [isPound, setIsPound] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  const price = isPound ? 179 : 245;
  const symbol = isPound ? "£" : "$";

  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  // ---- width syncing (price -> CTA row) ----
  const priceRef = useRef<HTMLHeadingElement | null>(null);
  const [ctaWidth, setCtaWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (priceRef.current) {
        setCtaWidth(priceRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [price]);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "BuySection_Button",
    });
    console.log("Button clicked");
  };

  // ---------- COUNTDOWN LOGIC ----------
  useEffect(() => {
    const getTargetDate = () => {
      const now = new Date();
      let year = now.getFullYear();
      const dec1ThisYear = new Date(year, 11, 1, 0, 0, 0);
      if (now > dec1ThisYear) year += 1;
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

    updateCountdown();
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

      {/* Mobile static image */}
      <img
        src="/assets/usb-image.png"
        alt=""
        className="block lg:hidden w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[45vw] mb-16 h-auto lg:mb-0 lg:-mx-28"
      />

      {/* PRICE + CTA */}
      <div className="flex flex-col items-center lg:items-start">
        {/* This wrapper is just for alignment */}
        <div className="text-center lg:text-left">
          {/* Heading + toggle */}
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <h2 className="text-2xl lg:text-4xl font-semibold px-2 sm:px-5">
              Get it all for <span className="text-custom">just</span>
            </h2>

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

          {/* PRICE (we measure this) */}
          <h1
            ref={priceRef}
            className={`mx-auto lg:mx-0 text-[8rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-none -mt-6 sm:-mt-8 lg:-mt-10 ${
              isPound ? "text-white" : "text-custom"
            }`}
          >
            {symbol}
            {price}
          </h1>

          {/* BUTTON + COUNTDOWN – responsive, same line */}
          <div className="mt-4 flex w-full max-w-[350px] lg:max-w-[400px] items-center gap-4 mx-auto lg:mx-0">
            {/* Button grows/shrinks with available space */}
            <a
              href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleClick}
              className="relative flex-1 min-w-0 inline-block rounded-[1.6rem]"
            >
              {/* Use the container width, not fixed px – makes it responsive */}
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

            {/* Countdown keeps its natural width, stays on same line */}
            <div className="flex-none text-2xl sm:text-3xl md:text-4xl font-semibold text-white whitespace-nowrap">
              {timeLeft}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default BuySection;
