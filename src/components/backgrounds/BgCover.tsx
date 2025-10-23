import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion } from "motion/react";
import { useVisualizerStore } from "@/store/visualizer-store";
import clsx from "clsx";

export const BgCover = () => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const visualizer = useVisualizerStore((state) => state.visualizer);

  return (
    <>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        key={`bg-cover-${selectedTrack?.id}`}
        style={{
          backgroundImage: `url(${selectedTrack?.artwork["150x150"] ?? caratula.src})`,
        }}
        className="bg-cover bg-center bg-no-repeat h-[75dvh] left-0 right-0 fixed pointer-events-none -z-20 top-0 blur-[120px] saturate-200"
      />
      <div className={clsx("fixed inset-0 -z-10 transition-colors duration-500",visualizer !== "none" ? "bg-black/80" : "bg-transparent")} />
    </>
  );
};
