import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioContextStore } from "@/store/audio-context-store";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  showTime?: boolean;
}

export const Progress = ({ showTime = true }: Props) => {
  const duration = useAudioContextStore((state) => state.duration);
  const currentTime = useAudioContextStore((state) => state.currentTime);
  const setCurrentTime = useAudioContextStore((state) => state.setCurrentTime);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const buffer = useAudioContextStore((state) => state.buffer);
  const { formatTime } = usePlayTrack();
  const setIsSeeking = useAudioContextStore((state) => state.setIsSeeking);

  const [seekingTime, setSeekingTime] = useState<number | null>(null);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setSeekingTime(seekTime);
    setCurrentTime(seekTime);
  };

  const handleSeekEnd = () => {
    if (audioElement && seekingTime !== null) {
      audioElement.currentTime = seekingTime;
    }
    setIsSeeking(false);
  };

  return (
    <div className="size-full flex flex-col justify-center items-center gap-2">
      <div
        className={clsx(
          "relative w-full h-2 rounded-full bg-neutral-600 opacity-75 cursor-pointer overflow-hidden",
          !audioElement || (duration === 0 && "pointer-events-none")
        )}
      >
        <progress
          max={duration}
          value={buffer}
          className="absolute w-full h-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-neutral-600 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gray-400"
        />
        <progress
          max={duration}
          value={currentTime}
          className="absolute w-full h-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-white"
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
          onTouchStart={handleSeekStart}
          onTouchEnd={handleSeekEnd}
          onChange={handleSeekChange}
          className="absolute w-full h-full cursor-pointer accent-gray-200 opacity-0"
        />
      </div>
      {showTime && (
        <p className="flex items-center gap-1 justify-between sm:justify-center w-full text-sm">
          <span className="max-sm:bg-black/25 rounded-full max-sm:px-2">
            {formatTime(currentTime)}
          </span>
          <span className="max-sm:hidden">-</span>
          <span className="max-sm:bg-black/25 rounded-full max-sm:px-2">
            {formatTime(duration)}
          </span>
        </p>
      )}
    </div>
  );
};
