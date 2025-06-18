import React, { useState } from "react";

const EditAnimation = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center h-screen w-full"
    >
      <div className="flex flex-col items-center justify-center w-full relative -mb-4 sm:-mb-10">
        <video
          className="w-[90vw] sm:w-[75vw] lg:w-[38vw] h-auto -mt-44 sm:-mt-60 lg:-mt-72 -mb-6 sm:mb-16"
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

        <div className="absolute bottom-0 w-full text-center p-4 z-10">
          <h1 className="text-white text-3xl sm:text-5xl font-bold">
            Effects Made <span className="text-custom">Simple.</span>
          </h1>
          <p className="text-white text-base sm:text-lg lg:text-xl mt-1 font-semibold">
            Whether you are a{" "}
            <span className="text-custom">director, editor, or artist,</span>{" "}
            this pack is for you.
          </p>
          <a
            href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] -mt-10 h-[150px] scale-[0.7] -ml-16"
          >
            <img
              src="/assets/button_idle.png"
              alt="Buy now"
              draggable={false}
              className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src="/assets/button_hovered.png"
              alt=""
              draggable={false}
              className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EditAnimation;
