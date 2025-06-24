import React from "react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import animationData from "../../lib/laptopAnim/laptop.json";

const style = { height: 800, width: "100%" };
const options = { animationData, loop: false, autoplay: false };

const LottieTest: React.FC = () => {
  // ① Grab the entire hook return value
  const lottieObj = useLottie(options, style);

  // ② Plug it into the interactivity hook
  const Animated = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      { visibility: [0, 0.4], type: "stop", frames: [0, 0] },
      { visibility: [0.4, 0.9], type: "seek", frames: [0, 25] },
      { visibility: [0.9, 1], type: "stop", frames: [25, 25] },
    ],
  });

  // ③ Render the interactive animation
  return Animated;
};

export default LottieTest;
