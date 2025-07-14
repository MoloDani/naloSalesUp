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
    </section>
  );
};

export default LaptopAnimationPhone;
