import React from "react";

const EditAnimation: React.FC = () => {
  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center"
    >
      <div className="h-screen w-full bg-black">
        <div className="max-w-screen-lg flex flex-col items-center justify-center w-full">
          <video
            className="w-[90vw] lg:w-[35vw] h-auto rounded-lg shadow-lg align-middle -mb-[18%]"
            autoPlay
            loop
            muted
            playsInline
            controls={false} // Ensures no controls are displayed
            onError={() => alert("Sorry, the video couldn't load.")}
          >
            {/* Safari (HEVC .mov) */}
            <source
              src="/assets/LQ5_Timeline_Animation.mov"
              type="video/quicktime"
            />
            {/* Chrome, Edge, Firefox (WebM VP9) */}
            <source
              src="/assets/LQ5_Timeline_Animation.webm"
              type="video/webm"
            />
            <track kind="captions" src="path_to_captions.vtt" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-center">
          <h1 className="text-white text-[2.3rem] lg:text-[4rem] font-bold">
            Effects Made <span className="text-custom">Simple.</span>
          </h1>
          <p className="text-white font-bold text-lg lg:text-xl px-[40px] -mt-2">
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
