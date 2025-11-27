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
import Props from "@/components/sections/SliderComparison";
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
        youtubeFirstId="7g3PuW2kVZ4" // ⬅️ put your real YT id here
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
        youtubeLabel={`
          <h2 class="text-3xl sm:text-6xl font-bold mb-2">
            Watch This <span class='text-custom'>First</span>
          </h2>
          <p class="text-base sm:text-2xl mb-6 font-semibold">
            Don't buy it yet, seriously g <br /> We want you to actually see what’s inside before spending yo money
          </p>
        `}
        pairLabels={[
          // these now map to the 4 BEFORE/AFTER slides (not the YT slide)
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Effects Made <span class='text-custom'>Simple</span></h2>
          <p class="text-base sm:text-2xl mb-6 font-semibold">
            You ever spend an hour on one effect that still doesn’t look right? This fixes that
          </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Built for <span class='text-custom'>Any</span> Style</h2>
          <p class="text-base sm:text-2xl mb-6 font-semibold">
            Doesn’t matter what video you make These effects just blend in with your style
          </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2">Make 3D <span class='text-custom'>Easy Peasy</span></h2>
          <p class="text-base sm:text-2xl mb-6 font-semibold">
            If you’re tired of fighting with Element 3D every time then try these drag & drop overlays 
          </p>`,
          `<h2 class="text-3xl sm:text-6xl font-bold mb-2"><span class='text-custom'>Impress</span> Your Clients</h2>
          <p class="text-base sm:text-2xl mb-6 font-semibold">
            People won't skip your video with these titles. Trust me, they'll be amazed
          </p>`,
        ]}
      />


      {/* <p class="text-base sm:text-2xl mb-6 font-semibold">
        <button id="goToFAQ" class="underline hover:text-custom">Check FAQ</button>
      </p> */}

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
