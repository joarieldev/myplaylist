import { PlayerNext } from "@/assets/icons/PlayerNext";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { usePlayTrackLocal } from "@/hooks/usePlayTrackLocal";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useFilesStore } from "@/store/files-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

export const BtnPlayersLocal = () => {
  const selectedTrackLocal = useWindowStore((state) => state.selectedTrackLocal);
  const isPaused = useAudioContextStore((state) => state.isPaused);
  const { play, pause, prev, next } = usePlayTrackLocal();
  const files = useFilesStore((state) => state.files);

  return (
    <div
      className={clsx(
        "size-full flex flex-row justify-center items-center gap-1",
        !selectedTrackLocal && "pointer-events-none opacity-50"
      )}
    >
      <button
        className=" p-2 rounded-full bg-black cursor-pointer active:bg-gray-500/50"
        onClick={() =>
          prev(files.findIndex((file) => file.id === selectedTrackLocal?.id))
        }
      >
        <PlayerPrev className="size-5" />
      </button>
      {!selectedTrackLocal || isPaused ? (
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
          next(files.findIndex((file) => file.id === selectedTrackLocal?.id))
        }
      >
        <PlayerNext className="size-5" />
      </button>
    </div>
  );
};
