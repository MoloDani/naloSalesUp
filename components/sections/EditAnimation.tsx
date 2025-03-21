import React from "react";

const EditAnimation: React.FC = () => {
  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center"
    >
      <div className="h-screen w-full">
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
            <source
              src="/assets/LQ5_Timeline_Animation_1.mov"
              type="video/quicktime"
            />

            <source
              src="/assets/LQ5_Timeline_Animation_2.webm"
              type="video/webm"
            />
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
