import { Layout } from "./Layout";
import { PlayList } from "@/assets/icons/PlayList";
import { useWindowStore } from "@/store/window-store";
import { BtnPlayers } from "./BtnPlayers";
import { Progress } from "./Progress";
import { Thumbnail } from "./Thumbnail";
import { ThumbnailLocal } from "./ThumbnailLocal";
import { BtnPlayersLocal } from "./BtnPlayersLocal";
import { ModalVisualizer } from "./ModalVisualizer";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { ToggleVisualizer } from "./ToggleVisualizer";
import { BtnVolume } from "./BtnVolume";
import { BtnVisualizer } from "./BtnVisualizer";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { IFile } from "@/interfaces/File";
import { ITrack } from "@/interfaces/Track";

export const Main = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isModal = useModalVisualizerStore((state) => state.isModal);

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
    <Layout
      heading={
        <nav className="flex gap-4 justify-end max-sm:px-2">
          <ToggleVisualizer />
          <button
            onClick={() => setWindow("playlist")}
            className="cursor-pointer active:text-gray-300"
            title="playlist"
          >
            <PlayList />
          </button>
        </nav>
      }
    >
      <section className="flex flex-col h-full overflow-x-hidden overflow-y-auto">
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
        <div className="size-full flex flex-col justify-center items-center gap-4 sm:gap-2 max-sm:pb-8">
          <div className="flex w-full sm:w-80 h-full justify-evenly items-center">
            <BtnVisualizer />
            {selectedTrack ? (
              <BtnPlayers setDirection={setDirection} />
            ) : (
              <BtnPlayersLocal setDirection={setDirection} />
            )}
            <BtnVolume />
          </div>
          <Progress />
        </div>
      </section>
      {isModal && <ModalVisualizer />}
    </Layout>
  );
};
