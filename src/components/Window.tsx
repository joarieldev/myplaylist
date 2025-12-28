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
import { MiniPlayer } from "./MiniPlayer";

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
                className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24"
              >
                <Library />
              </motion.div>
            )}
            {windowTab === "local" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24">
                <Local />
              </div>
            )}
            {windowTab === "trending" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24">
                <Trending />
              </div>
            )}
            {windowTab === "search" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24">
                <Search />
              </div>
            )}
            {windowTab === "favorites" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24">
                <Favorites />
              </div>
            )}
            {windowTab === "detail" && (
              <div className="flex flex-col sm:h-full sm:overflow-hidden sm:overflow-y-auto max-sm:grow layout-scroll pb-24">
                <Detail />
              </div>
            )}
          </AnimatePresence>
          <footer className="sticky bottom-0 px-3 py-3 sm:px-0 sm:py-0 z-10">
            <nav>
              <MiniPlayer />
              <div className="flex bg-neutral-900/95 rounded-3xl sm:hidden">
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
