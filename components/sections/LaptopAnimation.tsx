import { useEffect, useRef, useState } from "react";

const VideoScrollController: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const totalFrames = 25; // Adjust based on your video FPS * duration

  // Bounds as a percentage of the component's height
  const lowerBound = 0.8; // Start controlling at 20% visibility
  const upperBound = 1; // Stop controlling at 80% visibility

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the component is in view (0 to 1)
      const visibilityRatio = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / viewportHeight)
      );

      // Check if we're within the bounds
      if (visibilityRatio >= lowerBound && visibilityRatio <= upperBound) {
        const progress =
          (visibilityRatio - lowerBound) / (upperBound - lowerBound);
        const newFrame = Math.round(progress * totalFrames);

        videoRef.current.currentTime = newFrame / 30; // Assuming 30 FPS
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[100vh] flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/assets/laptop_animation.webm"
        className="w-[90%]"
        controls={false}
      />
    </div>
  );
};

export default VideoScrollController;
