import { PlayerNext } from "@/assets/icons/PlayerNext";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useTracksStore } from "@/store/tracks-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

interface Props {
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

export const BtnPlayers = ({ setDirection }: Props) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isPaused = useAudioContextStore((state) => state.isPaused);
  const { play, pause, prev, next } = usePlayTrack();
  const tracks = useTracksStore((state) => state.tracks);

  return (
    <div
      className={clsx(
        "flex flex-row justify-center items-center gap-2 sm:gap-1",
        !selectedTrack && "pointer-events-none opacity-50"
      )}
    >
      <button
        className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
        onClick={() => {
          prev(tracks.findIndex((track) => track.id === selectedTrack?.id));
          setDirection(-1);
        }}
      >
        <PlayerPrev className="size-7 sm:size-5" />
      </button>
      {!selectedTrack || isPaused ? (
        <button
          className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
          onClick={() => play()}
        >
          <PlayerPlay className="size-12 sm:size-8" />
        </button>
      ) : (
        <button
          className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
          onClick={() => pause()}
        >
          <PlayerPause className="size-12 sm:size-8" />
        </button>
      )}
      <button
        className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
        onClick={() => {
          next(tracks.findIndex((track) => track.id === selectedTrack?.id));
          setDirection(1);
        }}
      >
        <PlayerNext className="size-7 sm:size-5" />
      </button>
    </div>
  );
};
