import React from "react";

interface TransitionProps {
  flip?: boolean; // If true, flips the component upside down
  x: string; // This will be the dynamic part of the background
}

const BackgroundTransition: React.FC<TransitionProps> = ({
  flip = false,
  x,
}) => {
  return (
    <div
      className={`w-full h-12 ${
        flip ? "bg-gradient-to-t" : "bg-gradient-to-b"
      } from-black to-custom/${x}`}
    ></div>
  );
};

export default BackgroundTransition;
