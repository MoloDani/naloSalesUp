import { FC } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ onFinish }) => {
  return (
    <div className="fixed inset-0 flex items-center w-full h-full justify-center bg-black z-50">
      <video
        src="/assets/Crown_just_green_Loading_Animation.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={onFinish}
        className="w-[80vw] max-w-[300px] h-auto object-cover"
        webkit-playsinline="true"
      />
    </div>
  );
};

export default LoadingScreen;
