import { useTabStore } from "@/store/tab-store";
import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion } from "motion/react";

export const ThumbnailLocal = () => {
  const selectedTrackLocal = useWindowStore((state) => state.selectedTrackLocal);
  const setWindow = useWindowStore((state) => state.setWindow);
  const setTab = useTabStore((state) => state.setTab);

  const handleTabWindow = () => {
    setWindow("playlist");
    setTab("local");
  };

  return (
    <>
      <div className="flex justify-center py-4">
        {selectedTrackLocal ? (
          <motion.div
            key={`thumbnail-${selectedTrackLocal.id}`}
            layoutId={`track-thumbnail-${selectedTrackLocal.id}`}
            className="size-48 rounded-md cursor-pointer overflow-hidden"
            onClick={handleTabWindow}
          >
            <img
              src={selectedTrackLocal?.metadata.cover?? caratula.src}
              alt={selectedTrackLocal.metadata.title}
              className="size-full object-cover"
            />
          </motion.div>
        ) : (
          <img src={caratula.src} alt="caratula" className="size-48" />
        )}
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        {selectedTrackLocal ? (
          <motion.div
            key={`info-${selectedTrackLocal.id}`}
            layout="position"
            layoutId={`track-info-${selectedTrackLocal.id}`}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleTabWindow}
          >
            <h1 className="font-family-montserrat w-80 font-bold text-lg truncate text-center">
              {selectedTrackLocal.metadata.title}
            </h1>
            <p className="text-sm font-medium w-48 truncate text-center">
              {selectedTrackLocal.metadata.artist}
            </p>
          </motion.div>
        ) : (
          <div className="text-center">
            <h1 className="font-family-montserrat font-bold text-lg">-</h1>
            <p className="text-sm font-medium">-</p>
          </div>
        )}
      </div>
    </>
  );
};
