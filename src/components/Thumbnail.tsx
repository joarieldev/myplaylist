import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion, usePresenceData } from "motion/react";
import { forwardRef } from "react";
import { ITrack } from "@/interfaces/Track";
import { useDetailStore } from "@/store/detail-store";
import { useTracksStore } from "@/store/tracks-store";

export const Thumbnail = forwardRef(function Thumbnail(
  { selectedTrack }: { selectedTrack?: ITrack | null },
  ref: React.Ref<HTMLDivElement>
) {
  const setWindow = useWindowStore((state) => state.setWindow);
  const direction = usePresenceData();
  const setList = useDetailStore((state) => state.setList);
  const playlist = useTracksStore((state) => state.playlist);

  const handleTabWindow = () => {
    setList(playlist);
    setWindow("detail");
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
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="flex justify-center items-center h-full sm:h-[350px] flex-col"
    >
      <div className="flex justify-center items-center h-96 py-4">
        {selectedTrack ? (
          <div
            className="size-72 sm:size-48 cursor-pointer flex items-center justify-center"
            onClick={handleTabWindow}
          >
            <motion.img
              key={`thumbnail-${selectedTrack.id}`}
              layoutId={`track-thumbnail-${selectedTrack.id}`}
              src={selectedTrack.artwork["480x480"] ?? caratula.src}
              alt={selectedTrack.title}
              className="max-w-full max-h-full rounded-xl pointer-events-none"
              title={selectedTrack.title}
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
        {selectedTrack ? (
          <motion.div
            key={`info-${selectedTrack.id}`}
            layout="position"
            layoutId={`track-info-${selectedTrack.id}`}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleTabWindow}
          >
            <h1
              className="font-family-montserrat w-80 font-bold text-lg truncate text-center"
              title={selectedTrack.title}
            >
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
    </motion.div>
  );
});
