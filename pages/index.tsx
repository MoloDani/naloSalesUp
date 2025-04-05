import BgImage from "@/components/sections/BgImage";
import BuySection from "@/components/sections/BuySection";
import EditAnimation from "@/components/sections/EditAnimation";
import LaptopAnimation from "@/components/sections/LaptopAnimation";
export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start w-full box-border">
      <BgImage></BgImage>
      <LaptopAnimation></LaptopAnimation>
      <BuySection></BuySection>
      <EditAnimation></EditAnimation>
    </main>
  );
}
