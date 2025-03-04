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
          src="/assets/Coming_Soon_Graffiti_Text.png"
          alt="Middle Image"
          className="font-first -my-[5.3em] scale-[1.2]"
        />
        <h1 className="font-bold text-2xl py-8 text-center">
          Stay updated, get free editing assets
        </h1>
        <div className="flex w-[48%] items-center justify-center border-solid border-custom border-[2px] pb-2 pt-1 px-5">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Email"
            className="bg-transparent text-2xl focus:outline-none placeholder:text-white w-full"
          />
          <img
            src="/assets/Email_Arrow.png"
            alt="Icon"
            className="ml-2 w-6 h-6"
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
