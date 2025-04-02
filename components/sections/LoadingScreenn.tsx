import { FC } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ onFinish }) => {
  return (
    <div className="fixed inset-0 flex items-center w-full h-full justify-center bg-black z-50">
      <video
        src="/assets/Crown_just_green_Loading_Animation_v2.mp4"
        autoPlay
        muted
        onEnded={onFinish}
        playsInline
        className="w-[80vw] h-auto object-cover"
      />
    </div>
  );
};

export default LoadingScreen;
