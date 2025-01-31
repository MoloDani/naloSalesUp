import { motion } from "framer-motion";
import React from "react";

interface props {
  x: string;
  y: string;
  text: string;
  onClick: () => void;
  opacity: number;
  scale: number;
}

const Button: React.FC<props> = ({ x, y, text, onClick, opacity, scale }) => {
  return (
    <div
      className={`text-center hover:bg-custom hover:border-0 border-green-900 px-10 py-3 rounded-3xl hover:cursor-pointer font-bold tracking-[-0.05em] shadow-[0_0_10px] bg-transparentborder-darkGreen border-4 bg-opacity-50 transition duration-500 shadow-custom/10 text-xl lg:text-3xl w-auto absolute`}
      onClick={onClick}
      style={{
        top: y,
        left: x,
        transform: `translate(-50%, -50%) scale(${scale + 0.3})`,
        opacity: opacity,
      }}
    >
      {text}
    </div>
  );
};

export default Button;
