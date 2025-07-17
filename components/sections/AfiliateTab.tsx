import React, { useState } from "react";

//I just need a small change
const AffiliateTab = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="affiliate"
      className="flex flex-col items-center justify-center w-full overflow-hidden px-4 "
    >
      <div className="relative flex flex-col items-center w-full">
        <div className="mt-12 sm:mt-32 mb-5 lg:mb-5">
          <video
            className="hidden lg:block w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[45vw] h-auto -mt-16 sm:-mt-28 lg:-mt-44 mb-44 lg:mb-48"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
          >
            {isSafari ? (
              <source
                src="/assets/coin_laptop_HEVC.mov"
                type="video/quicktime"
              />
            ) : (
              <source src="/assets/coin_laptop.webm" type="video/webm" />
            )}
          </video>

          <img
            src="/assets/laptop_affiliate-img.png"
            alt=""
            className="block lg:hidden w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[45vw] h-auto -mt-16 sm:-mt-28 lg:-mt-44 mb-44 lg:mb-48"
          />
        </div>

        <div className="absolute bottom-0 w-full text-center p-4">
          <h1 className="text-white text-3xl sm:text-6xl lg:text-6xl font-bold">
            <span className="text-custom">Earn</span> While You Edit
          </h1>
          <p className="text-white font-semibold text-base sm:text-lg lg:text-2xl mt-1">
            Get £90+ per referral and 50% OFF the pack if
            <br /> accepted into the affiliate programme.
          </p>
          <div className="mt-7">
            <a
              href="/affiliate.html"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] ml-0 -mt-[1.8rem] h-[100px] scale-[0.7] lg:scale-[0.6] "
            >
              <img
                src="/assets/Apply-1.png"
                alt="Buy now"
                draggable={false}
                className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src="/assets/Apply-2.png"
                alt=""
                draggable={false}
                className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateTab;
