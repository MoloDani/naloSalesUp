import Link from "next/link";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";
import Blob from "../ui/Blob";

function AboutUs() {
  return (
    <section
      id="about"
      className="flex sm:h-screen lg: h-[80%] lw-full flex-col items-center justify-start py-20 lg:flex-col relative overflow-x-hidden"
    >
      <Divider />
      <Blob x="90%" y="30%" size={"300px"} />
      <motion.div
        variants={parentVariant(0.5, 0.25)}
        whileInView="visible"
        viewport={{ once: true }}
        initial="hidden"
        className="flex w-full flex-1 items-center justify-center pb-10"
      >
        <div className= "relative flex flex-col items-center justify-center px-5 lg:flex-row w-full gap-20 lg:gap-64">
          <motion.div
            variants={childrenVar("horizontal", "spring")}
            className="w-full lg:w-1/3"
          >
            {/* <motion.h1 className="font-bold tracking-[-0.05em] text-custom text-4xl pl-8 pb-1 lg:text-6xl">
              Why Us?
            </motion.h1> */}

            {/* <div className="w-full">
              <motion.div className="h-[2px] w-2/3 bg-custom/30" />
            </div> */}

            <motion.p className="text-3xl px-3 pt-2">
              Our{" "}
              <motion.span className="font-bold text-custom">
                fast turnaround
              </motion.span>{" "}
              means we can deliver{" "}
              <motion.span className="font-bold text-custom">
                within 24 hours
              </motion.span>{" "}
              when needed. With a team approach, we ensure{" "}
              <motion.span className="font-bold text-custom">
                consistent quality
              </motion.span>{" "}
              across every project.
            </motion.p>
          </motion.div>

          <motion.div
            variants={childrenVar("horizontal", "spring")}
            className="w-full text-right lg:w-1/3"
          >
            {/* <motion.h1 className="font-bold tracking-[-0.05em] text-custom text-4xl pb-1 pr-8 lg:text-6xl">
              About Us
            </motion.h1>

            <div className="w-full">
              <motion.div className="h-[2px] w-2/3 bg-custom/30 ml-auto" />
            </div> */}

            <motion.p className="text-3xl px-3 pt-2">
              At Nalo Visuals, our team of expert editors is driven by{" "}
              <motion.span className="font-bold text-custom">
                creativity
              </motion.span>
              . We’re here to build{" "}
              <motion.span className="font-bold text-custom">
                lasting partnerships
              </motion.span>{" "}
              and bring your projects{" "}
              <motion.span className="font-bold text-custom">
                to life
              </motion.span>
              .
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutUs;
