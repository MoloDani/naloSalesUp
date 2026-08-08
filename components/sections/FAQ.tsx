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
    q: <h3>What does the Plugin Contain?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>
          You'll get access to:
        </p>
        <ul
          className="mx-2"
          style={{ listStyleType: "circle", listStylePosition: "inside" }}
        >
          <li>147 Presets</li>
          <li>60 3D Overlays</li>
          <li>95 Essential (2D) Overlays</li>
          <li>62 3D Objects</li>
          <li>55 SFX</li>
          <li>10 3D Titlecards</li>
          <li>9 Project Files</li>
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
          We'll provide you with all plugins required. We'll sort you out.
        </p>
      </div>
    ),
  },
  {
    index: 3,
    q: <h3>How will I receive the plugin and get monthly updates?</h3>,
    a: (
      <div className="flex flex-col gap-2">
        <p>It's simple:</p>
        <ol className="mx-2 flex flex-col gap-1" style={{ listStyleType: "decimal", listStylePosition: "inside" }}>
          <li>Buy the plugin</li>
          <li>Receive an email with your license</li>
          <li>Create your password</li>
          <li>Install the plugin in After Effects</li>
          <li>Log in with your credentials</li>
          <li>Connect your device</li>
          <li>Start using the plugin</li>
        </ol>
        <p className="mt-2">Monthly updates are delivered automatically through the plugin.</p>
      </div>
    ),
  },
  {
    index: 4,
    q: <h3>What if I don't know After Effects?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>Don't worry.</p>
        <p>
          We include clear tutorials that walk you through everything. Also, overlays and sound effects can be used in other editing software.
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
          After Effects 2021 and newer.
        </p>
      </div>
    ),
  },
  {
    index: 6,
    q: <h3>Who is the plugin for?</h3>,
    a: (
      <div className="flex flex-col gap-3">
        <p>The plugin, and all assets are suitable for everyone..</p>
        <p>
          This includes beginner directors with no After Effects experience, as well as professional editors.
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
    <section id="FAQ-section">
      <div className="flex flex-col md:flex-row w-full max-w-[90vw] mx-auto my-12 md:my-[7vh] justify-center md:gap-32 gap-8 items-start relative px-4">
        <div className="flex flex-col w-full md:w-[30vw] gap-4 md:gap-7 text-base sm:text-lg md:text-xl md:sticky">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="mb-2">
            Don’t resell them, legal actions will be taken immediately. <br />{" "}
            These are gatekept assets from our team members.
          </p>
          <p className="mb-2">
            We do not guarantee any profits or financial success if you are
            lazy.
          </p>
          <p>
            <b>Contact us</b> <br />
            <a className="underline" href="mailto:support@nalovisuals.com">
              support@nalovisuals.com
            </a>
          </p>
        </div>
        <div className="w-full md:w-[32vw] mt-1">
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
          <div className="my-1" key={item.index}>
            <div
              className="bg-custom px-5 py-2 text-black text-xl flex flex-row justify-between items-center cursor-pointer"
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
                alt={show == item.index ? "Collapse" : "Expand"}
              />
            </div>
            <div
              className={`px-5 bg-custom/10 ${show == item.index ? "py-3" : "py-0 overflow-hidden"}`}
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
