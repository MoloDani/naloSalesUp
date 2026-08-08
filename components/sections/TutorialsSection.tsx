import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const thumbnails = Array.from({ length: 27 }, (_, i) => `/assets/ALL Thumbnails Patreon/${i + 1}.jpg`);

const TutorialsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate through cards - smoother, faster rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % thumbnails.length);
    }, 2000); // Change card every 2 seconds for smoother flow

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "Tutorials_SeeTutorials_Button",
    });
  };

  // Calculate position of a card relative to center (-2 to +2, or outside)
  const getRelativePosition = (cardIndex: number) => {
    let diff = cardIndex - centerIndex;

    // Handle wrapping for infinite loop
    if (diff > thumbnails.length / 2) diff -= thumbnails.length;
    if (diff < -thumbnails.length / 2) diff += thumbnails.length;

    return diff;
  };

  const getCardStyle = (cardIndex: number) => {
    const position = getRelativePosition(cardIndex);

    // Responsive spacing - smaller on mobile, wider for 16:9 cards
    const spacing = isMobile ? 140 : 320;

    // Hide cards that are too far from center (only show 3)
    if (position < -1 || position > 1) {
      return {
        transform: `translateX(${position < 0 ? -spacing * 2 : spacing * 2}px) scale(0.5)`,
        zIndex: 0,
        opacity: 0,
      };
    }

    const configs: Record<number, { rotate: number; translateX: number; scale: number; zIndex: number; opacity: number }> = {
      [-1]: { rotate: -3, translateX: -spacing * 0.75, scale: 0.75, zIndex: 1, opacity: 0.6 },
      [0]: { rotate: 0, translateX: 0, scale: 1.15, zIndex: 10, opacity: 1 },
      [1]: { rotate: 3, translateX: spacing * 0.75, scale: 0.75, zIndex: 1, opacity: 0.6 },
    };

    const config = configs[position];

    return {
      transform: `translateX(${config.translateX}px) rotate(${config.rotate}deg) scale(${config.scale})`,
      zIndex: config.zIndex,
      opacity: config.opacity,
    };
  };

  return (
    <section
      id="tutorials"
      className="flex flex-col items-center justify-center w-full overflow-hidden py-16 lg:py-28"
    >
      {/* Fan Carousel */}
      <div className="relative w-full flex justify-center items-center h-[140px] sm:h-[200px] lg:h-[260px] mb-4 sm:mb-10">
        {thumbnails.map((src, cardIndex) => {
          const style = getCardStyle(cardIndex);

          return (
            <div
              key={cardIndex}
              className="absolute transition-all duration-500 ease-in-out"
              style={style}
            >
              <div className="w-[160px] h-[90px] sm:w-[256px] sm:h-[144px] lg:w-[320px] lg:h-[180px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={src}
                  alt={`Tutorial thumbnail ${cardIndex + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-6xl font-bold mb-4 text-center">
        Unlimited <span className="text-custom">Tutorials</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-base sm:text-2xl mb-6 font-semibold max-w-[90vw] sm:max-w-[70vw] whitespace-nowrap lg:max-w-[50vw]">
        Get all our 30+ VFX Masterclass tutorials and project files worth <br /> 24.99£/month. We upload weekly
      </p>

      {/* See Tutorials Button */}
      <a
        href="https://www.patreon.com/nalovisuals"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] h-[100px] scale-[0.7] lg:scale-[0.6]"
      >
        <img
          src="/assets/See_Tutorials-Idle.png"
          alt="See Tutorials"
          draggable={false}
          className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src="/assets/See_Tutorials-Hover.png"
          alt=""
          draggable={false}
          className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </a>
    </section>
  );
};

export default TutorialsSection;
