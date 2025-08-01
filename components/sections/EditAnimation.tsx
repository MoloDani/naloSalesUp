import React, { useState } from "react";

const EditAnimation = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center my-44 w-full"
    >
      <div className="flex flex-col items-center justify-center w-full relative -mb-4 sm:-mb-10">
        <video
          className="hidden lg:block w-[90vw] sm:w-[75vw] lg:w-[38vw] h-auto -mt-44 sm:-mt-60 lg:-mt-72 mb-6 sm:mb-16"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {isSafari ? (
            <source
              src="/assets/LQ5_Timeline_Animation_HEVC.mov"
              type="video/quicktime"
            />
          ) : (
            <source
              src="/assets/LQ5_Timeline_Animation.webm"
              type="video/webm"
            />
          )}
        </video>

        <img
          src="/assets/timeline-img.png"
          alt=""
          className="block lg:hidden w-[90vw] sm:w-[75vw] lg:w-[38vw] h-auto -mt-44 sm:-mt-60 lg:-mt-72 mb-6 sm:mb-16"
        />

        <div className="absolute bottom-0 w-full text-center p-4 z-10">
          <h1 className="text-white text-3xl sm:text-6xl font-bold">
            Effects Made <span className="text-custom">Simple</span>.
          </h1>
          <p className="text-white text-base sm:text-lg lg:text-2xl mt-1 font-semibold">
            Whether you are a director, editor, or artist, <br />
            this pack is for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditAnimation;
