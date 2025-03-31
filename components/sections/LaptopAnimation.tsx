import React, { useState, useEffect, useRef } from "react";

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
  const [isFixed, setIsFixed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress inside the section
      const progress = Math.min(
        Math.max((scrollTop - sectionTop + windowHeight) / sectionHeight, 0),
        1
      );

      setScrollPercentage(progress * 100);

      // Change image based on scroll progress
      setCurrentImageIndex(
        Math.min(Math.floor(progress * images.length), images.length - 1)
      );

      // Make it fixed while scrolling in the section, but absolute when reaching the bottom
      if (progress >= 1) {
        setIsFixed(false); // Reached the bottom
      } else {
        setIsFixed(true); // Stay fixed while scrolling
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[160vh]">
      {/* Scroll space before image */}
      <div
        className={`${
          scrollPercentage < 100
            ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "absolute bottom-0 left-1/2 -translate-x-1/2"
        } transition-all duration-0`}
      >
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-[80vw] h-auto transition-all duration-0"
        />
      </div>
    </section>
  );
};

export default LaptopAnimation;
