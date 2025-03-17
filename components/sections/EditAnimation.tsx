import React from "react";

const EditAnimation: React.FC = () => {
  return (
    <section id="edit animation">
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black pb-10">
        <div className="max-w-screen-lg w-full -mb-20">
          <video
            autoPlay
            loop
            muted
            className="w-full h-auto rounded-lg shadow-lg"
          >
            <source src="/assets/LQ_Timeline_animation.webm" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-center mt-6">
          <h1 className="text-white text-[2.3rem] lg:text-[4rem] font-bold">
            Effects Made <span className="text-custom">Simple.</span>
          </h1>
          <p className="text-white font-bold text-base lg:text-lg mt-2 px-[40px]">
            Wheater you are a director, editor or artist, this pack is for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditAnimation;
