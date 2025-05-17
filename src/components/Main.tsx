import { Layout } from "./Layout";
import { PlayList } from "@/assets/icons/PlayList";
import { useWindowStore } from "@/store/window-store";
import { BtnPlayers } from "./BtnPlayers";
import { Progress } from "./Progress";
import { Thumbnail } from "./Thumbnail";
import { ThumbnailLocal } from "./ThumbnailLocal";
import { BtnPlayersLocal } from "./BtnPlayersLocal";

export const Main = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);

  return (
    <Layout
      heading={
        <nav className="flex justify-end">
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
          {selectedTrack ? <BtnPlayers /> : <BtnPlayersLocal />}
          <Progress />
        </div>
      </section>
    </Layout>
  );
};
