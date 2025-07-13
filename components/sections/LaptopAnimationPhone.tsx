import React from "react";

const LaptopAnimationPhone: React.FC = () => {
  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const videoSrc = isSafari
    ? "/assets/promo_video.mov"
    : "/assets/promo_video.webm";
  const videoType = isSafari ? "video/mov" : "video/webm";

  return (
    <section
      id="promo-video"
      className="flex flex-col items-center my-20 w-screen"
    >
      <video
        className="w-full h-auto rounded-2xl shadow-lg -mb-14 overflow-hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type={videoType} />
        Your browser does not support the video tag.
      </video>
      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-[6vw] sm:text-[3.6vw] md:text-[3.4vw] font-bold text-white">
          Invest In Effects <span className="text-custom">Today</span>
        </p>
        <a
          href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
          target="_blank"
          rel="noreferrer"
          className="mt-4 px-6 py-3 text-[5vw] sm:text-xl text-white border-2 border-custom font-bold transition-all duration-150 cursor-pointer rounded-full"
        >
          Buy Now
        </a>
      </div>
    </section>
  );
};

export default LaptopAnimationPhone;
