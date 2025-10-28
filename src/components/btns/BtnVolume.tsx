import { Volume } from "@/assets/icons/Volume";
import { VolumeOff } from "@/assets/icons/VolumeOff";
import { useAudioContextStore } from "@/store/audio-context-store";

export const BtnVolume = () => {
  const volume = useAudioContextStore((state) => state.volume);
  const isMuted = useAudioContextStore((state) => state.isMuted);
  const setIsMuted = useAudioContextStore((state) => state.setIsMuted);
  const gainNode = useAudioContextStore((state) => state.gainNode);
  const setVolume = useAudioContextStore((state) => state.setVolume);

  const volumeControl = (vol: number) => {
    if (gainNode) {
      gainNode.gain.value = vol;
    }
    setVolume(vol);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    volumeControl(value);
    if (isMuted.muted) {
      setIsMuted(false, value);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      volumeControl(isMuted.volume!);
      setIsMuted(false, isMuted.volume!)
    } else {
      volumeControl(0);
      setIsMuted(true, volume)
    }
  };

  return (
    <div
      className="relative flex group"
    >
      <button
        className="py-1 px-3 rounded-full bg-black/25 cursor-pointer active:bg-gray-500/50"
        onClick={() => toggleMute()}
      >
        {volume === 0 || isMuted.muted ? (
          <VolumeOff className="size-6 sm:size-5" />
        ) : (
          <Volume className="size-6 sm:size-5" />
        )}
      </button>
      <div className="absolute bottom-14 -left-[14px] transition-opacity duration-200 -rotate-90 flex pl-2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
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
