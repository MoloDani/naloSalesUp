import Link from "next/link";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Divider from "../utils/Divider";
import { motion } from "framer-motion";

// divier
{
  /* <div className="w-full px-5">
<motion.div
  variants={childrenVar("vertical", "spring")}
  className="h-[1px] w-full bg-custom/30"
/>
</div> */
}

function Hiring() {
  return (
    <section
      id="hiring"
      className="flex min-h-screen w-full flex-col items-center justify-start "
    >
      <Divider />
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
                className="font-bold tracking-[0.25em] text-white text-opacity-75"
              >
                HIRING
              </motion.span>
              <motion.span
                variants={childrenVar("vertical", "spring")}
                className="text-2xl font-semibold md:text-3xl"
              >
                Join Our Team.
              </motion.span>
            </div>
            <motion.p
              variants={childrenVar("vertical", "spring")}
              className="text-center text-sm italic text-white text-opacity-75"
            >
              The opportunity to launch yourself into the editing world
            </motion.p>
          </div>
          <div className="w-full px-5">
            <motion.div
              variants={childrenVar("vertical", "spring")}
              className="h-[1px] w-full bg-custom/30"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-10 px-5 lg:flex-row">
            <motion.span
              variants={childrenVar("vertical", "spring")}
              className="w-full max-w-[300px] text-center text-xl font-semibold lg:max-w-[400px] lg:text-left "
            >
              <span className="text-2xl">
                <span className="font-bold text-custom">Passionate </span>about
                editing?
              </span>
              <br />
              <br />
              Apply right now and become part of our talented team of editors
              and shape the future of content!
            </motion.span>
            <motion.span
              variants={childrenVar("vertical", "spring")}
              className="w-full max-w-[300px] text-center text-xl font-semibold lg:max-w-[400px] "
            >
              NALO Visuals is currently
              <span className="text-custom"> looking for editors </span>to join
              our creative roster.
              <br />
              <br />
              If you have experience in
              <span className="text-custom"> visual effects</span> and possess
              excellent <span className="text-custom">editing skills</span>, we
              want to hear from you.
              <br />
              <br />
              Take this opportunity to collaborate on
              <span className="text-custom"> exciting projects</span> and
              <span className="text-custom"> showcase your talent</span> with
              NALO Visuals.
            </motion.span>
            <motion.div
              variants={childrenVar("vertical", "spring")}
              className="flex w-full max-w-[300px] flex-col items-end justify-center gap-7 text-center text-lg font-semibold lg:max-w-[400px] lg:text-right "
            >
              <span className="text-2xl">What we’re looking for:</span>
              <span className=" w-full max-w-[350px]">
                <span className="mr-2.5 font-bold">·</span>Skilled editors with
                previous experience in music videos/commercials
              </span>
              <span className=" w-full max-w-[350px] ">
                <span className="mr-2.5 font-bold">·</span>Creativity that
                brings unique flows and styles to different projects
              </span>
              <span className=" w-full max-w-[350px]">
                <span className="mr-2.5 font-bold">·</span>Time efficient
                editors that can manage and meet deadlines
              </span>
            </motion.div>
          </div>
          <div className="w-full px-5">
            <motion.div
              variants={childrenVar("vertical", "spring")}
              className="h-[1px] w-full bg-custom/30"
            />
          </div>
          <motion.div variants={childrenVar("vertical", "spring")}>
            <Link target="_blank" href={"https://forms.gle/aGiVnTuLdCdXHL8cA"}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="flex items-center justify-center gap-2.5 rounded-md border border-custom/30 bg-custom/10 px-8 py-5 pl-7 text-xl font-black"
              >
                <div className="h-8 w-8 fill-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full"
                    viewBox="0 0 384 512"
                  >
                    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
                  </svg>
                </div>
                Apply Here
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hiring;
