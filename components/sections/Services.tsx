import { motion } from "framer-motion";
import Divider from "../utils/Divider";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import BlurMargin from "../utils/BlurMargin";
import BackgroundTransition from "../ui/BackgroundTransition";

type ServiceT = {
  name: string;
  count: number;
  offset?: number;
  icon: React.ReactElement;
};

const serviceIconStyle = "h-20 w-20 stroke-white";

const ServiceList: ServiceT[] = [
  {
    name: "3D Projects",
    count: 26,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={serviceIconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
  },
  {
    name: "VFX Projects",
    count: 211,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={serviceIconStyle}
      >
        <path
          strokeLinecap="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
  },
  {
    name: "Videos Sequenced",
    count: 94,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={serviceIconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section
      id="services"
      className="flex md:h-[50vh] lg:min-h-[70vh] w-full flex-col items-center justify-start bg-custom/5 mb-28 sm:mt-20 lg:mt-0"
    >
      <BackgroundTransition x="5" />

      <div className="flex w-full flex-1 items-stretch justify-center pb-10 lg:pb-0">
        <motion.div
          variants={parentVariant(0.5, 0.25)}
          whileInView="visible"
          viewport={{ once: true }}
          initial="hidden"
          className="flex flex-col items-center justify-center gap-5"
        >
          <div className="flex flex-col items-center justify-center gap-2.5 px-5">
            <div className="flex flex-col items-center justify-center">
              <motion.span
                variants={childrenVar("vertical", "spring")}
                className="text-4xl font-bold lg:text-6xl lg:pb-10 xl:text-7xl"
              >
                What We Offer.
              </motion.span>
            </div>
          </div>
          <motion.ul
            variants={parentVariant(1, 0.5)}
            whileInView="visible"
            viewport={{ once: true }}
            initial="hidden"
            className="mt-5 flex w-full flex-col items-center justify-center gap-10 md:flex-row"
          >
            {ServiceList.map((item, index) => (
              <motion.div
                variants={childrenVar("horizontal", "spring")}
                key={index}
              >
                <ServiceComp
                  count={item.count}
                  icon={item.icon}
                  name={item.name}
                  offset={index + 1}
                />
              </motion.div>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <BackgroundTransition x="5" flip={true} />
    </section>
  );
}

function ServiceComp({ count, icon, name, offset }: ServiceT) {
  if (offset) {
    return (
      <>
        <motion.div
          variants={parentVariant(offset / 2 + 0.25, 0.25)}
          whileInView="visible"
          whileHover={{ scale: 1.1, transition: { duration: 0.25 } }}
          viewport={{ once: true }}
          initial="hidden"
          className="flex h-[260px] w-[260px] flex-col items-center justify-center gap-5 rounded-md border border-custom/30 bg-custom/5 p-2.5 hover:shadow-[0_0_10px] hover:shadow-custom/10"
        >
          <motion.div variants={childrenVar("vertical", "spring")}>
            {icon}
          </motion.div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <motion.span
              variants={childrenVar("vertical", "spring")}
              className="text-2xl font-bold text-center tracking-wider"
            >
              {name}
            </motion.span>
            <motion.span
              variants={childrenVar("vertical", "spring")}
              className="font-bold text-2xl text-white text-opacity-75"
            >
              {count}
            </motion.span>
          </div>
        </motion.div>
      </>
    );
  }
}

export default Services;
