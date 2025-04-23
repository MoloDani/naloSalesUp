import React, { useEffect, useState } from "react";

interface NoBgVideoProps {
  srcBase: string; // Define the type for the srcBase prop
}

const NoBgVideo: React.FC<NoBgVideoProps> = ({ srcBase }) => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if the browser is Safari
    const detectedSafari =
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor);
    setIsSafari(detectedSafari);
  }, []);

  // Choose the video file based on the browser
  const videoSrc = isSafari ? `${srcBase}.mov` : `${srcBase}.webm`;
  const videoType = isSafari ? "video/quicktime" : "video/webm"; // Safari needs quicktime type for .mov

  return (
    <div className="relative">
      <video
        key={videoSrc} // This ensures the video is re-rendered when `srcBase` changes
        className="w-[90vw] lg:w-[35vw] h-auto align-middle -mt-80 mb-10 lg:mb-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        onError={() => {
          console.error(`Error loading video: ${videoSrc}`);
          // Optionally show a fallback image or message here instead of an alert
        }}
      >
        <source src={videoSrc} type={videoType} />
        Sorry, your browser doesn't support the video tag.
      </video>
    </div>
  );
};

export default NoBgVideo;
