import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { BgVantaCells } from "./BgVantaCells";
import { BgCanvas } from "./BgCanvas";
import dynamic from "next/dynamic";

const BgVantaBirds = dynamic(() => import("./BgVantaBirds").then((mod) => mod.BgVantaBirds), {
  ssr: false,
});

export const BgVisualizer = () => {
  const mode = useBgVisualizerStore((state) => state.mode);

  if (mode === "vantajs-birds") return <BgVantaBirds />;
  if (mode === "vantajs-cells") return <BgVantaCells />;

  return <BgCanvas />;
};
