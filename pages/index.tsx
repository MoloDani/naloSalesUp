import AffiliateTab from "@/components/sections/AfiliateTab";
import BgImage from "@/components/sections/BgImage";
import BuySection from "@/components/sections/BuySection";
import BuySectionWithPhone from "@/components/sections/BuySectionWithPhone";
import EditAnimation from "@/components/sections/EditAnimation";
import FAQ from "@/components/sections/FAQ";
import FreeSample from "@/components/sections/FreeSample";
import InnitSection from "@/components/sections/InnitSection";
import LaptopAnimation from "@/components/sections/LaptopAnimation";
import LaptopAnimationPhone from "@/components/sections/LaptopAnimationPhone";
import LottieTest from "@/components/sections/LottieTest";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start w-full box-border">
      <BgImage />

      {/* <LottieTest /> */}
      {/* show on small→medium screens */}
      <div className="w-full block lg:hidden">
        <LaptopAnimationPhone />
      </div>

      {/* show on large+ screens */}
      <div className="w-full hidden lg:block">
        <LaptopAnimation />
      </div>

      <BuySection />
      <EditAnimation />
      <BuySectionWithPhone />
      <AffiliateTab />
      <FAQ />
      <FreeSample />
    </main>
  );
}
