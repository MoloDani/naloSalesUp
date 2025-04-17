import React, { useEffect, useState } from "react";

interface NoBgVideoProps {
  srcBase: string; // Define the type for the srcBase prop
}

const NoBgVideo: React.FC<NoBgVideoProps> = ({ srcBase }) => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const detectedSafari =
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor);
    setIsSafari(detectedSafari);
  }, []);

  const videoSrc = isSafari ? `${srcBase}.mov` : `${srcBase}.webm`;

  const videoType = isSafari ? "video/quicktime" : "video/webm";

  return (
    <video
      key={videoSrc}
      className="w-[90vw] lg:w-[35vw] h-auto align-middle -mt-80 mb-10 lg:mb-0"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      onError={() => alert("Sorry, the video couldn't load.")}
    >
      <source src={videoSrc} type={videoType} />
      Sorry, your browser doesn't support the video tag.
    </video>
  );
};

export default NoBgVideo;
