import { Loader2 } from "@/assets/icons/Loader2";
import { PlayerNext } from "@/assets/icons/PlayerNext";
import { PlayerPause } from "@/assets/icons/PlayerPause";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { PlayerPrev } from "@/assets/icons/PlayerPrev";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { useWindowStore } from "@/store/window-store";

interface Props {
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

export const BtnPlayers = ({ setDirection }: Props) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const isPlaying = useAudioContextStore((state) => state.isPlaying);
  const { play, pause, prev, next } = usePlayTrack();
  const tracks = useTracksPlayingStore((state) => state.tracks);
  const loading = useAudioContextStore((state) => state.loading);

  return (
    <div className="flex flex-row justify-center items-center gap-2 sm:gap-1">
      <button
        className="p-3 sm:p-2 rounded-full bg-black/75 cursor-pointer active:bg-gray-500/50"
        onClick={() => {
          prev(tracks.findIndex((track) => track.id === selectedTrack?.id));
          setDirection(-1);
        }}
      >
        <PlayerPrev className="size-7 sm:size-5" />
      </button>
      {!selectedTrack || !isPlaying ? (
        <button
          className="p-4 sm:p-2 rounded-full bg-black/75 cursor-pointer active:bg-gray-500/50"
          onClick={() => play()}
        >
          <PlayerPlay className="size-12 sm:size-8" />
        </button>
      ) : (
        <button
          className="p-4 sm:p-2 rounded-full bg-black/75 cursor-pointer active:bg-gray-500/50"
          onClick={() => pause()}
        >
          {loading ? (
            <Loader2 className="size-12 sm:size-8 animate-spin" />
          ):(
            <PlayerPause className="size-12 sm:size-8" />
          )}
        </button>
      )}
      <button
        className="p-3 sm:p-2 rounded-full bg-black/75 cursor-pointer active:bg-gray-500/50"
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
