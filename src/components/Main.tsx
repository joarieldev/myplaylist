import { Layout } from "./Layout";
import { useWindowStore } from "@/store/window-store";
import { BtnPlayers } from "./btns/BtnPlayers";
import { Progress } from "./Progress";
import { Thumbnail } from "./Thumbnail";
import { ThumbnailLocal } from "./ThumbnailLocal";
import { BtnPlayersLocal } from "./btns/BtnPlayersLocal";
import { ToggleVisualizer } from "./ToggleVisualizer";
import { BtnVolume } from "./btns/BtnVolume";
import { BtnVisualizer } from "./btns/BtnVisualizer";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { IFile } from "@/interfaces/File";
import { ITrack } from "@/interfaces/Track";
import { BtnSesion } from "./btns/BtnSesion";
import { Category } from "@/assets/icons/Category";

export const Main = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);

  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );

  const [selectedItem, setSelectedItem] = useState<ITrack | null>(
    selectedTrack
  );
  const [selectedItemLocal, setSelectedItemLocal] = useState<IFile | null>(
    selectedTrackLocal
  );

  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (!selectedTrack) return;
    setSelectedItem(selectedTrack);
  }, [selectedTrack]);

  useEffect(() => {
    if (!selectedTrackLocal) return;
    setSelectedItemLocal(selectedTrackLocal);
  }, [selectedTrackLocal]);

  return (
    <Layout>
      <nav className="flex gap-4 justify-between py-2 px-3 sm:px-0 sm:py-0">
        <span className="size-6 max-sm:hidden">
          <BtnSesion />
        </span>
        <ToggleVisualizer />
        <button
          onClick={() => setWindow("library")}
          className="cursor-pointer text-gray-300 hover:text-white transition-colors max-sm:hidden"
          title="biblioteca"
        >
          <Category />
        </button>
      </nav>
      <section className="flex flex-col grow">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          {selectedTrack ? (
            <Thumbnail key={selectedTrack.id} selectedTrack={selectedItem} />
          ) : (
            <ThumbnailLocal
              key={selectedTrackLocal?.id}
              selectedTrackLocal={selectedItemLocal}
            />
          )}
        </AnimatePresence>
        <div className="size-full flex flex-col justify-center items-center gap-4 sm:gap-2">
          <div className="flex w-full sm:w-80 h-full justify-evenly items-center">
            <BtnVisualizer />
            {selectedTrack ? (
              <BtnPlayers setDirection={setDirection} />
            ) : (
              <BtnPlayersLocal setDirection={setDirection} />
            )}
            <BtnVolume />
          </div>
          <div className="size-full w-full sm:w-80 px-8 sm:px-0">
            <Progress />
          </div>
        </div>
      </section>
    </Layout>
  );
};
