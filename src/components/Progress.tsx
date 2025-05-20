import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import clsx from "clsx";

export const Progress = () => {
  const duration = useAudioContextStore((state) => state.duration);
  const currentTime = useAudioContextStore((state) => state.currentTime);
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const { formatTime } = usePlayTrack();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioElement) {
      audioElement.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <>
      <div className={clsx("relative w-full sm:w-80 h-4 group", !audioElement && "pointer-events-none opacity-50")}>
        <progress
          max={duration}
          value={currentTime}
          className="absolute w-full h-full opacity-75 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-gray-500 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-gray-200"
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          className="absolute w-full h-full cursor-pointer opacity-0 transition-opacity duration-200 accent-gray-200 group-hover:opacity-100"
        />
      </div>
      <p className="text-sm pb-4">
        {formatTime(currentTime)} - {formatTime(duration)}
      </p>
    </>
  );
};
