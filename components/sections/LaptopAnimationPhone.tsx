import React from "react";

const LaptopAnimationPhone: React.FC = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="promo-video"
      className="flex flex-col items-center my-20 w-screen"
    >
      <video
        className="w-full h-auto rounded-2xl shadow-lg -mb-14 overflow-hidden scale-[1.3]"
        autoPlay
        loop
        muted
        playsInline
      >
        {isSafari ? (
          <source src="/assets/promo_video.mov" type="video/quicktime" />
        ) : (
          <source src="/assets/promo_video.webm" type="video/webm" />
        )}
      </video>
    </section>
  );
};

export default LaptopAnimationPhone;
