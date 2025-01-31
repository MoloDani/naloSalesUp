import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { useMotionValueEvent, useScroll } from "framer-motion";
import BackgroundTransition from "../ui/BackgroundTransition";

function VideoSliding() {
  const [isFixed, setIsFixed] = useState(true);
  const componentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muteState, setMuted] = useState(true);

  const { scrollY } = useScroll();
  const [visibleWordIndex, setVisibleWordIndex] = useState(-1);

  const words = [
    " ",
    "Your",
    "Effects",
    "Are",
    "Sh*t.",
    " ",
    " ",
    " ",
    " ",
    "Let",
    "Us",
    "Change",
    "That.",
    " ",
    " ",
    " ",
  ];
  const wordsCount = words.length;

  const firstLineWords = words.slice(0, 5);
  const secondLineWords = words.slice(5);

  useEffect(() => {
    const handleScroll = () => {
      if (!componentRef.current) return;
      const videoBottom = componentRef.current.getBoundingClientRect().bottom;

      if (videoBottom <= window.innerHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!componentRef.current) return;

    const componentHeight =
      componentRef.current.offsetHeight - window.innerHeight;

    // Calculate the scroll progress for triggering words
    const scrollStep = (componentHeight / wordsCount) * 1.8; // Equal scrolling step for each word
    const newWordIndex = Math.floor(latest / scrollStep); // Determine the visible word based on scroll

    setVisibleWordIndex(Math.max(-1, Math.min(newWordIndex, wordsCount - 1))); // Clamp the value
  });

  const toggleMute = () => {
    setMuted((prevMuteState) => {
      if (videoRef.current) {
        videoRef.current.muted = !prevMuteState; // Update the video element's muted property
      }
      return !prevMuteState; // Update the state
    });
  };

  const handleButtonClick = () => {
    if (!isFixed)
      window.open("https://calendly.com/nalovisuals/nalo", "_blank");
  };

  return (
    <div
      className="relative h-[150vh] w-screen overflow-hidden pb-20"
      ref={componentRef}
    >
      <div
        className={`${isFixed ? "fixed" : "absolute"}  
        bottom-0 left-0 w-screen h-screen object-cover z-0`}
        style={{ backgroundColor: "black" }}
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className={`${
              isFixed ? "opacity-100" : "opacity-30"
            } w-full h-full object-cover transition-opacity duration-300`}
            src="assets\4th_Version_NALO_SHOWREEL.mp4"
            autoPlay
            muted
            loop
            playsInline
          >
            This video cannot play
          </video>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full font-bold text-white z-30">
          {/* First Line */}
          <div>
            {firstLineWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-opacity duration-500 ease-in-out transition-filter
                  ${
                    index <= visibleWordIndex
                      ? "opacity-100 filter-none"
                      : "opacity-0 blur-sm"
                  } 
                  mx-[0.35rem] -mb-2 lg:text-[5.5rem] md:text-[4.5rem] sm:text-[4rem] xs:text-[3rem] xxs:text-[2rem]`}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Second Line */}
          <div>
            {secondLineWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-opacity duration-500 ease-in-out transition-filter 
                  ${
                    index <= visibleWordIndex
                      ? "opacity-100 filter-none"
                      : "opacity-0 blur-sm"
                  } 
                  m-[0.2rem] -mt-[100px] text-[2rem] md:text-[1.8rem] sm:text-[1.5rem] xs:text-[1.5rem] xxs:text-[1.25rem]`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        ;
        <Button
          x="50%"
          y="62%"
          text="Book A Call"
          onClick={handleButtonClick}
          opacity={visibleWordIndex * 0.1111}
          scale={Math.min(0.7, visibleWordIndex * 0.08)}
        />
        <button
          onClick={toggleMute}
          className="m-auto z-10 scale-[200%] text-white rounded absolute bottom-[5%] left-[95%] translate-x-[-50%] hover:cursor-pointer"
        >
          {muteState ? "🔊" : "🔈"}
        </button>
      </div>
    </div>
  );
}

export default VideoSliding;
