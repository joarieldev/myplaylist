import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import caratula from "@/assets/caratula-vacia.webp";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { Loader2 } from "@/assets/icons/Loader2";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerNext } from "@/assets/icons/PlayerNext";

export const MiniPlayer = () => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isPlaying = useAudioContextStore((state) => state.isPlaying);
  const { play, pause, prev, next } = usePlayTrack();
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const loading = useAudioContextStore((state) => state.loading);
  const windowTab = useWindowStore((state) => state.window);
  const setWindowTab = useWindowStore((state) => state.setWindow);

  return (
    <AnimatePresence mode="wait">
      {windowTab !== "main" && (
        <motion.div
          key="music"
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          exit={{ y: 25, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-8 right-3 left-3 rounded-t-3xl sm:bottom-1 sm:right-2 sm:left-2 sm:rounded-3xl -z-10 bg-neutral-900/95"
        >
          <div
            className="flex justify-between items-center gap-4 px-3 h-12 active:[&:not(:has(button:active))]:bg-neutral-500/25 rounded-3xl"
            onClick={() => {
              setWindowTab("main");
              window.location.hash = "";
            }}
          >
            <div className="flex gap-2 items-center justify-cente pointer-events-none overflow-hidden">
              <img
                src={selectedTrack?.artwork["150x150"] ?? caratula.src}
                alt={selectedTrack?.title}
                className="w-auto h-6 rounded-full object-cover aspect-video"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = caratula.src;
                }}
              />
              <div className="flex flex-col overflow-hidden">
                <p className="font-medium text-sm truncate">
                  {selectedTrack?.title ?? <span className="opacity-75">-</span>}
                </p>
                <p className="font-medium text-xs truncate">
                  {selectedTrack?.user.name ?? <span className="opacity-75">-</span>}
                </p>
              </div>
            </div>
            <div
              className={clsx(
                "flex items-center justify-center gap-1",
                !selectedTrack && "pointer-events-none opacity-75"
              )}
            >
              <button
                className="p-2 rounded-full cursor-pointer active:bg-neutral-500/25"
                onClick={(e) => {
                  e.stopPropagation();
                  prev(
                    tracks.findIndex((track) => track.id === selectedTrack?.id)
                  );
                }}
              >
                <PlayerPrev className="size-5 sm:size-4" />
              </button>
              {!selectedTrack || !isPlaying ? (
                <button
                  className="p-2 rounded-full cursor-pointer active:bg-neutral-500/25"
                  onClick={(e) => {
                    e.stopPropagation();
                    play();
                  }}
                >
                  <PlayerPlay className="size-6 sm:size-5" />
                </button>
              ) : (
                <button
                  className="p-2 rounded-full cursor-pointer active:bg-neutral-500/25"
                  onClick={(e) => {
                    e.stopPropagation();
                    pause();
                  }}
                >
                  {loading ? (
                    <Loader2 className="size-6 sm:size-5 animate-spin" />
                  ) : (
                    <PlayerPause className="size-6 sm:size-5" />
                  )}
                </button>
              )}
              <button
                className="p-2 rounded-full cursor-pointer active:bg-neutral-500/25"
                onClick={(e) => {
                  e.stopPropagation();
                  next(
                    tracks.findIndex((track) => track.id === selectedTrack?.id)
                  );
                }}
              >
                <PlayerNext className="size-5 sm:size-4" />
              </button>
            </div>
          </div>
          <div className="h-8 sm:hidden"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
