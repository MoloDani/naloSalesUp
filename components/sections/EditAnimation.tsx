import React, { useEffect, useState } from "react";

const VideoPlayer: React.FC = () => {
  const [videoSource, setVideoSource] = useState<string | null>(null);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isWebMSupported = !!document
      .createElement("video")
      .canPlayType("video/webm; codecs=vp9");

    if (isSafari) {
      setVideoSource("/assets/LQ5_Timeline_Animation.mov");
    } else if (isWebMSupported) {
      setVideoSource("/assets/LQ5_Timeline_Animation.webm");
    } else {
      setVideoSource(null);
    }
  }, []);

  return (
    <div className="relative">
      {videoSource ? (
        <video
          className="w-[35vw] h-auto rounded-lg shadow-lg align-middle -mb-[18%]"
          src={videoSource}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <track kind="captions" src="path_to_captions.vtt" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-[35vw] h-auto rounded-lg shadow-lg flex items-center justify-center text-white">
          Video format not supported.
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
