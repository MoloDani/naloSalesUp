import React, { useState } from "react";

const AffiliateTab = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="affiliate"
      className="flex flex-col items-center justify-center h-screen w-full overflow-hidden px-4 -my-[8vh]"
    >
      <div className="relative flex flex-col items-center w-full">
        <video
          className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[45vw] h-auto -mt-16 sm:-mt-28 lg:-mt-40 mb-28"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
        >
          {isSafari ? (
            <source src="/assets/coin_laptop_HEVC.mov" type="video/quicktime" />
          ) : (
            <source src="/assets/coin_laptop.webm" type="video/webm" />
          )}
        </video>

        <div className="absolute bottom-0 w-full text-center p-4">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
            <span className="text-custom">Earn</span> While You Edit
          </h1>
          <p className="text-white font-semibold text-base sm:text-lg lg:text-xl mt-1">
            Get <span className="text-custom">£100+</span> per referral and{" "}
            <span className="text-custom">50% OFF</span> the pack if accepted{" "}
            <br />
            into the affiliate programme.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffiliateTab;
