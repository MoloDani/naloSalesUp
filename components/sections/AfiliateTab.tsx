import React, { useEffect, useState } from "react";

const AffiliateTab = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center h-screen w-full"
    >
      {/* Video Container */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <video
          className="lg:w-[70vw] h-auto align-middle -mt-40 mb-24"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false} // Ensures no controls are displayed
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {isSafari ? (
            <source src="/assets/Laptop_Affiliate.mov" type="video/quicktime" />
          ) : (
            <>
              <source src="/assets/Laptop_Affiliate.webm" type="video/webm" />
            </>
          )}
          {/* Fallback content if video fails to load */}
          Sorry, your browser doesn't support the video tag.
        </video>
        {/* Text Positioned at the Bottom, Over the Video */}
        <div className="absolute bottom-0 w-full text-center p-4 z-10">
          <h1 className="text-white text-[2rem] lg:text-[3rem] font-bold">
            Earn While You <span className="text-custom">Edit</span>
          </h1>
          <p className="text-white font-bold text-lg lg:text-xl mt-1">
            Get <span className="text-custom">£100+</span> per referral and{" "}
            <span className="text-custom">50% off</span> the pack if accepted
            into the affiliate <br /> program. Don’t{" "}
            <span className="text-custom">miss out</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AffiliateTab;
