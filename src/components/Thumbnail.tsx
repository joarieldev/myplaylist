import { useWindowStore } from "@/store/window-store";
import caratula from "@/assets/caratula-vacia.webp";
import { motion, usePresenceData } from "motion/react";
import { forwardRef } from "react";
import { ITrack } from "@/interfaces/Track";
import { useDetailStore } from "@/store/detail-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import ScrollText from "./ScrollText";

export const Thumbnail = forwardRef(function Thumbnail(
  { selectedTrack }: { selectedTrack?: ITrack | null },
  ref: React.Ref<HTMLDivElement>
) {
  const setWindow = useWindowStore((state) => state.setWindow);
  const direction = usePresenceData();
  const setList = useDetailStore((state) => state.setList);
  const playlist = useTracksPlayingStore((state) => state.playlist);

  const handleTabWindow = () => {
    if(selectedTrack && selectedTrack.tags === "local") {
      window.location.hash = "#local"
      setWindow("local");
    }else{
      setList(playlist);
      setWindow("detail");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.1 },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="flex justify-center items-center h-full sm:h-[350px] flex-col"
    >
      {selectedTrack ? (
        <>
          <div className="flex justify-center items-center h-96 py-4">
            <div className="size-72 sm:size-48 flex items-center justify-center">
              <span onClick={handleTabWindow} className="cursor-pointer">
                <motion.img
                  key={`thumbnail-${selectedTrack.id}`}
                  layoutId={`track-thumbnail-${selectedTrack.id}`}
                  src={selectedTrack.artwork["150x150"]}
                  alt={selectedTrack.title}
                  className="max-w-full max-h-full rounded-xl pointer-events-none shadow"
                  title={selectedTrack.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = caratula.src
                  }}
                />
              </span>
            </div>        
          </div>
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              key={`info-${selectedTrack.id}`}
              layout="position"
              layoutId={`track-info-${selectedTrack.id}`}
              className="flex flex-col items-center gap-1"
            >
              <h1
                className="font-family-montserrat font-bold text-xl sm:text-lg text-center max-sm:bg-black/25 rounded-full px-2 cursor-pointer"
                title={selectedTrack.title}
                onClick={handleTabWindow}
              >
                <ScrollText text={selectedTrack.title} width={320} />
              </h1>
              <p className="text-sm font-medium text-center max-sm:bg-black/25 rounded-full px-2">
                <ScrollText text={selectedTrack.user.name} width={192} />
              </p>
            </motion.div>
          </div>
        </>
      ):(
        <>
          <div className="flex justify-center items-center h-96 py-4">
            <img
              src={caratula.src}
              alt="caratula"
              className="size-72 sm:size-48 pointer-events-none shadow"
            />
          </div>
          <div className="h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <h1 className="font-family-montserrat font-bold text-xl sm:text-lg max-sm:bg-black/25 rounded-full px-2">
                  -
                </h1>
                <p className="text-sm font-medium max-sm:bg-black/25 rounded-full px-2">
                  -
                </p>
              </div>
          </div>
        </>
      )}
    </motion.div>
  );
});
