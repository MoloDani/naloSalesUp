import React, { useEffect, useState } from "react";
import NoBgVideo from "../utils/NoBgVideo";

const EditAnimation = () => {
  return (
    <section
      id="edit-animation"
      className="flex flex-col items-center justify-center h-screen w-full"
    >
      {/* Video Container */}
      <div className="flex flex-col items-center justify-center w-full relative">
        <NoBgVideo srcBase="/assets/LQ5_Timeline_animation" />
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
