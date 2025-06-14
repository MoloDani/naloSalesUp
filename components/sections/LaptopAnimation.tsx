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

const MAIN_SRC_WEBM = "/assets/laptop_animation.webm";
const ALT_SRC_WEBM = "/assets/promo_video1.webm";
const MAIN_SRC_QT = "/assets/laptop_animation.mov";
const ALT_SRC_QT = "/assets/promo_video.mov";

const LaptopAnimation: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  return (
    <section id="Laptop Animation" className="w-full">
      {/* Desktop/Tablet Animation */}
      <div className="hidden lg:block">
        <LaptopVideo ref={targetRef} />
      </div>

      {/* Mobile Layout */}
      <div className="w-full overflow-hidden">
        <div className="relative left-1/2 -translate-x-1/2 w-[130vw] -mb-20">
          <video
            className="w-full max-w-none h-auto rounded-xl"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
          >
            <source src={ALT_SRC_WEBM} type="video/webm" />
            <source src={ALT_SRC_QT} type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="text-center mt-6 px-4">
          <p className="text-3xl font-bold text-white">
            Invest In Effects <span className="text-custom">Today</span>
          </p>
          <a
            href="https://buy.stripe.com/test_bIYaFAguNcV0dPy3cd"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block px-6 py-3 text-xl text-white border-2 border-custom rounded-xl font-bold transition-all duration-150"
          >
            Buy Now
          </a>
        </div>
      </div>
    </section>
  );
};

// Keep the original animation untouched
const LaptopVideo = forwardRef<HTMLDivElement>((_, ref) => {
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
    offset: ["start start", "end 110%"],
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
      className="relative h-[160vh]"
      style={{
        paddingLeft: PADDING,
        paddingRight: PADDING,
        width: `calc(100vw - ${2 * PADDING}px)`,
      }}
    >
      <div
        className="relative overflow-hidden w-full sticky top-5"
        style={{
          height: `min(calc(100vh - ${PADDING * 2}px), 80vw)`,
        }}
      >
        <video
          ref={mainRef}
          loop
          playsInline
          muted={false}
          onLoadedMetadata={onMainLoaded}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: showAlt ? "none" : "block" }}
        >
          <source
            src={isSafari ? MAIN_SRC_QT : MAIN_SRC_WEBM}
            type="video/webm"
          />
        </video>

        <video
          ref={altRef}
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: showAlt ? "block" : "none" }}
        >
          <source
            src={isSafari ? ALT_SRC_QT : ALT_SRC_WEBM}
            type="video/webm"
          />
        </video>

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
