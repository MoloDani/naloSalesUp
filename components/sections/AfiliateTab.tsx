// AffiliateTab.tsx
import React from "react";

const AffiliateTab = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="affiliate"
      className="
        flex flex-col items-center justify-center 
        w-full 
        py-16
      "
    >
      {/* Video Container */}
      <div className="relative w-full max-w-[800px]">
        <video
          className="
            w-full 
            h-auto 
            rounded-lg 
            shadow-xl
            mb-36
          "
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {isSafari ? (
            <source src="/assets/coin_laptop_HEVC.mov" type="video/quicktime" />
          ) : (
            <source src="/assets/coin_laptop.webm" type="video/webm" />
          )}
          {/* Fallback */}
          Sorry, your browser doesn't support the video tag.
        </video>

        {/* Overlay Text */}
        <div className="absolute bottom-4 inset-x-0 text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="text-custom">Earn</span> While You Edit
          </h1>
          <p className="text-white font-semibold text-lg sm:text-xl lg:text-2xl mt-2">
            Get <span className="text-custom">£100+</span> per referral and{" "}
            <span className="text-custom">50% off</span> the pack if accepted
            into the affiliate program
            <br /> Don’t <span className="text-custom">miss out</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffiliateTab;
