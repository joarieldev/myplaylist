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

export const Main = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isModal = useModalVisualizerStore((state) => state.isModal);

  return (
    <Layout
      heading={
        <nav className="flex gap-4 justify-end">
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
      <section className="flex flex-col h-full overflow-hidden">
        {selectedTrack ? <Thumbnail /> : <ThumbnailLocal />}
        <div className="size-full flex flex-col justify-center items-center gap-2">
          <div className="flex w-80 h-full justify-evenly items-center">
            <BtnVisualizer />
            {selectedTrack ? <BtnPlayers /> : <BtnPlayersLocal />}
            <BtnVolume />
          </div>
          <Progress />
        </div>
      </section>
      {isModal && <ModalVisualizer />}
    </Layout>
  );
};
