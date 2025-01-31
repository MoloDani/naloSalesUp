import React from "react";

interface BlobProps {
  x?: string;
  y?: string;
  size?: string;
}

const Blob: React.FC<BlobProps> = ({ x, y, size = "400px" }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: "rgba(3, 172, 19, 0.7)",
        filter: "blur(130px)",
        top: y,
        left: x,
        transform: "translate(-50%, -50%)",
      }}
      className="rounded-full animate-wiggle_animation absolute z-[-1]"
    />
  );
};

export default Blob;
