import { useTabStore } from "@/store/tab-store";
import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion } from "motion/react";

export const Thumbnail = () => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setWindow = useWindowStore((state) => state.setWindow);
  const setTab = useTabStore((state) => state.setTab);

  const handleTabWindow = () => {
    setWindow("playlist");
    setTab("tracks");
  };

  return (
    <>
      <div className="flex justify-center py-4">
        {selectedTrack ? (
          <motion.div
            key={`thumbnail-${selectedTrack.id}`}
            layoutId={`track-thumbnail-${selectedTrack.id}`}
            className="size-48 rounded-md cursor-pointer overflow-hidden"
            onClick={handleTabWindow}
          >
            <img
              src={selectedTrack.artwork["150x150"]}
              alt={selectedTrack.title}
              className="size-full object-cover"
            />
          </motion.div>
        ) : (
          <img src={caratula.src} alt="caratula" className="size-48" />
        )}
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        {selectedTrack ? (
          <motion.div
            key={`info-${selectedTrack.id}`}
            layout="position"
            layoutId={`track-info-${selectedTrack.id}`}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleTabWindow}
          >
            <h1 className="font-family-montserrat w-80 font-bold text-lg truncate text-center">
              {selectedTrack.title}
            </h1>
            <p className="text-sm font-medium w-48 truncate text-center">
              {selectedTrack.user.name}
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
