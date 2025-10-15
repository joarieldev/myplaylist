import { Main } from "./Main";
import { useWindowStore } from "@/store/window-store";
import { Toaster } from "sonner";
import { Upload } from "./Upload";
import { useVisualizerStore } from "@/store/visualizer-store";
import { BgVisualizer } from "./backgrounds/BgVisualizer";
import { BgCover } from "./backgrounds/BgCover";
import { ModalInfo } from "./ModalInfo";
import { useModalInfoStore } from "@/store/modal-info-store";
import { AnimatePresence } from "motion/react";
import { Library } from "./Library";
import { Local } from "./Local";
import { Trending } from "./Trending";
import { Search } from "./Search";
import { Favorites } from "./Favorites";
import { Detail } from "./Detail";
import { useEffect } from "react";
import { Windows as WindowTabType } from "@/store/window-store";

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
    <>
      {windowTab === "main" && <Main />}
      {windowTab === "library" && <Library />}
      {windowTab === "local" && <Local />}
      {windowTab === "trending" && <Trending />}
      {windowTab === "search" && <Search />}
      {windowTab === "favorites" && <Favorites />}
      {windowTab === "detail" && <Detail />}
    </>
  );
};

const Visualizers = () => {
  const visualizer = useVisualizerStore((state) => state.visualizer);

  if (visualizer === "none") return null;

  return <BgVisualizer />;
};

const About = () => {
  const showInfo = useModalInfoStore((state) => state.showInfo);

  return <AnimatePresence>{showInfo && <ModalInfo />}</AnimatePresence>;
};
