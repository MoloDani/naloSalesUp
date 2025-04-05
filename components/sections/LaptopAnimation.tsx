import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const images = [
  "/assets/laptopAnim/Comp1_00003.png",
  "/assets/laptopAnim/Comp1_00004.png",
  "/assets/laptopAnim/Comp1_00005.png",
  "/assets/laptopAnim/Comp1_00006.png",
  "/assets/laptopAnim/Comp1_00007.png",
  "/assets/laptopAnim/Comp1_00008.png",
  "/assets/laptopAnim/Comp1_00009.png",
  "/assets/laptopAnim/Comp1_00010.png",
  "/assets/laptopAnim/Comp1_00011.png",
  "/assets/laptopAnim/Comp1_00012.png",
  "/assets/laptopAnim/Comp1_00013.png",
  "/assets/laptopAnim/Comp1_00014.png",
  "/assets/laptopAnim/Comp1_00015.png",
  "/assets/laptopAnim/Comp1_00016.png",
  "/assets/laptopAnim/Comp1_00017.png",
  "/assets/laptopAnim/Comp1_00018.png",
  "/assets/laptopAnim/Comp1_00019.png",
  "/assets/laptopAnim/Comp1_00020.png",
  "/assets/laptopAnim/Comp1_00021.png",
  "/assets/laptopAnim/Comp1_00022.png",
  "/assets/laptopAnim/Comp1_00023.png",
  "/assets/laptopAnim/Comp1_00024.png",
  "/assets/laptopAnim/Comp1_00025.png",
  "/assets/laptopAnim/Comp1_00026.png",
  "/assets/laptopAnim/Comp1_00027.png",
  "/assets/laptopAnim/Comp1_00028.png",
];

const PADDING = 20;

const LaptopAnimation: React.FC = () => {
  const targetRef = useRef(null);

  return (
    <section id="Laptop Animation">
      <div
        className={`relative h-[180vh]`}
        style={{
          paddingLeft: PADDING,
          paddingRight: PADDING,
          width: `calc(100vw - ${2 * PADDING}px)`,
        }}
        ref={targetRef}
      >
        <LaptopImage targetRef={targetRef} />
      </div>
    </section>
  );
};

const LaptopImage = ({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const imageIndexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1]
  );

  const [imageIndex, setImageIndex] = useState(0);

  // Update imageIndex as scroll changes
  useMotionValueEvent(imageIndexMotion, "change", (latest) => {
    setImageIndex(Math.floor(latest));
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${images[imageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `min(calc(100vh - ${PADDING * 2}px), 80vw)`,
        top: PADDING,
        position: "sticky",
      }}
      className="relative z-10 overflow-hidden w-full"
    ></motion.div>
  );
};

export default LaptopAnimation;
