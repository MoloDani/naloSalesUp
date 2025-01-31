import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const navConfig = {
  unscrolledStyle:
    "bg-transparent border-b border-transparent backdrop-blur-none",
  scrolledStyle: "bg-custom/10 border-b border-custom/30 backdrop-blur-sm",
};

type navLinkT = {
  name: string;
  link: string;
};

const navLinkA: navLinkT[] = [
  // {
  //   name: "about us",
  //   link: "/#about",
  // },
  // {
  //   name: "credits",
  //   link: "/#credits",
  // },
  // {
  //   name: "skills",
  //   link: "/#skills",
  // },
  // {
  //   name: "services",
  //   link: "/#services",
  // },
  // {
  //   name: "portfolio",
  //   link: "/#portfolio",
  // },
  // {
  //   name: "testimonials",
  //   link: "/#testimonials",
  // },
  // {
  //   name: "discord",
  //   link: "/#discord",
  // },
  // {
  //   name: "contact",
  //   link: "/#contact",
  // },
];

function Navbar() {
  const { scrollY } = useScroll();

  const [navStyle, setnavStyle] = useState(navConfig.unscrolledStyle);

  const [navMenuState, setnavMenuState] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setnavStyle(navConfig.scrolledStyle);
    } else {
      setnavStyle(navConfig.unscrolledStyle);
    }
  });

  const router = useRouter();

  function sendTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return null;
}

function NavMenuComp() {
  return (
    <ul className="absolute left-0 top-[60px] flex h-screen w-full flex-col items-center justify-start gap-5 border-t border-custom/30 bg-black/50 pt-10 backdrop-blur-sm">
      {navLinkA.map((item, index) => (
        <motion.li
          variants={{
            hidden: { x: "-30px", opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: "tween",
              },
            },
          }}
          key={index}
        >
          <NavLinkC link={item.link} name={item.name} />
        </motion.li>
      ))}
    </ul>
  );
}

function NavLinkC({ link, name }: navLinkT) {
  return (
    <Link
      href={link}
      scroll={false}
      className=" relative px-1 font-semibold capitalize before:absolute before:-bottom-1 before:right-0 before:h-0.5 before:w-[0%] before:bg-custom/75 before:transition-all hover:before:left-0 hover:before:w-full"
    >
      {name}
    </Link>
  );
}

export default Navbar;
