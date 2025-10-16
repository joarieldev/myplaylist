import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion, usePresenceData } from "motion/react";
import { forwardRef } from "react";
import { IFile } from "@/interfaces/File";
import ScrollText from "./ScrollText";

export const ThumbnailLocal = forwardRef(function ThumbnailLocal(
  { selectedTrackLocal }: { selectedTrackLocal?: IFile | null },
  ref: React.Ref<HTMLDivElement>
) {
  const setWindow = useWindowStore((state) => state.setWindow);
  const direction = usePresenceData();

  const handleTabWindow = () => {
    setWindow("local");
    window.location.hash = "#local"
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
          <div className="size-72 sm:size-48 flex items-center justify-center">
            <span onClick={handleTabWindow} className="cursor-pointer">
              <motion.img
                key={`thumbnail-${selectedTrackLocal.id}`}
                layoutId={`track-thumbnail-${selectedTrackLocal.id}`}
                src={selectedTrackLocal?.metadata.cover ?? caratula.src}
                alt={selectedTrackLocal.metadata.title}
                className="max-w-full max-h-full rounded-xl pointer-events-none shadow"
                title={selectedTrackLocal.metadata.title}
              />
            </span>
          </div>
        ) : (
          <img
            src={caratula.src}
            alt="caratula"
            className="size-72 sm:size-48 pointer-events-none shadow"
          />
        )}
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        {selectedTrackLocal ? (
          <motion.div
            key={`info-${selectedTrackLocal.id}`}
            layout="position"
            layoutId={`track-info-${selectedTrackLocal.id}`}
            className="flex flex-col items-center gap-0.5"
          >
            <h1
              className="font-family-montserrat font-bold text-xl sm:text-lg text-center max-sm:bg-black/25 rounded-full px-2 cursor-pointer"
              title={selectedTrackLocal.metadata.title}
              onClick={handleTabWindow}
            >
              <ScrollText text={selectedTrackLocal.metadata.title} width={320} />
            </h1>
            <p className="text-sm font-medium text-center max-sm:bg-black/25 rounded-full px-2">
              <ScrollText text={selectedTrackLocal.metadata.artist} width={192} />
            </p>
          </motion.div>
        ) : (
          <div className="text-center flex flex-col items-center gap-0.5">
            <h1 className="font-family-montserrat font-bold text-xl sm:text-lg bg-black/25 rounded-full px-2">
              -
            </h1>
            <p className="text-sm font-medium bg-black/25 rounded-full px-2">
              -
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
});
