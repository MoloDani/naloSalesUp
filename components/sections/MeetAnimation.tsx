// import React, { useMemo, useState } from "react";

// declare global {
//   interface Window {
//     gtag: (...args: any[]) => void;
//   }
// }

// const MeetAnimation = () => {
//   // SSR-safe Safari check
//   const isSafari = useMemo(() => {
//     if (typeof navigator === "undefined") return false;
//     return (
//       /Safari/.test(navigator.userAgent) &&
//       /Apple Computer/.test(navigator.vendor)
//     );
//   }, []);

//   const [isHovered, setIsHovered] = useState(false);

//   const handleClick = () => {
//     window.gtag?.("event", "click", {
//       event_category: "Button",
//       event_label: "BuyWithPhone_Button",
//     });
//   };

//   return (
//     <section
//       id="buy-now-phone"
//       className="w-full px-4 py-12"
//     >
//       <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-10">
//         {/* VIDEO – first on mobile, second on desktop */}
//         <div className="order-1 lg:order-2 w-full flex justify-center sm:-my-20">
//           <video
//             className="w-[90vw] sm:w-auto object-contain lg:h-[60vh] lg:max-h-[600px] lg:scale-[0.8] lg:pr-10"
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="auto"
//             controls={false}
//             onError={() => alert("Sorry, the video couldn't load.")}
//           >
//             {isSafari ? (
//               <source
//                 src="/assets/re-rendered MOV Google Meet-1.mov"
//                 type="video/quicktime"
//               />
//             ) : (
//               <source
//                 src="/assets/webm GOOGLE MEET ANIMATION 1.webm"
//                 type="video/webm"
//               />
//             )}
//           </video>
//         </div>

//         {/* TEXT + CTA – second on mobile, first on desktop */}
//         <div className="order-2 lg:order-1 w-full max-w-[680px] text-center lg:text-right">
//           <h1 className="text-3xl sm:text-6xl font-bold mb-2">
//             <span className="text-custom">1-1</span> Guidance
//           </h1>

//           <p className="text-base sm:text-2xl mb-6 font-semibold">
//             Every customer gets a free 1-1 call with us, <br />
//             to answer questions & get you started
//           </p>

//           <a
//             href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
//             target="_blank"
//             rel="noopener noreferrer"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             onClick={handleClick}
//             className="relative inline-block rounded-[1.6rem] w-[260px] h-[86px]"
//           >
//             <img
//               src="/assets/button_idle.png"
//               alt="Buy now"
//               draggable={false}
//               className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
//                 isHovered ? "opacity-0" : "opacity-100"
//               }`}
//             />
//             <img
//               src="/assets/button_hovered.png"
//               alt=""
//               draggable={false}
//               className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
//                 isHovered ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MeetAnimation;

import React, { useState } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const BuySectionWithPhone = () => {
  const isSafari =
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor);

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.gtag?.("event", "click", {
      event_category: "Button",
      event_label: "BuyWithPhone_Button",
    });
    console.log("Button clicked");
  };

  return (
    <section
      id="buy-now-phone"
      className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full overflow-hidden px-4 sm:pt-12"
    >
      {/* Text + CTA */}
      <div className="flex flex-col  items-center lg:text-left   lg:items-end w-full max-w-[95vw] sm:max-w-[70vw] lg:max-w-[40vw]">
        <h1 className="text-3xl sm:text-6xl font-bold mb-0 lg:mb-4 text-center lg:text-left lg:mx-0 sm:-mx-10 ">
          <span className="text-custom">1-1</span> Guidance
        </h1>

        <p className="text-right text-base sm:text-2xl mb-6 font-semibol">
             Every customer gets a free 1-1 call with us, <br />
             to answer questions & get you started
           </p>
      

        <a
          href="https://pay.nalopacks.com/b/7sYeVcavzgds2bg2h3gEg01"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="relative inline-block rounded-[1.6rem] w-[200px] sm:w-[300px] ml-0 lg:-ml-[3.8rem] -mt-[1.8rem] h-[100px] scale-[0.7] lg:scale-[0.6] "
        >
          <img
            src="/assets/button_idle.png"
            alt="Buy now"
            draggable={false}
            className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src="/assets/button_hovered.png"
            alt=""
            draggable={false}
            className={`absolute inset-0 w-full h-auto transition-opacity duration-150 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>
      </div>

      {/* Google mock-up */}
      <video
        className="hidden lg:block w-auto lg:h-[80vh] lg:pr-10"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        onError={() => alert("Sorry, the video couldn't load.")}
      >
        {isSafari ? (
              <source
                src="/assets/re-rendered MOV Google Meet-1.mov"
                type="video/quicktime"
              />
            ) : (
              <source
                src="/assets/webm GOOGLE MEET ANIMATION 1.webm"
                type="video/webm"
              />)}
      </video>

      <img
        src="/assets/notification.png"
        alt=""
        className="block lg:hidden w-[90vw] -mb-10"
      />

      
    </section>
  );
};

export default BuySectionWithPhone;

