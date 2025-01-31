import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";

type CardProp = {
  videoUrl: string;
  title: string;
  subtitle: string;
};

function Testimonials({ data }: { data: CardProp[] }) {
  const testimonialData: CardProp[] = [
    {
      videoUrl: "assets/testimonial_test.mp4",
      title: "Alexandru Marinescu",
      subtitle: "RiseTeen Academy",
    },
    {
      videoUrl: "assets/testimonial_test.mp4",
      title: "Marinescu",
      subtitle: "RiseTeen Academy",
    },
    {
      videoUrl: "assets/testimonial_test.mp4",
      title: "Alexandru",
      subtitle: "RiseTeen Academy",
    },
    {
      videoUrl: "assets/testimonial_test.mp4",
      title: "Alexandru Marine",
      subtitle: "RiseTeen Academy",
    },
    {
      videoUrl: "assets/testimonial_test.mp4",
      title: "Alexandru Ma",
      subtitle: "RiseTeen Academy",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  // Track if viewport is wide
  const [isWideViewport, setIsWideViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth > 720 : true
  );

  const [translateXNumber, setTranslateXNumber] = useState(200);

  const [translateYNumber, setTranslateYNumber] = useState(200);

  // Update the spacing between the testimonials according to the window width
  useEffect(() => {
    const updateValues = () => {
      const isWideViewport = window.innerWidth > 720; // Recalculate this inside the function
      setIsWideViewport(isWideViewport);
      setTranslateXNumber(isWideViewport ? window.innerWidth / 4.5 : 200);
      setTranslateYNumber(isWideViewport ? window.innerWidth / 20 : 200);
    };

    // Call updateValues immediately on reload
    updateValues();

    window.addEventListener("resize", updateValues);
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateValues);
  }, []);

  const rotateLeft = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1 + testimonialData.length) % testimonialData.length
    );
  };

  const rotateRight = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialData.length) % testimonialData.length
    );    
  };

  const getCardStyles = (index: number) => {
    const position =
      (index - currentIndex + testimonialData.length) % testimonialData.length;

    const opacityNumber = isWideViewport ? 0.5 : 0; // Use state instead of window.innerWidth
    if (position === 0)
      return {
        zIndex: 20,
        scale: 1.05,
        translateX: "0px",
        translateY: "0px",
        opacity: 1,
      };
    if (position === testimonialData.length - 1)
      return {
        zIndex: 10,
        scale: 0.9,
        translateX: translateXNumber,
        translateY: translateYNumber,
        opacity: opacityNumber,
        rotate: 6,
      };
    if (position === 1)
      return {
        zIndex: 10,
        scale: 0.9,
        translateX: -translateXNumber,
        translateY: translateYNumber,
        opacity: opacityNumber,
        rotate: -6,
      };

    //next side-cards
    if (position === 2)
      return {
        opacity: 0,
        translateX: (-translateXNumber * 3) / 2,
        translateY: translateYNumber * 2,
        scale: 0.8,
        rotate: -15,
        pointerEvents: "none",
      };
    if (position === testimonialData.length - 2)
      return {
        opacity: 0,
        translateX: (translateXNumber * 3) / 2,
        translateY: translateYNumber * 2,
        scale: 0.8,
        rotate: 15,
        pointerEvents: "none",
      };
    return { opacity: 0, pointerEvents: "none" };
  };

  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center w-full py-40"
    >
      <h1 className="text-4xl font-bold text-center text-white lg:text-6xl mb-28 justify-center">
        What Our Clients Have To Say
      </h1>

      <div className="relative flex items-center w-full h-[300px] lg:h-[600px]">
        {/* Left Button */}

        <motion.button
          onClick={rotateLeft}
          className="absolute rotate-180 sm:left-[10%] w-28 z-3 z-[999] fill-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z"/> </g> </svg> 
        </motion.button>

        {/* Carousel */}
        <div className="relative flex justify-center items-center w-full h-full">
          {testimonialData.map((card, index) => {
            const styles = getCardStyles(index);
            return (
              <motion.div
                key={index}
                className="absolute max-w-sm sm2:w-1/5 w-1/3 h-full rounded-2xl shadow-xl"
                initial={{ opacity: 0 }}
                animate={{
                  zIndex: styles.zIndex,
                  scale: styles.scale,
                  translateX: styles.translateX,
                  translateY: styles.translateY,
                  opacity: styles.opacity,
                  rotate: styles.rotate || 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                style={{
                  pointerEvents:
                    styles.pointerEvents as React.CSSProperties["pointerEvents"],
                }}
              >
                <Card
                  videoUrl={card.videoUrl}
                  title={card.title}
                  subtitle={card.subtitle}
                  plays={index === currentIndex}
                  canControl={index === currentIndex}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <motion.button
          onClick={rotateRight}
          className="absolute right-0 sm:right-[10%] w-28 z-[999] fill-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z"/> </g> </svg> 
        </motion.button>
      </div>
    </section>
  );
}

export default Testimonials;
