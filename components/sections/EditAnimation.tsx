import React, { useEffect, useState } from "react";

const EditAnimation = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Function to check for browser support
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    console.log(isSafari);
  }, []);

  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center h-screen w-full"
    >
      {/* Video Container */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <video
          className="w-[90vw] lg:w-[35vw] h-auto align-middle -mt-80 mb-10 lg:mb-0"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false} // Ensures no controls are displayed
          onError={() => alert("Sorry, the video couldn't load.")}
          poster="/assets/video-placeholder.png" // Placeholder image while loading
        >
          {isSafari ? (
            <source
              src="/assets/LQ5_Timeline_Animation_1.mov"
              type="video/quicktime"
            />
          ) : (
            <source
              src="/assets/LQ5_Timeline_Animation.webm"
              type="video/webm"
            />
          )}
          {/* Fallback content if video fails to load */}
          Sorry, your browser doesn't support the video tag.
        </video>
        {/* Text Positioned at the Bottom, Over the Video */}
        <div className="absolute bottom-0 w-full text-center p-4 z-10">
          <h1 className="text-white text-[2rem] lg:text-[3rem] font-bold">
            Effects Made <span className="text-custom">Simple.</span>
          </h1>
          <p className="text-white font-bold text-lg lg:text-xl mt-1">
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
