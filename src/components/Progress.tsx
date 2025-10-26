import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import clsx from "clsx";

export const Progress = () => {
  const duration = useAudioContextStore((state) => state.duration);
  const currentTime = useAudioContextStore((state) => state.currentTime);
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const bufferTime = useAudioContextStore((state) => state.bufferTime);
  const { formatTime } = usePlayTrack();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioElement) {
      audioElement.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="size-full flex flex-col justify-center items-center gap-2">
      <div className={clsx("relative w-full h-2 group", !audioElement && "pointer-events-none")}>
        <progress
          max={duration}
          value={bufferTime}
          className="absolute w-full h-full opacity-75 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-neutral-600 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gray-400"
        />
        <progress
          max={duration}
          value={currentTime}
          className="absolute w-full h-full opacity-75 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gray-200"
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className="absolute w-full h-full cursor-pointer opacity-0 transition-opacity duration-200 accent-gray-200 group-hover:opacity-75 appearance-none"
        />
      </div>
      <p className="flex items-center gap-1 justify-between sm:justify-center w-full text-sm">
        <span className="max-sm:bg-black/25 rounded-full max-sm:px-2">{formatTime(currentTime)}</span>
        <span className="max-sm:hidden">-</span>
        <span className="max-sm:bg-black/25 rounded-full max-sm:px-2">{formatTime(duration)}</span>
      </p>
    </div>
  );
};
