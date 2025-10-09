import { Volume } from "@/assets/icons/Volume";
import { VolumeOff } from "@/assets/icons/VolumeOff";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

export const BtnVolume = () => {
  const volume = useAudioContextStore((state) => state.volume);
  const isMuted = useAudioContextStore((state) => state.isMuted);
  const setIsMuted = useAudioContextStore((state) => state.setIsMuted);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );
  const gainNode = useAudioContextStore((state) => state.gainNode);
  const setVolume = useAudioContextStore((state) => state.setVolume);

  const volumeControl = (vol: number) => {
    if (!gainNode) return;
    gainNode.gain.value = vol;
    setVolume(vol);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (audioElement) {
      volumeControl(value);
      if (isMuted.muted) {
        setIsMuted(false, value);
      }
    }
  };

  const toggleMute = () => {
    if (audioElement) {
      if (volume === 0) {
        volumeControl(isMuted.volume!);
        setIsMuted(false, isMuted.volume!)
      } else {
        volumeControl(0);
        setIsMuted(true, volume)
      }
    }
  };

  return (
    <div
      className={clsx(
        "relative group",
        !selectedTrackLocal &&
          !selectedTrack &&
          "pointer-events-none opacity-50"
      )}
    >
      <button
        className="py-1 px-3 rounded-full bg-black/50 cursor-pointer active:bg-gray-500/50"
        onClick={() => toggleMute()}
      >
        {volume === 0 || isMuted.muted ? (
          <VolumeOff className="size-5" />
        ) : (
          <Volume className="size-5" />
        )}
      </button>
      <div className="absolute bottom-14 -left-[14px] transition-opacity duration-200 -rotate-90 flex pl-2 group-hover:opacity-100 opacity-0">
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          value={volume}
          step="0.01"
          onChange={handleChange}
          className="cursor-pointer w-16 accent-gray-200"
        />
      </div>
    </div>
  );
};
