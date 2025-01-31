import Card from "../ui/Card";
import { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/router";
import { text } from "stream/consumers";
import Button from "../ui/Button";
import VideoSliding from "./VideoSliding";

const videoConfig = {
  unscrolledStyle: "opacity-100",
  scrolledStyle: "opacity-20",
};
const textConfig = {
  unscrolledStyle: "hidden",
  scrolledStyle: "flex",
};

function Landing() {
  const { scrollY } = useScroll();
  const [videoStyle, setVideoStyle] = useState(videoConfig.unscrolledStyle);
  const [textStyle, setTextStyle] = useState(textConfig.unscrolledStyle);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVideoStyle(videoConfig.scrolledStyle);
      setTextStyle(textConfig.scrolledStyle);
    } else {
      setVideoStyle(videoConfig.unscrolledStyle);
      setTextStyle(textConfig.unscrolledStyle);
    }
  });

  const [muteState, setMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    setMuted((prevMuteState) => {
      if (videoRef.current) {
        videoRef.current.muted = !prevMuteState; // Update the video element's muted property
      }
      return !prevMuteState; // Update the state
    });
  };

  const handleButtonClick = () => {
    window.open(
      "https://calendly.com/alexandru-marinescu7777/discovery-call",
      "_blank"
    );
  };

  return (
    <section className="flex w-full flex-col items-center justify-start relative overflow-hidden">
      <div className="w-full h-auto justify-center flex">
        <div className="w-full inline player-wrapper">
          <VideoSliding />
        </div>
        <div className="relative w-[500px] h-full md:hidden">
          <Image
            className="aspect-square object-contain"
            fill
            alt=""
            src={"/assets/phoneLandingImage.webp"}
          />
        </div>
      </div>
    </section>
  );
}

export default Landing;
