import { PlayerNext } from "@/assets/icons/PlayerNext";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useTracksStore } from "@/store/tracks-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

export const BtnPlayers = () => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isPaused = useAudioContextStore((state) => state.isPaused);
  const { play, pause, prev, next } = usePlayTrack();
  const tracks = useTracksStore((state) => state.tracks);

  return (
    <div
      className={clsx(
        "flex flex-row justify-center items-center gap-1",
        !selectedTrack && "pointer-events-none opacity-50"
      )}
    >
      <button
        className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
        onClick={() =>
          prev(tracks.findIndex((track) => track.id === selectedTrack?.id))
        }
      >
        <PlayerPrev className="size-5" />
      </button>
      {!selectedTrack || isPaused ? (
        <button
          className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
          onClick={() => play()}
        >
          <PlayerPlay className="size-8" />
        </button>
      ) : (
        <button
          className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
          onClick={() => pause()}
        >
          <PlayerPause className="size-8" />
        </button>
      )}
      <button
        className="p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
        onClick={() =>
          next(tracks.findIndex((track) => track.id === selectedTrack?.id))
        }
      >
        <PlayerNext className="size-5" />
      </button>
    </div>
  );
};
