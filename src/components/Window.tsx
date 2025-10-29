import { Main } from "./Main";
import { useWindowStore } from "@/store/window-store";
import { Toaster } from "sonner";
import { Upload } from "./Upload";
import { useVisualizerStore } from "@/store/visualizer-store";
import { BgVisualizer } from "./backgrounds/BgVisualizer";
import { BgCover } from "./backgrounds/BgCover";
import { About } from "./About";
import { AnimatePresence } from "motion/react";
import { Library } from "./Library";
import { Local } from "./Local";
import { Trending } from "./Trending";
import { Search } from "./Search";
import { Favorites } from "./Favorites";
import { Detail } from "./Detail";
import { useEffect } from "react";
import { Windows as WindowTabType } from "@/store/window-store";
import { motion } from "motion/react";
import { useIsMoving } from "@/hooks/useIsMoving";
import clsx from "clsx";
import { Category } from "@/assets/icons/Category";
import { Heart } from "@/assets/icons/Heart";
import { Search as SearchIcon } from "@/assets/icons/Search";
import { BtnSesion } from "./btns/BtnSesion";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { useAudioContextStore } from "@/store/audio-context-store";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { Loader2 } from "@/assets/icons/Loader2";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerNext } from "@/assets/icons/PlayerNext";
import caratula from "@/assets/caratula-vacia.webp";

export const Window = () => {
  return (
    <>
      <BgCover />
      <Visualizers />
      <Windows />
      <Upload />
      <About />
      <Toaster position="bottom-center" />
    </>
  );
};

const VALID_WINDOWTAB = new Set<WindowTabType>([
  "main",
  "library",
  "local",
  "trending",
  "search",
  "favorites",
  "detail",
]);

const Windows = () => {
  const windowTab = useWindowStore((state) => state.window);
  const setWindowTab = useWindowStore((state) => state.setWindow);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (
      hash &&
      VALID_WINDOWTAB.has(hash as WindowTabType) &&
      hash !== "#detail"
    ) {
      setWindowTab(hash as WindowTabType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IsMovingMouse>
      <main className="sm:p-2 sm:bg-black/50 rounded-md h-full w-full sm:h-[520px] sm:w-[456px] overflow-hidden">
        <div className="flex flex-col h-full max-sm:overflow-hidden max-sm:overflow-y-auto layout-scroll relative">
          <AnimatePresence mode="wait">
            {windowTab === "main" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll">
                <Main />
              </div>
            )}
            {windowTab === "library" && (
              <motion.div
                key="library"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14"
              >
                <Library />
              </motion.div>
            )}
            {windowTab === "local" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14">
                <Local />
              </div>
            )}
            {windowTab === "trending" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14">
                <Trending />
              </div>
            )}
            {windowTab === "search" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14">
                <Search />
              </div>
            )}
            {windowTab === "favorites" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14">
                <Favorites />
              </div>
            )}
            {windowTab === "detail" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll sm:pb-14">
                <Detail />
              </div>
            )}
          </AnimatePresence>
          <MiniPlayer mobile={false} />
          <footer className="sticky bottom-0 px-3 py-3 z-10 sm:hidden">
            <nav className="flex flex-col gap-2 bg-neutral-900/95 rounded-3xl">
              <MiniPlayer mobile={true} />
              <div className="flex">
                <button
                  onClick={() => {
                    setWindowTab("library");
                    window.location.hash = "#library";
                  }}
                  className={clsx(
                    "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                    windowTab === "library" && "text-white",
                  )}
                >
                  <Category className="size-7 stroke-[3.5]" />
                </button>
                <button
                  onClick={() => {
                    setWindowTab("search");
                    window.location.hash = "#search";
                  }}
                  className={clsx(
                    "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                    windowTab === "search" && "text-white",
                  )}
                >
                  <SearchIcon className="size-7 stroke-[4]" />
                </button>
                <button
                  onClick={() => {
                    setWindowTab("favorites");
                    window.location.hash = "#favorites";
                  }}
                  className={clsx(
                    "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                    windowTab === "favorites" && "text-white",
                  )}
                >
                  <Heart className="size-7 stroke-[4]" />
                </button>
                <span className="py-2 w-full grid place-content-center">
                  <BtnSesion />
                </span>
              </div>
            </nav>
          </footer>
        </div>
      </main>
    </IsMovingMouse>
  );
};

const Visualizers = () => {
  const visualizer = useVisualizerStore((state) => state.visualizer);

  if (visualizer === "none") return null;

  return <BgVisualizer />;
};

const IsMovingMouse = ({ children }: { children: React.ReactNode }) => {
  const { getOpacity, handlers } = useIsMoving();

  return (
    <div
      className={clsx(
        "max-sm:size-full transition-opacity duration-200",
        getOpacity(),
      )}
      {...handlers}
    >
      {children}
    </div>
  );
};

const MiniPlayer = ({ mobile }: { mobile: boolean }) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isPaused = useAudioContextStore((state) => state.isPaused);
  const { play, pause, prev, next } = usePlayTrack();
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const loading = useAudioContextStore((state) => state.loading);
  const windowTab = useWindowStore((state) => state.window);
  const setWindowTab = useWindowStore((state) => state.setWindow);

  return (
    <AnimatePresence mode="wait">
      {windowTab !== "main" && selectedTrack && (
        <motion.div
          key="music"
          initial={mobile ? { height: 0, opacity: 0 } : { y: 25, opacity: 0 }}
          animate={mobile ? { height: 48, opacity: 1 } : { y: 1, opacity: 1 }}
          exit={mobile ? { height: 0, opacity: 0 } : { y: 25, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            !mobile &&
              "absolute bottom-12 sm:bottom-1 right-2 left-2 bg-neutral-900/95 rounded-3xl max-sm:hidden"
          )}
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
                src={selectedTrack.artwork["150x150"]}
                alt={selectedTrack.title}
                className="w-auto h-6 rounded-full object-cover aspect-video"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = caratula.src;
                }}
              />
              <div className="flex flex-col overflow-hidden">
                <p className="font-medium text-sm truncate">
                  {selectedTrack.title}
                </p>
                <p className="font-medium text-xs truncate">
                  {selectedTrack.user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <button
                className="p-2 rounded-full cursor-pointer active:bg-neutral-500/25"
                onClick={(e) => {
                  e.stopPropagation();
                  prev(
                    tracks.findIndex((track) => track.id === selectedTrack.id)
                  );
                }}
              >
                <PlayerPrev className="size-5 sm:size-4" />
              </button>
              {!selectedTrack || isPaused ? (
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
                    tracks.findIndex((track) => track.id === selectedTrack.id)
                  );
                }}
              >
                <PlayerNext className="size-5 sm:size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
