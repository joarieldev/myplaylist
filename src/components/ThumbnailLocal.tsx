import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion, usePresenceData } from "motion/react";
import { forwardRef } from "react";
import { IFile } from "@/interfaces/File";

export const ThumbnailLocal = forwardRef(function ThumbnailLocal(
  { selectedTrackLocal }: { selectedTrackLocal?: IFile | null },
  ref: React.Ref<HTMLDivElement>
) {
  const setWindow = useWindowStore((state) => state.setWindow);
  const direction = usePresenceData();

  const handleTabWindow = () => {
    setWindow("local");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.3,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="flex justify-center items-center h-full sm:h-[350px] flex-col"
    >
      <div className="flex justify-center items-center h-96 py-4">
        {selectedTrackLocal ? (
          <div
            className="size-72 sm:size-48 cursor-pointer flex items-center justify-center"
            onClick={handleTabWindow}
          >
            <motion.img
              key={`thumbnail-${selectedTrackLocal.id}`}
              layoutId={`track-thumbnail-${selectedTrackLocal.id}`}
              src={selectedTrackLocal?.metadata.cover ?? caratula.src}
              alt={selectedTrackLocal.metadata.title}
              className="max-w-full max-h-full rounded-xl pointer-events-none"
              title={selectedTrackLocal.metadata.title}
            />
          </div>
        ) : (
          <img
            src={caratula.src}
            alt="caratula"
            className="size-72 sm:size-48 pointer-events-none"
          />
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
            <h1
              className="font-family-montserrat w-80 font-bold text-lg truncate text-center"
              title={selectedTrackLocal.metadata.title}
            >
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
    </motion.div>
  );
});
