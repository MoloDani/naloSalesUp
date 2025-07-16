import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";

const videoConfig = {
  unscrolledStyle: "opacity-100",
  scrolledStyle: "opacity-20",
};
const textConfig = {
  unscrolledStyle: "hidden",
  scrolledStyle: "flex",
};

function LandingAffiliate() {
  const { scrollY } = useScroll();
  const [videoStyle, setVideoStyle] = useState(videoConfig.unscrolledStyle);
  const [textStyle, setTextStyle] = useState(textConfig.unscrolledStyle);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVideoStyle(videoConfig.scrolledStyle);
      setTextStyle(textConfig.scrolledStyle);
    } else {
      setVideoStyle(videoConfig.unscrolledStyle);
      setTextStyle(textConfig.unscrolledStyle);
    }
  });

  const [muteState, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setMuted((prevMuteState) => {
      if (videoRef.current) {
        videoRef.current.muted = !prevMuteState; // Update the video element's muted property
      }
      return !prevMuteState; // Update the state
    });
  };

  const handleButtonClick = () => {
    window.open(
      "https://calendly.com/alexandru-marinescu7777/discovery-call",
      "_blank"
    );
  };

  return (
    <section className="flex w-full flex-col items-center justify-start relative overflow-hidden">
      <div className="w-full h-auto justify-center flex">
        <div className="w-full inline player-wrapper">
          <VideoSliding />
        </div>
        <div className="relative w-[500px] h-full md:hidden">
          <Image
            className="aspect-square object-contain"
            fill
            alt=""
            src={"/assets/phoneLandingImage.webp"}
          />
        </div>
      </div>
    </section>
  );
}

function VideoSliding() {
  const [isFixed, setIsFixed] = useState(true);
  const componentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muteState, setMuted] = useState(true);

  const { scrollY } = useScroll();
  const [visibleWordIndex, setVisibleWordIndex] = useState(-1);

  const words = [
    " ",
    "Grow",
    "Your",
    "Personal",
    "Brand",
    " ",
    " ",
    " ",
    " ",
    " ",
    "With",
    "Us",
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

  const calculateOpacity = (scrollPosition: number) => {
    if (!componentRef.current) return 1;

    const componentHeight =
      componentRef.current.offsetHeight - window.innerHeight;
    const progress = Math.min(scrollPosition / componentHeight, 1);

    // Ease the opacity drop — faster initially
    const easedProgress = Math.pow(progress, 0.5); // sqrt for faster drop
    return 1 - easedProgress * 0.75; // reaches ~0.25 opacity at midpoint
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
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{
              opacity: calculateOpacity(scrollY.get()),
              transition: "opacity 0.3s",
            }}
            src="assets\Affiliate ad Final WITH SFX.mp4"
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
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {firstLineWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-opacity duration-500 ease-in-out transition-filter
        ${index <= visibleWordIndex ? "opacity-100 filter-none" : "opacity-0 blur-sm"} 
        mx-[0.35rem] -mb-2 text-[min(7vw,4.5rem)]`}
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
      </div>
    </div>
  );
}

export default LandingAffiliate;
