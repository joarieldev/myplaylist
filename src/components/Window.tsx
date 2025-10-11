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

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const showInfo = useModalInfoStore((state) => state.showInfo);

  return (
    <>
      <BgCover />
      {visualizer !== "none" && <BgVisualizer />}
      {window === "main" && <Main />}
      {window === "library" && <Library />}
      {window === "local" && <Local />}
      {window === "trending" && <Trending />}
      {window === "search" && <Search />}
      {window === "favorites" && <Favorites />}
      {window === "detail" && <Detail />}
      <Toaster position="bottom-center" />
      <Upload />
      <AnimatePresence>{showInfo && <ModalInfo />}</AnimatePresence>
    </>
  );
};
