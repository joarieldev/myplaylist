import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion } from "motion/react";

export const BgCover = () => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );

  if (selectedTrack) {
    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        key={`bg-cover-${selectedTrack?.id}`}
        style={{
          backgroundImage: `url(${selectedTrack.artwork["150x150"]})`,
        }}
        className="bg-cover bg-center bg-no-repeat h-[75dvh] left-0 right-0 fixed pointer-events-none -z-10 top-0 blur-[120px] saturate-200"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.8 }}
      key={`bg-cover-${selectedTrackLocal?.id}`}
      style={{
        backgroundImage: `url(${
          selectedTrackLocal?.metadata.cover ?? caratula.src
        })`,
      }}
      className="bg-cover bg-center bg-no-repeat h-[75dvh] left-0 right-0 fixed pointer-events-none -z-10 top-0 blur-[120px] saturate-200"
    />
  );
};
