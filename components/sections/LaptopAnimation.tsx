import React, { useState, useEffect } from "react";

const LaptopAnimation: React.FC = () => {
  const images = [
    "/assets/laptopAnim/Comp 1_00003.png",
    "/assets/laptopAnim/Comp 1_00004.png",
    "/assets/laptopAnim/Comp 1_00005.png",
    "/assets/laptopAnim/Comp 1_00006.png",
    "/assets/laptopAnim/Comp 1_00007.png",
    "/assets/laptopAnim/Comp 1_00008.png",
    "/assets/laptopAnim/Comp 1_00009.png",
    "/assets/laptopAnim/Comp 1_00010.png",
    "/assets/laptopAnim/Comp 1_00011.png",
    "/assets/laptopAnim/Comp 1_00012.png",
    "/assets/laptopAnim/Comp 1_00013.png",
    "/assets/laptopAnim/Comp 1_00014.png",
    "/assets/laptopAnim/Comp 1_00015.png",
    "/assets/laptopAnim/Comp 1_00016.png",
    "/assets/laptopAnim/Comp 1_00017.png",
    "/assets/laptopAnim/Comp 1_00018.png",
    "/assets/laptopAnim/Comp 1_00019.png",
    "/assets/laptopAnim/Comp 1_00020.png",
    "/assets/laptopAnim/Comp 1_00021.png",
    "/assets/laptopAnim/Comp 1_00022.png",
    "/assets/laptopAnim/Comp 1_00023.png",
    "/assets/laptopAnim/Comp 1_00024.png",
    "/assets/laptopAnim/Comp 1_00025.png",
    "/assets/laptopAnim/Comp 1_00026.png",
    "/assets/laptopAnim/Comp 1_00027.png",
    "/assets/laptopAnim/Comp 1_00028.png",
  ];

  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const topPoint = 0; // Define the top scroll position (in px)
  const bottomPoint = 200; // Define the bottom scroll position (in px)

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    // Ensure scroll position stays within the top and bottom points
    if (scrollTop >= topPoint && scrollTop <= bottomPoint) {
      const scrollRange = bottomPoint - topPoint;
      const scrollProgress = ((scrollTop - topPoint) / scrollRange) * 100;

      setScrollPercentage(scrollProgress);
      setCurrentImageIndex(
        Math.min(
          Math.floor(scrollProgress / (100 / images.length)),
          images.length - 1
        )
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="scroll-image"
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="flex flex-col items-center justify-center w-full h-screen relative mt-[10vh] -mb-[10vh]">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="object-cover w-[70%] h-auto transition-all duration-500 ease-in-out"
        />
      </div>
    </section>
  );
};

export default LaptopAnimation;
