import EditAnimation from "@/components/sections/EditAnimation";
import LaptopAnimation from "@/components/sections/LaptopAnimation";
import Page from "@/components/sections/Page";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start w-full box-border overflow-hidden">
      <EditAnimation></EditAnimation>
      <LaptopAnimation></LaptopAnimation>
    </main>
  );
}
