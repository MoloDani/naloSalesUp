import { motion } from "framer-motion";
import React from "react";

interface ButtonProps {
  x: string;
  y: string;
  text: string;
  onClick: () => void;
  opacity?: number;
  scale?: number;
}

const Button: React.FC<ButtonProps> = ({
  x,
  y,
  text,
  onClick,
  opacity = 1,
  scale = 0,
}) => {
  const variants = {
    rest: {
      background: "linear-gradient(to bottom, #64b76c, #085f20)",
      border: "none",
      color: "#000",
      WebkitBackgroundClip: "initial",
      WebkitTextFillColor: "initial",
    },
    hover: {
      background: "transparent",
      border: "4px solid transparent",
      borderImageSlice: 1,
      borderImageSource: "linear-gradient(to bottom, #64b76c, #085f20)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      backgroundImage: "linear-gradient(to bottom, #64b76c, #085f20)",
      color: "transparent",
    },
  };

  return (
    <motion.div
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      variants={variants}
      className="absolute text-center font-bold tracking-tight shadow-lg rounded-full px-8 py-4 text-xl lg:text-3xl"
      style={{
        top: y,
        left: x,
        transform: `translate(-50%, -50%) scale(${scale + 0.3})`,
        opacity,
        cursor: "pointer",
      }}
    >
      {text}
    </motion.div>
  );
};

export default Button;
