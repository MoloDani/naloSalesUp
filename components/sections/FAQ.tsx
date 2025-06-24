import { Divide } from "lucide-react";
import React, { useState } from "react";

interface QuestProp {
  index: number;
  q: React.ReactNode;
  a: React.ReactNode;
}

const FAQData: QuestProp[] = [
  {
    index: 1,
    q: <h3>What does the pack contain?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>
          The pack contains over 300 premium assets made by our 8 team members:
        </p>
        <ul
          className="mx-2"
          style={{ listStyleType: "circle", listStylePosition: "inside" }}
        >
          <li>100+ AE presets</li>
          <li>90+ Essential overlays</li>
          <li>35+ 3D overlays</li>
          <li>55+ SFX</li>
          <li>8 project files, from all theam members</li>
          <li>10+ 3D title cards</li>
          <li>40+ 3D objects</li>
          <li>Clear & detailed tutorials on how to use everything</li>
        </ul>
      </div>
    ),
  },
  {
    index: 2,
    q: <h3>What plugins do I need?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>You’ll only need Sapphire, RSMB, and Element 3D.</p>
        <p>
          To make full use of project files, we also recommend other plugins
          like Red Giant Universe, and Deep Glow, but those are optional.
        </p>
        <p>Email support</p>
      </div>
    ),
  },
  {
    index: 3,
    q: <h3>How will I recive the pack and get pack updates?</h3>,
    a: (
      <div>
        <p>
          After purchase, we will provide you with a download link via email,
          and add you to an email list where we will email you new assets
          monthly, for free, forever.
        </p>
      </div>
    ),
  },
  {
    index: 4,
    q: <h3>What if I don't know how to use After Effects?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>Don't worry.</p>
        <p>
          We include clear tutorials that walk you through everything. Also,
          overlays and sound effects can be used in other editing software.
        </p>
      </div>
    ),
  },
  {
    index: 5,
    q: <h3>What softwares are compatible/required?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>
          What softwares are compatible/required? After Effects 2021+ for
          presets, title cards, and project files.
        </p>
        <p>Overlays and sound effects can be used in other softwares.</p>
      </div>
    ),
  },
  {
    index: 6,
    q: <h3>Who is the pack for?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>The pack is suitable for everyone.</p>
        <p>
          This includes beginner directors with no After Effects experience, as
          well as professional editors.
        </p>
      </div>
    ),
  },
  {
    index: 7,
    q: <h3>Mac or Windows compatible?</h3>,
    a: (
      <div>
        <p>Works on both. No issues.</p>
      </div>
    ),
  },
];

const FAQ = () => {
  return (
    <section id="FAQ">
      <div className="flex w-[90vw] flex-row my-32 justify-center gap-32 items-start relative">
        <div className="flex flex-col w-[25%] gap-7 sticky top-[25vh]">
          <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
          <p>
            Don’t resell them, legal actions will be taken immediately. <br />{" "}
            These are gatekeept assets from our team members.
          </p>
          <p>
            We do not guarantee any profits or financial success if you are
            lazy.
          </p>
          <p>
            <b>Contact us</b> <br />
            <a href="mailto:support@nalovisuals.com">support@nalovisuals.com</a>
          </p>
        </div>
        <div className="w-[30%] mt-1">
          <Questions />
        </div>
      </div>
    </section>
  );
};

const Questions: React.FC = ({}) => {
  const [show, setShow] = useState(0);
  return (
    <div>
      {FAQData.map((item) => {
        return (
          <div className="my-1">
            <div
              className="bg-custom px-5 py-2 text-black font-semibold flex flex-row justify-between items-center cursor-pointer"
              onClick={() => {
                show == item.index ? setShow(0) : setShow(item.index);
              }}
            >
              {item.q}
              <img
                className="h-[20px] w-auto transition-all duration-100"
                src={
                  show == item.index ? "/assets/minus.png" : "/assets/plus.png"
                }
              />
            </div>
            <div
              className={`px-5 bg-custom/10 ${show == item.index ? "py-3" : ""} `}
            >
              {show == item.index ? item.a : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
