import Link from "next/link";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";
import { useState } from "react";

function Page() {
  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <section
      id="missed offer"
      className="flex h-screen w-full flex-col items-center justify-between text-center"
    >
      <div>
        <img
          src="/assets/Crown_Gradient.png"
          alt="Top Image"
          className="h-32"
        />
      </div>

      <div className="flex flex-col items-center justify-center pb-20">
        <img
          src="/assets/HQ_Coming_Soon_Graffiti_Text.png"
          alt="Middle Image"
          className="font-first scale-[1.2] -my-[1.6rem] lg:-my-[8.6rem] lg:scale-[0.6]"
        />
        <h1 className="font-bold text-xl text-center pt-2 pb-5 lg:pt-4 lg:pb-7 lg:text-2xl">
          Stay updated, get <span className="text-custom">free</span> editing
          assets
        </h1>
        <div className="flex items-center relative justify-center border-solid border-custom border-[2px] py-2 pl-2 pr-8 lg:w-[16vw]">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Email"
            className="bg-transparent text-lg focus:outline-none placeholder:text-white w-full lg:text-xl"
          />
          <img
            src="/assets/Email_Arrow.png"
            alt="Icon"
            className="absolute w-6 h-6 right-[4px]"
          />
        </div>
      </div>

      {/* Bottom Text */}
      <div>
        <h1 className="text-custom/50 font-second text-lg my-2">
          No Artist Lacks Originality.
        </h1>
      </div>
    </section>
  );
}

export default Page;
