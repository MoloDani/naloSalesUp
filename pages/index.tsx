"use client";

import AffiliateTab from "@/components/sections/AfiliateTab";
import BgImage from "@/components/sections/BgImage";
import BuySection from "@/components/sections/BuySection";
import BuySectionWithPhone from "@/components/sections/BuySectionWithPhone";
import EditAnimation from "@/components/sections/EditAnimation";
import FAQ from "@/components/sections/FAQ";
import FreeSample from "@/components/sections/FreeSample";
import GoToFAQ from "@/components/sections/GoToFAQ";
import InnitSection from "@/components/sections/InnitSection";
import LaptopAnimation from "@/components/sections/LaptopAnimation";
import LaptopAnimationPhone from "@/components/sections/LaptopAnimationPhone";
import LottieTest from "@/components/sections/LottieTest";
import MeetAnimation from "@/components/sections/MeetAnimation";
import VideoCompareSection from "@/components/sections/SliderComparison";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // delegate so it works regardless of when #goToFAQ is rendered
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("#goToFAQ");
      if (!target) return;
      const el = document.getElementById("faq-section");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-start w-full box-border">
      <BgImage />

      <div className="w-full block lg:hidden">
        <LaptopAnimationPhone />
      </div>

      <div className="w-full hidden lg:block">
        <LaptopAnimation />
      </div>

      <BuySection />

      <VideoCompareSection
        leftSources={[
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/1 - Before.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/2 - Before.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/3 - Before.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/4 - Before.mp4", type: "video/mp4" },
        ]}
        rightSources={[
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/1 - After.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/2 - After.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/3 - After.mp4", type: "video/mp4" },
          { src: "/assets/nalo_before-afters-website_2025-10-01_1703/4 - After.mp4", type: "video/mp4" },
        ]}
        maxHeightClass="max-h-[65vh]"
        pairLabels={[
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Effects Made <span class='text-custom'>Simple</span></h2>
           <p class="text-base sm:text-2xl mb-6 font-semibold">
             If you're a director or editor, you can make insane visuals like this, and start charging more
           </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Use On <span class='text-custom'>Any Video</span></h2>
           <p class="text-base sm:text-2xl mb-6 font-semibold">
             Works on every timeline, every software.
           </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Drag & Drop In <span class='text-custom'>Seconds</span></h2>
           <p class="text-base sm:text-2xl mb-6 font-semibold">
             Create before & afters instantly.
           </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Got Questions?</h2>
           <p class="text-base sm:text-2xl mb-6 font-semibold">
             <button id="goToFAQ" class="underline hover:text-custom">Check FAQ</button>
           </p>`,
        ]}
      />

      {/* <EditAnimation /> */}
      <MeetAnimation />
      <BuySectionWithPhone />
      <AffiliateTab />

      {/* anchor target */}
      <div id="faq-section">
        <FAQ />
      </div>

      <FreeSample />
    </main>
  );
}
