import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const PADDING = 20;
const FPS = 20;
// For non-Safari browsers:
const MAIN_SRC_WEBM = "/assets/laptop_animation.webm";
const ALT_SRC_WEBM = "/assets/promo_video1.webm";

// For Safari (QuickTime) browsers:
const MAIN_SRC_QT = "/assets/laptop_animation.mov";
const ALT_SRC_QT = "/assets/promo_video.mov";

const LaptopAnimation: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <section id="Laptop Animation">
      <LaptopVideo ref={targetRef} />
    </section>
  );
};

type LaptopVideoProps = {};

// forwardRef so the parent can scroll-track this wrapper div
const LaptopVideo = forwardRef<HTMLDivElement, LaptopVideoProps>((_, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const altRef = useRef<HTMLVideoElement>(null);

  // Let parent use this div for useScroll
  useImperativeHandle(ref, () => wrapperRef.current!);

  // Detect Safari/QuickTime (only on client side)
  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // total frames in the MAIN clip
  const [frames, setFrames] = useState(0);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frames]);
  const [currentFrame, setCurrentFrame] = useState(0);
  // once we scrub past frame 0, we consider the animation "started"
  const [started, setStarted] = useState(false);

  // decide which video to show (ALT initially, then switch)
  const [showAlt, setShowAlt] = useState(true);

  // for z-index of the overlay text
  const [overlayZ, setOverlayZ] = useState(-1);

  // when MAIN loads, record its total frames
  const onMainLoaded = () => {
    if (mainRef.current) {
      setFrames(Math.floor(mainRef.current.duration * FPS));
    }
  };

  // update currentFrame + mark started
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.floor(latest);
    setCurrentFrame(idx);
    if (idx > 0) setStarted(true);
  });

  // swap showAlt based on "started" and scroll < 15%
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (started && progress < 0.15) {
      setShowAlt(true);
    } else {
      setShowAlt(false);
    }
  });

  // when MAIN is showing, scrub its currentTime
  useEffect(() => {
    if (!showAlt && mainRef.current) {
      mainRef.current.currentTime = currentFrame / FPS;
    }
  }, [currentFrame, showAlt]);

  // when ALT is showing, ensure it plays; pause otherwise
  useEffect(() => {
    const alt = altRef.current;
    if (!alt) return;
    if (showAlt) alt.play().catch(() => {});
    else alt.pause();
  }, [showAlt]);

  // once you pass halfway + 3 frames, bring your overlay in front
  useEffect(() => {
    if (frames > 0 && currentFrame > frames / 2 + 3) {
      setOverlayZ(30);
    } else {
      setOverlayZ(-1);
    }
  }, [currentFrame, frames]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[150vh]"
      style={{
        position: "relative",
        paddingLeft: PADDING,
        paddingRight: PADDING,
        width: `calc(100vw - ${2 * PADDING}px)`,
      }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          position: "sticky",
          top: PADDING,
          height: `min(calc(100vh - ${PADDING * 2}px), 80vw)`,
        }}
      >
        {/* MAIN video: scrub by scroll when visible */}
        <video
          ref={mainRef}
          loop
          playsInline
          muted={false} // if you want sound on MAIN, change as needed
          onLoadedMetadata={onMainLoaded}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: showAlt ? "none" : "block" }}
        >
          {isSafari ? (
            <source src={MAIN_SRC_QT} type="video/quicktime" />
          ) : (
            <source src={MAIN_SRC_WEBM} type="video/webm" />
          )}
          {/* You can add a fallback message if needed: */}
          Your browser does not support the video tag.
        </video>

        {/* ALT video: free-play when visible */}
        <video
          ref={altRef}
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: showAlt ? "block" : "none" }}
        >
          {isSafari ? (
            <source src={ALT_SRC_QT} type="video/quicktime" />
          ) : (
            <source src={ALT_SRC_WEBM} type="video/webm" />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Overlay text/button with dynamic z-index */}
        <div
          className="absolute inset-0 flex justify-center items-start"
          style={{ top: "28%", zIndex: overlayZ }}
        >
          <div className="flex flex-col">
            <p className="text-[3.6rem] font-bold text-white">
              Invest In Effects <span className="text-custom">Today</span>
            </p>
            <a
              href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
              target="_blank"
              rel="noreferrer"
              className="mt-2 p-2 pb-3 text-2xl text-white border-2 border-custom rounded-xl font-bold transition-all duration-150 cursor-pointer text-center"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

LaptopVideo.displayName = "LaptopVideo";
export default LaptopAnimation;
