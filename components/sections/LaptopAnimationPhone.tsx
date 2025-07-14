import React from "react";

const LaptopAnimationPhone: React.FC = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="promo-video"
      className="flex flex-col items-center my-20 w-screen overflow-hidden"
    >
      <div className="relative w-full max-w-[800px] overflow-hidden">
        <div className="scale-[1.3] origin-center">
          <video
            className="w-full h-auto rounded-2xl shadow-lg"
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
        </div>
      </div>
    </section>
  );
};

export default LaptopAnimationPhone;
