import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";

function RENAMEME() {
  return (
    <section className="flex min-h-screen w-full select-none flex-col items-center justify-start bg-custom/5 ">
      <Divider />
      <motion.div
        variants={parentVariant(0.5, 0.25)}
        whileInView="visible"
        viewport={{ once: true }}
        initial="hidden"
        className="flex w-full flex-1 items-center justify-center pb-10 "
      >
        <div className="flex flex-col items-center justify-center gap-10">
          <motion.div variants={childrenVar("vertical", "spring")}></motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default RENAMEME;
