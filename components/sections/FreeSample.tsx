import React from "react";

const FreeSample = () => {
  return (
    <section id="free sample">
      <div className="flex flex-col items-center mt-10 mb-20">
        <h1 className="text-3xl sm:text-6xl font-bold">Not Decided Yet?</h1>
        <p className="text-base sm:text-lg lg:text-2xl mt-1 font-semibold">
          Get a <span className="text-custom">free</span> sample, by signing up
          to our email list
        </p>
        <input
          type="text"
          placeholder="Email"
          autoComplete="email"
          className="
    w-full max-w-md
    px-3 py-2
    bg-[#0a0a0a] 
    border border-green-500 
    rounded-md 
    text-white 
    placeholder-green-500 
    focus:outline-none 
    focus:ring-2 focus:ring-green-500 mt-4
  "
        />
      </div>
    </section>
  );
};

export default FreeSample;
