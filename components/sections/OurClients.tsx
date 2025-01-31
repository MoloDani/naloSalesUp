import React from "react";
import { motion } from "framer-motion";
import { parentVariant, childrenVar } from "../utils/AnimateFunctions";
import BlurMargin from "../utils/BlurMargin";
import BackgroundTransition from "../ui/BackgroundTransition";

interface ClientCardProps {
  name: string;
  width?: number;
  image: string;
}

const InfiniteSlide: React.FC = () => {
  const cardsRight = [
    { name: "IzzPot", image: "Izzpot" },
    { name: "Kairo Keyz", image: "Kairo Keyz" },
    { name: "Bossman", image: "BossMan Dlow" },
    { name: "Faze Kaysan", image: "Faze Kaysan" },
    { name: "Dthang Gz", image: "DthangGz" },
    { name: "M1lionz", image: "M1llionz" },
    { name: "ShaGz", image: "ShaGz" },
    { name: "DeeBaby", image: "DeeBaby" },
    { name: "MexicanOT", image: "MexicanOT" },
    { name: "Jay Hound", image: "Jay Hound" },
    { name: "Finem", image: "Finem" },
  ];

  const cardsLeft = [
    { name: "Pressplay", image: "PRESSPLAY (1)" },
    { name: "M1llionz", image: "LAGGA" },
    { name: "Red Bull", image: "REDBULL (1)" },
    { name: "Notti World Records", image: "NOTTI WORLDS RECORDS (1)" },
    { name: "Leo Stay Trill", image: "LEO (1)" },
  ];

  return (
    <section
      id="credits"
      className="relative overflow-hidden w-full bg-custom/10 py-30"
    >
      <BackgroundTransition x="10" />
      <motion.div
        variants={parentVariant(0.5, 0.25)}
        initial="hidden"
        animate="visible"
        className="pt-20 pb-10"
      >
        <motion.h1
          variants={childrenVar("horizontal", "spring")}
          className="m-auto max-w-[70%] font-bold tracking-[-0.05em] text-4xl text-center pb-20 lg:text-6xl lg:max-w-full"
        >
          Clients Around The World.
        </motion.h1>

        <motion.div
          variants={childrenVar("horizontal", "spring")}
          className="flex w-[2000%] animate-slide_right space-x-4 py-2"
        >
          {[...cardsRight, ...cardsRight].map((item, index) => (
            <ClientCard key={index} name={item.name} image={item.image} />
          ))}
        </motion.div>
        <motion.div
          variants={childrenVar("horizontal", "spring")}
          className="flex w-[200%] animate-slide_left space-x-4 py-2 lg:hidden"
        >
          {[
            ...cardsLeft,
            ...cardsLeft,
            ...cardsLeft,
            ...cardsLeft,
            ...cardsLeft,
          ].map((item, index) => (
            <DirectorCard key={index} name={item.name} image={item.image} />
          ))}
        </motion.div>
      </motion.div>

      <BackgroundTransition x="10" flip={true} />
    </section>
  );
};

const ClientCard: React.FC<ClientCardProps> = ({ name, image, width }) => (
  <motion.div className="h-48 flex items-center justify-center text-xl font-bold rounded-lg shadow-lg w-[160px] sm:w-[200px] lg:w-[250px]">
    <img
      className=""
      src={"/assets/clientPictures/" + image + ".png"}
      alt={name}
    />
  </motion.div>
);

const DirectorCard: React.FC<ClientCardProps> = ({ name, image, width }) => (
  <motion.div
    className="h-22 flex items-center justify-center text-xl font-bold"
    style={{ width: `${width}px` }}
  >
    <img
      className="block max-h-22 max-w-[100px] h-auto w-auto"
      src={"/assets/directorPictures/" + image + ".png"}
      alt={name}
    />
  </motion.div>
);

export default InfiniteSlide;
