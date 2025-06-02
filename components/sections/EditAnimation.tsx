// EditAnimation.tsx
import React from "react";

const EditAnimation = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  return (
    <section
      id="edit-animation"
      className="
        flex flex-col items-center justify-center 
        w-full 
        py-16 
        px-4
      "
    >
      <div className="relative w-full max-w-[800px]">
        <video
          className="
            w-full 
            h-auto 
            rounded-lg 
            shadow-xl
            mb-10
            sm:-mb-10
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
          {/* Fallback */}
          Sorry, your browser doesn't support the video tag.
        </video>

        {/* Overlay Text */}
        <div className="absolute bottom-4 inset-x-0 text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-[4rem] font-bold">
            Effects Made <span className="text-custom">Simple.</span>
          </h1>
          <p className="text-white font-semibold text-lg sm:text-xl lg:text-2xl mt-2">
            Whether you are a{" "}
            <span className="text-custom">director, editor, or artist,</span>{" "}
            this pack is for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditAnimation;
