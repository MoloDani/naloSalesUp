import Link from "next/link";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";
import Image from "next/image";
import BackgroundTransition from "../ui/BackgroundTransition";

// divier
{
  /* <div className="w-full px-5">
<motion.div
  variants={childrenVar("vertical", "spring")}
  className="h-[1px] w-full bg-custom/30"
/>
</div> */
}

const LinkButton: React.FC = () => (
  <Link target="_blank" href={"https://discord.gg/Gs3VHQGSFy"}>
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="flex max-w-[22rem] items-center justify-center gap-2.5 mt-5 rounded-md border border-custom/30 bg-custom/10 px-6 py-4 text-xl font-black"
    >
      <div className="h-7 w-7 fill-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          viewBox="0 0 640 512"
        >
          <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
        </svg>
      </div>
      Join Here
    </motion.div>
  </Link>
);

function Discord() {
  return (
    <section
      id="discord"
      className="flex min-h-[80vh] w-full flex-col items-center justify-start bg-custom/5 my-5"
    >
      <BackgroundTransition x="5" />

      <motion.div
        variants={parentVariant(0.5, 0.25)}
        whileInView="visible"
        viewport={{ once: true }}
        initial="hidden"
        className="flex w-full flex-1 items-center justify-center pb-10 "
      >
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2.5 px-5">
            <div className="flex flex-col items-center justify-center">
              <motion.span
                variants={childrenVar("vertical", "spring")}
                className="text-4xl font-bold lg:text-6xl"
              >
                Join Our Server!
              </motion.span>
            </div>
          </div>

          <div className="flex w-screen items-center justify-center gap-5 flex-col lg:gap-24">
            <div className="px-5 w-screen relative hidden lg:inline-block">
              <video
                src="/assets/DISCORD_ANTIMATION_2.mp4"
                className="w-full h-auto mb-5 ml-3"
                autoPlay
                muted
                loop
              ></video>
              <div className="absolute flex flex-col items-center justify-center top-[40%] right-[-10vw] p-1 transform -translate-x-1/2 -translate-y-1/2 ">
                <motion.div className="text-[2.5vw] text-center">
                  To <motion.span className="font-bold">connect</motion.span>,{" "}
                  <motion.span className="font-bold">learn</motion.span> and{" "}
                  <motion.span className="font-bold">grow</motion.span>.
                </motion.div>
                <motion.div className="text-[2.5vw] text-center">
                  <motion.span className="font-bold">Open</motion.span> for all{" "}
                  <motion.span className="font-bold">editors</motion.span> and{" "}
                  <motion.span className="font-bold">directors</motion.span>.
                </motion.div>
                <LinkButton />
              </div>
            </div>
            <div className="flex flex-col lg:hidden">
              <div className="flex justify-center items-center overflow-hidden w-full">
                <video
                  src="/assets/iPhone_animation_solo.webm"
                  className="max-w-none w-[150vw] h-auto ml-32"
                  autoPlay
                  muted
                  loop
                ></video>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <motion.div className="text-xl text-center mt-7">
                  To <motion.span className="font-bold">connect</motion.span>,{" "}
                  <motion.span className="font-bold">learn</motion.span> and{" "}
                  <motion.span className="font-bold">grow</motion.span>.
                </motion.div>
                <motion.div className="text-xl text-center">
                  <motion.span className="font-bold">Open</motion.span> for all{" "}
                  <motion.span className="font-bold">editors</motion.span> and{" "}
                  <motion.span className="font-bold">directors</motion.span>.
                </motion.div>

                <div className="flex items-center justify-center">
                  <LinkButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <BackgroundTransition x="5" flip={true} />
    </section>
  );
}

export default Discord;
