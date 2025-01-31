import Link from "next/link";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";
import ReactPlayer from "react-player/lazy";
import dynamic from "next/dynamic";
import { useState } from "react";

// divier
{
  /* <div className="w-full px-5">
<motion.div
  variants={childrenVar("vertical", "spring")}
  className="h-[1px] w-full bg-custom/30"
/>
</div> */
}

type TestimonialT = {
  comment: string;
  author: string;
};

const TestimonialA: TestimonialT[] = [
  {
    author: "gfilmedit17",
    comment:
      "Can’t thank you enough for the clean visuals & the out of this world VFX🙌🏽really brang my idea to life",
  },
  {
    author: "keidballa",
    comment:
      "Bro i had pleasure to work with you guys,im so happy with your work. I was serching for best and fastest way to put some art on my music video , and find you.Quality combined with price is the best of the best on this industry.Thanks my G's",
  },
  {
    author: "odotsheaman",
    comment:
      "Nalo visuals is the best VFX artist I’ve worked with! No hassle and 100% quality product with the fastest turn around I’ve ever had working with a VFX artist. Highly recommend their services 👌🏼💪🏼",
  },
  {
    author: "n2.prods",
    comment:
      "My brother here is extremely dangerous for vfx stuff, i asked him for something so simple but my bro sorted me out with some vfx work nicely and on time aswell. I will be keep coming too Nalo Visuals for my vfx work ❤️🙂",
  },
  {
    author: "vsoproduction",
    comment:
      "Their customer service is top-notch; they were attentive to my every need throughout the entire process… the quality of their work was outstanding.",
  },
  {
    author: "isurffilms",
    comment:
      "Thank you to my bro David Antonio, the Founder of Nalo Visuals for first finding me on ig and wanting to network, and second for the VFX and helping enhance my videos and take them to another level. We have done a good amount of visuals together and we only continue to keep elevating to new levels 💯  ",
  },
];

function Credits() {
  return (
    <section
      id="credits"
      className="flex min-h-screen w-full flex-col items-center justify-start bg-custom/5 "
    >
      <Divider />
      <motion.div
        variants={parentVariant(0.5, 0.25)}
        whileInView="visible"
        viewport={{ once: true }}
        initial="hidden"
        className="flex w-full flex-1 items-center justify-center pb-10 "
      >
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2.5 px-5">
            <div className="flex flex-col items-center justify-center">
              <motion.span
                variants={childrenVar("vertical", "spring")}
                className="font-bold tracking-[0.25em] text-white text-opacity-75"
              >
                CREDITS
              </motion.span>
              <motion.span
                variants={childrenVar("vertical", "spring")}
                className="text-2xl font-semibold md:text-3xl"
              >
                Hear It From Our Clients.
              </motion.span>
            </div>
            <motion.p
              variants={childrenVar("vertical", "spring")}
              className="text-center text-sm italic text-white text-opacity-75"
            >
              Discover their experiences with NALO Visuals
            </motion.p>
          </div>
          <div className="w-full px-5">
            <motion.div
              variants={childrenVar("vertical", "spring")}
              className="h-[1px] w-full bg-custom/30"
            />
          </div>
          <div className="flex items-start flex-wrap justify-center gap-5 px-5 lg:px-10">
            {TestimonialA.map((item, index) => (
              <motion.div variants={childrenVar("vertical", "spring")}>
                <TestimonialC {...item} />
              </motion.div>
            ))}
          </div>
          <div className="w-full px-5">
            <motion.div
              variants={childrenVar("vertical", "spring")}
              className="h-[1px] w-full bg-custom/30"
            />
          </div>
        </div>
      </motion.div>
    </section>
    // test
  );
}

function TestimonialC(props: TestimonialT) {
  return (
    <div className="bg-custom/10 max-w-[600px] min-h-[200px] flex justify-center items-center relative rounded-md border border-custom/30 p-10">
      <span className="font-semibold">
        “<span className="text-sm">{props.comment}</span>”
      </span>
      <span className="absolute right-2.5 bottom-2.5">- @{props.author}</span>
    </div>
  );
}

export default Credits;
