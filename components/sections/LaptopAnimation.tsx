// components/LaptopAnimation.tsx

import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import lottie, { AnimationItem } from "lottie-web";
import animationData from "../../lib/laptopAnim/laptop.json";

const PADDING = 20;
const BASE_SCROLL_VH = 200;
const VIDEO_RATIO = 0.15;
const EXTRA_SCROLL_VH = 30;
const WRAPPER_VH = BASE_SCROLL_VH + EXTRA_SCROLL_VH;

const ALT_SRC_WEBM = "/assets/promo_video.webm";
const ALT_SRC_QT = "/assets/promo_video.mov";

const ASPECT_RATIO = 16 / 9; // Consistent 16:9 aspect ratio

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
  const stickyRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLVideoElement>(null);
  const mainAnimRef = useRef<AnimationItem>();

  useImperativeHandle(ref, () => wrapperRef.current!);

  const isSafari =
    typeof navigator !== "undefined" &&
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const [totalFrames, setTotalFrames] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const [overlayZ, setOverlayZ] = useState(-1);

  useEffect(() => {
    if (!mainContainerRef.current) return;
    mainAnimRef.current = lottie.loadAnimation({
      container: mainContainerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice", // Maintain aspect ratio and fill
      },
    });
    mainAnimRef.current.addEventListener("DOMLoaded", () => {
      setTotalFrames(mainAnimRef.current!.totalFrames);
    });
    return () => mainAnimRef.current?.destroy();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const promoThreshold = VIDEO_RATIO * (BASE_SCROLL_VH / WRAPPER_VH);
    const nowPromo = progress < promoThreshold;
    setShowPromo(nowPromo);

    if (!nowPromo && mainAnimRef.current && totalFrames > 0) {
      const endNorm = BASE_SCROLL_VH / WRAPPER_VH;
      const scrubP = Math.min(
        1,
        Math.max(0, (progress - promoThreshold) / (endNorm - promoThreshold))
      );
      const rawFrame = Math.floor(scrubP * totalFrames);
      const frame = Math.max(0, Math.min(rawFrame, totalFrames - 1));
      mainAnimRef.current.goToAndStop(frame, true);
      setOverlayZ(frame > totalFrames / 2 + 3 ? 30 : -1);
    }
  });

  useEffect(() => {
    const alt = altRef.current;
    if (!alt) return;
    if (showPromo) alt.play().catch(() => {});
    else alt.pause();
  }, [showPromo]);

  return (
    <div
      ref={wrapperRef}
      className="relative mb-20"
      style={{
        position: "relative",
        paddingLeft: PADDING,
        paddingRight: PADDING,
        width: `calc(100vw - ${2 * PADDING}px)`,
        height: `${WRAPPER_VH}vh`,
      }}
    >
      <div
        ref={stickyRef}
        className="relative w-full mx-auto"
        style={{
          position: "sticky",
          top: PADDING,
          maxHeight: `min(calc(100vh - ${PADDING * 2}px), 80vw)`,
          aspectRatio: `${ASPECT_RATIO}`,
          overflow: "hidden",
        }}
      >
        <div
          ref={mainContainerRef}
          className="absolute inset-0 w-full h-full object-cover z-20 -ml-1"
          style={{
            display: showPromo ? "none" : "block",
            transform: "scale(1.05)",
            transformOrigin: "center center",
          }}
        />

        <video
          ref={altRef}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-20"
          style={{
            display: showPromo ? "block" : "none",
            transform: "scale(1.05)",
            transformOrigin: "center center",
          }}
        >
          {isSafari ? (
            <source src={ALT_SRC_QT} type="video/quicktime" />
          ) : (
            <source src={ALT_SRC_WEBM} type="video/webm" />
          )}
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute inset-0 flex justify-center items-start z-10"
          style={{ top: "28%", zIndex: overlayZ }}
        >
          <div className="flex flex-col items-center">
            <p className="text-[3.3vw] font-bold text-white">
              Invest In Effects <span className="text-custom">Today</span>
            </p>
            <a
              href="https://pay.nalopacks.com/b/7sY28q9rv9P48zEbRDgEg00"
              target="_blank"
              rel="noreferrer"
              className="mt-1 px-20 py-2 text-2xl text-white border-2 border-custom rounded-[2rem] font-bold transition duration-150 cursor-pointer text-center"
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
