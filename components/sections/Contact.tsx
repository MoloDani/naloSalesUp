import { motion } from "framer-motion";
import Divider from "../utils/Divider";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { childrenVar, parentVariant } from "../utils/AnimateFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import CalendlyWidget from "../ui/CalendlyWidget";

type contactSocialsT = {
  link: string;
  icon: React.ReactNode;
};

const contactSocialsArray: contactSocialsT[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        viewBox="0 0 640 512"
      >
        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
      </svg>
    ),
    link: "https://discord.gg/Gs3VHQGSFy",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        viewBox="0 0 448 512"
      >
        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
      </svg>
    ),
    link: "https://www.instagram.com/nalo.visuals/",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full p-0.5"
        viewBox="0 0 512 512"
      >
        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
      </svg>
    ),
    link: "tel:+44 7366 268494",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full p-0.5"
        viewBox="0 0 448 512"
      >
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
      </svg>
    ),
    link: "https://www.tiktok.com/@nalo.visuals",
  },
];

function Contact() {
  const [emailTitle, setemailTitle] = useState("");
  const [emailBody, setemailBody] = useState("");
  const rotuer = useRouter();

  enum titleOption {
    Video = "Video Editing",
    Three = "3D Design",
    Graphic = "Graphic Design",
  }

  function sendMail() {
    if (emailTitle) {
      window.location.href = `mailto:nalovisuals@gmail.com?subject=${emailTitle}&body=${emailBody}`;
      rotuer.reload();
    } else {
      alert("Please select a service.");
    }
  }

  return (
    <section
      id="contact"
      className="flex min-h-screen w-full flex-col items-center justify-start m-40"
    >
      <div className="flex w-full flex-1 items-center justify-center">
        <motion.div
          variants={parentVariant(0.5, 0.25)}
          whileInView="visible"
          viewport={{ once: true }}
          initial="hidden"
          className="flex flex-col items-center justify-center gap-20"
        >
          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="flex flex-col items-center justify-center">
              <motion.p
                variants={childrenVar("vertical", "spring")}
                className="font-bold tracking-[-0.05em] text-center xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl pb-1 lg:text-7xl xl:text-8xl"
              >
                No Budget? No worries!
              </motion.p>
              <motion.p
                variants={childrenVar("vertical", "spring")}
                className="sm:text-xl md:text-2xl xl:text-3xl px-3 pt-2 xl:pt-7 text-center"
              >
                Let's chat for 15 minutes,{" "}
                <b className="text-custom">free of charge</b>. Come{" "}
                <b className="text-custom">meet us</b>!
              </motion.p>
            </div>
          </div>
          <div className="align-center">
            <CalendlyWidget />
          </div>
          <div className="flex items-center mb-5 justify-center gap-5">
            {contactSocialsArray.map((item, index) => (
              <motion.div
                variants={childrenVar("vertical", "spring")}
                key={index}
              >
                <ContactSocialComp icon={item.icon} link={item.link} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSocialComp({ icon, link }: contactSocialsT) {
  return (
    <Link href={link} target="_blank">
      <div className="h-12 w-12 rounded-full border border-custom/30 bg-custom/10 fill-white p-2.5">
        {icon}
      </div>
    </Link>
  );
}

export default Contact;
