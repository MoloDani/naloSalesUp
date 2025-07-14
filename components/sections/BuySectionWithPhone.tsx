import React, { useState } from "react";

const BuySectionWithPhone = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="buy-now-phone"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full overflow-hidden px-4 sm:pt-12"
    >
      {/* iPhone mock-up */}
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
          <source src="/assets/phoneAnimMess.mov" type="video/quicktime" />
        ) : (
          <source src="/assets/phoneAnimMess.webm" type="video/webm" />
        )}
      </video>

      <img
        src="/assets/notification.png"
        alt=""
        className="block lg:hidden w-[90vw] -mb-10"
      />

      {/* Text + CTA */}
      <div className="flex flex-col items-center lg:items-start w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[32vw]">
        <h1 className="text-3xl sm:text-6xl font-bold mb-0 lg:mb-4 text-center lg:text-left lg:mx-0 sm:-mx-10 ">
          <span className="text-custom">Never</span> Fall Behind
        </h1>

        <p className="text-base sm:text-2xl mb-7 lg:mb-8 font-semibold text-center lg:text-left">
          +5 New assets delivered to you <br /> every single month
        </p>

        <a
          href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] ml-0 lg:-ml-[3.8rem] -mt-[1.8rem] h-[100px] scale-[0.7] lg:scale-[0.6] "
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
