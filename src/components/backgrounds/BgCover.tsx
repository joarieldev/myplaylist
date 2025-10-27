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
      <motion.img
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        key={`bg-cover-${selectedTrack?.id}`}
        src={selectedTrack?.artwork["150x150"] ?? caratula.src}
        className="fixed inset-0 -z-20 w-full h-[65dvh] sm:h-[75dvh] object-cover saturate-200 blur-[110px] sm:blur-[190px]"
        alt={selectedTrack?.title}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = caratula.src
        }}
      />
      <div className={clsx("fixed inset-0 -z-10 transition-colors duration-500",visualizer !== "none" ? "bg-black/75" : "bg-transparent")} />
    </>
  );
};
