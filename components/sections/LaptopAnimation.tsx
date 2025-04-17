import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const PADDING = 20;
const FPS = 30; // adjust this to match your video's frame rate

const LaptopAnimation: React.FC = () => {
  const targetRef = useRef(null);

  return (
    <section id="Laptop Animation">
      <div
        className="relative h-[150vh]"
        style={{
          paddingLeft: PADDING,
          paddingRight: PADDING,
          width: `calc(100vw - ${2 * PADDING}px)`,
        }}
        ref={targetRef}
      >
        <LaptopVideo targetRef={targetRef} />
      </div>
    </section>
  );
};

const LaptopVideo = ({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [frameCount, setFrameCount] = useState(0);
  const frameIndexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, frameCount]
  );

  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [indexButton, setIndexButton] = useState(-1);

  // when video loads metadata, set frame count
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const frames = Math.floor(duration * FPS);
      setFrameCount(frames);
    }
  };

  // listen for scroll-driven frameIndex changes
  useMotionValueEvent(frameIndexMotion, "change", (latest) => {
    setCurrentFrameIndex(Math.floor(latest));
  });

  // Update video currentTime based on scroll position
  useEffect(() => {
    if (videoRef.current && frameCount > 0) {
      const playbackTime = currentFrameIndex / FPS;
      videoRef.current.currentTime = playbackTime; // Set the video to the correct frame
    }
  }, [currentFrameIndex, frameCount]);

  useEffect(() => {
    if (currentFrameIndex > frameCount / 2 + 3) setIndexButton(30);
    else setIndexButton(-1);
  }, [currentFrameIndex, frameCount]);

  return (
    <div
      style={{
        height: `min(calc(100vh - ${PADDING * 2}px), 80vw)`,
        top: PADDING,
        position: "sticky",
      }}
      className="relative overflow-hidden w-full"
    >
      {/* Video Container */}
      <video
        ref={videoRef}
        src="/assets/laptop_animation.webm"
        muted
        loop
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Text + Button in Front */}
      <div
        className="absolute inset-0 flex justify-center items-start"
        style={{
          top: "28%",
          zIndex: indexButton,
        }}
      >
        <div className="flex flex-col">
          <p className="text-[3.6rem] font-bold text-white opacity-100">
            Invest In Effects <span className="text-custom">TODAY</span>
          </p>
          <a
            href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
            target="_blank"
            className="mt-2 p-2 pb-3 text-2xl text-white border-2 border-custom rounded-xl font-bold box-border transition-all duration-150 cursor-pointer text-center"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaptopAnimation;
