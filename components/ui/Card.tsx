import React from "react";

interface CardProps {
  videoUrl: string; // URL of the video
  title: string;    // Title text
  subtitle: string; // Subtitle text
  plays: boolean;
  canControl: boolean;
}

const Card: React.FC<CardProps> = ({ videoUrl, title, subtitle, plays, canControl }) => {
  return (
    <div className="flex flex-col rounded-md overflow-hidden shadow-lg">
      <video
        muted={true}
        autoPlay={plays}
        src={videoUrl}
        controls = {canControl}
        className="rounded-md"
      />
      <div className="flex flex-col justify-center items-center text-center mt-2 px-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default Card;
