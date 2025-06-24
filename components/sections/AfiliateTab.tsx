import React, { useState } from "react";

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
        <div className="mt-12 sm:mt-32">
          <video
            className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[45vw] h-auto -mt-16 sm:-mt-28 lg:-mt-44 mb-36"
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
        </div>

        <div className="absolute bottom-0 w-full text-center p-4">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-6xl font-bold">
            <span className="text-custom">Earn</span> While You Edit
          </h1>
          <p className="text-white font-semibold text-base sm:text-lg lg:text-xl mt-1">
            Get £90+ per referral and 50% OFF the pack if accepted <br />
            into the affiliate programme.
          </p>
          <div className="mt-5">
            <a
              href="/affiliate"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 text-xl text-white border-2 border-custom rounded-[1rem] font-bold transition duration-150 cursor-pointer text-center"
            >
              Join now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateTab;
