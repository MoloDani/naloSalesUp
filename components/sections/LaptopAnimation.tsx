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
const ALT_SRC_WEBM = "/assets/promo_video.webm";

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

const LaptopVideo = forwardRef<HTMLDivElement, LaptopVideoProps>((_, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const altRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => wrapperRef.current!);

  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const [frames, setFrames] = useState(0);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frames]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [started, setStarted] = useState(false);
  const [showAlt, setShowAlt] = useState(true);
  const [overlayZ, setOverlayZ] = useState(-1);

  const onMainLoaded = () => {
    if (mainRef.current) {
      setFrames(Math.floor(mainRef.current.duration * FPS));
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.floor(latest);
    setCurrentFrame(idx);
    if (idx > 0) setStarted(true);
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (started && progress < 0.15) {
      setShowAlt(true);
    } else {
      setShowAlt(false);
    }
  });

  useEffect(() => {
    if (!showAlt && mainRef.current) {
      mainRef.current.currentTime = currentFrame / FPS;
    }
  }, [currentFrame, showAlt]);

  useEffect(() => {
    const alt = altRef.current;
    if (!alt) return;
    if (showAlt) alt.play().catch(() => {});
    else alt.pause();
  }, [showAlt]);

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
      className="relative h-[220vh] mb-20"
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
        <video
          ref={mainRef}
          loop
          playsInline
          muted={false}
          preload="auto"
          onLoadedMetadata={onMainLoaded}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: showAlt ? "none" : "block" }}
        >
          {isSafari ? (
            <source src={MAIN_SRC_QT} type="video/quicktime" />
          ) : (
            <source src={MAIN_SRC_WEBM} type="video/webm" />
          )}
          Your browser does not support the video tag.
        </video>

        <video
          ref={altRef}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
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

        <div
          className="absolute inset-0 flex justify-center items-start"
          style={{ top: "28%", zIndex: overlayZ }}
        >
          <div className="flex flex-col">
            <p className="text-[3.3vw] font-bold text-white">
              Invest In Effects <span className="text-custom">Today</span>
            </p>
            <a
              href="https://pay.nalopacks.com/b/7sY28q9rv9P48zEbRDgEg00"
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
