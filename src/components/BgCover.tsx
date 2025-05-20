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
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        key={`bg-cover-${selectedTrackLocal?.id}`}
        style={{
          backgroundImage: `url(${selectedTrack.artwork["480x480"]})`,
        }}
        className="bg-cover bg-center bg-no-repeat h-[75vh] left-0 right-0 fixed pointer-events-none -z-10 top-0 blur-[120px] saturate-200"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.25 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.25 }}
      transition={{ duration: 0.6 }}
      key={`bg-cover-${selectedTrackLocal?.id}`}
      style={{
        backgroundImage: `url(${
          selectedTrackLocal?.metadata.cover ?? caratula.src
        })`,
      }}
      className="bg-cover bg-center bg-no-repeat h-[75vh] left-0 right-0 fixed pointer-events-none -z-10 top-0 blur-[120px] saturate-200"
    />
  );
};
