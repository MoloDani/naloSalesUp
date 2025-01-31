import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";

type VideoT = {
  title: string;
  name: string;
  views: number;
  index: number;
  link: string;
};

const VideoArray: VideoT[] = [
  {
    title: "38 #AFG - Adrenaline Rush",
    name: "ADRENALINE RUSH WEBSITE.mp4",
    views: 224000,
    index: 1,
    link: "https://www.youtube.com/watch?v=LWxpIGIMqN4&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=1",
  },
  {
    title: "Kairo Keyz - Story",
    name: "WEBSITE KAIRO.mp4",
    views: 219000,
    index: 2,
    link: "https://www.youtube.com/watch?v=6_LM2NaG5xY&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=3",
  },
  {
    title: "BossMan Dlow - Pop My Shit Ft. Woodboy Gee",
    name: "BossMan Dlow - Pop My Shit Ft. Woodboy Gee (Official Music Video).mp4",
    views: 11104799,
    index: 3,
    link: "https://www.youtube.com/watch?v=bclw95xdmS8&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=4",
  },
  {
    title: "Sha Gz, Jay Hound & Faze Kaysan - No Love",
    name: "Sha Gz, Jay Hound & Faze Kaysan - No Love.mp4",
    views: 570000,
    index: 4,
    link: "https://www.youtube.com/watch?v=C9_LbX4j3Ys&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=9",
  },
  {
    title: "Lil H (ASB) - Nobody's Talking",
    name: "WEBSITE PUSHPULL LIL H.mp4",
    views: 43673,
    index: 5,
    link: "https://www.youtube.com/watch?v=hVp8wlKnBl0&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=6",
  },
  {
    title: "IzzPot - I KNOW",
    name: "WEBSITE IZZPOT.mp4",
    views: 123102,
    index: 6,
    link: "https://www.youtube.com/watch?v=mp8j34v-Xog&list=PLEZVy5pEyEYFv34VUASfZJTHonBxS8yyH&index=3",
  },
];

function Portfolio() {
  const [videoHovered, setVideoHovered] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="flex min-h-screen w-full flex-col items-center justify-start overflow-hidden py-20"
    >
      <motion.div
        variants={parentVariant(0.5, 0.25)}
        whileInView="visible"
        viewport={{ once: true }}
        initial="hidden"
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <div className="flex flex-col items-center justify-center gap-36">
          <div className="flex flex-col items-center justify-center">
            <motion.span
              variants={childrenVar("vertical", "spring")}
              className="text-4xl font-bold lg:text-6xl xl:text-7xl"
            >
              Our Work
            </motion.span>
          </div>

          <motion.div className="flex flex-col items-center justify-center w-full px-[2.5rem] gap-5 lg:grid 3xl:grid-cols-3 lg:grid-cols-2 xl:gap-20">
            {VideoArray.map((item, index) => (
              <motion.div
                key={index}
                variants={childrenVar("horizontal", "spring")}
                className="flex justify-center p-8"
              >
                <VideoComp
                  title={item.title}
                  name={item.name}
                  views={item.views}
                  index={index}
                  link={item.link}
                  videoHovered={videoHovered}
                  setVideoHovered={setVideoHovered}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

const VideoComp: React.FC<
  VideoT & {
    videoHovered: number | null;
    setVideoHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }
> = ({ title, name, views, index, link, videoHovered, setVideoHovered }) => {
  const isHovered = videoHovered === index;
  const isActive = videoHovered === null || isHovered; // All videos are active when no hover
  const [currentViews, setCurrentViews] = useState(views);
  useEffect(() => {
    if (!isHovered) return;
    let startTime: number | null = null;
    const animateViews = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      // Exponential decay formula for more dramatic growth in the start
      const progress = Math.min(elapsed / 1300, 1); // Animation duration = 1.5 seconds
      const exponentialProgress = 1 - Math.pow(1 - progress, 3); // Steeper initial growth
      const animatedViews = Math.round(exponentialProgress * views);
      setCurrentViews(animatedViews);
      if (progress < 1) {
        requestAnimationFrame(animateViews);
      } else {
        setCurrentViews(views); // Ensure it ends exactly at the target
      }
    };
    requestAnimationFrame(animateViews);
  }, [isHovered, views]);

  const handleVideoClick = () => {
    window.open(link, "_blank");
  };

  return (
    <div
      className={`lg:hover:scale-[1.1] hover:z-10 relative flex flex-col items-center transition-all h-[500px] group hover:cursor-pointer ${
        isActive ? "blur-none" : "blur-md"
      }`}
      onMouseEnter={() => setVideoHovered(index)}
      onMouseLeave={() => setVideoHovered(null)}
      onClick={() => handleVideoClick()}
    >
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 rounded-md bg-gradient-to-r from-green-400/80 via-transparent to-green-400/80 blur-xl z-0 
          ${isHovered ? "opacity-100" : "opacity-40"} 
          group-hover:opacity-100 transition-all`}
      ></div>

      <video
        src={`/assets/testimonialVideos/${name}`}
        autoPlay
        muted
        loop
        preload="metadata"
        className="relative z-10 h-full w-auto rounded-md brightness-75 lg:hover:brightness-50 transition-all object-cover"
      />

      {/* Overlay for text */}
      <motion.div className="absolute inset-[7%] flex flex-col items-start z-20 justify-end opacity-100 lg:opacity-0 lg:hover:opacity-100 hover:bg-opacity-50 transition-opacity">
        <motion.p className="text-center text-base font-bold text-darkGreen lg:text-xl">
          {title}
        </motion.p>
        <motion.p className="text-center text-sm font-bold text-gray-300 pl-5 lg:text-base">
          {new Intl.NumberFormat("en-US").format(currentViews)} views
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Portfolio;
