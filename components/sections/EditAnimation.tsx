import React from "react";

const EditAnimation: React.FC = () => {
  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center h-screen w-full"
    >
      {/* Video Container */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <video
          className="w-[90vw] lg:w-[35vw] h-auto align-middle -mt-80"
          autoPlay
          loop
          muted
          playsInline
          controls={false} // Ensures no controls are displayed
          onError={() => alert("Sorry, the video couldn't load.")}
        >
          {/* WebM for Chrome, Firefox, Edge */}
          <source src="/assets/LQ5_Timeline_Animation.webm" type="video/webm" />

          {/* WebM for Chrome, Firefox, Edge */}
          <source
            src="/assets/LQ5_Timeline_Animation_1.mov"
            type="video/quicktime"
          />
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
