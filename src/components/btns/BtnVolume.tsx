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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    const newVolume = Math.min(1, Math.max(0, volume + delta));
    volumeControl(newVolume);
    if (isMuted.muted && newVolume > 0) {
      setIsMuted(false, newVolume);
    }
  };

  return (
    <div
      className="relative flex group"
    >
      <button
        className="py-1 px-3 rounded-full cursor-pointer active:bg-gray-500/50"
        onClick={() => toggleMute()}
      >
        {volume === 0 || isMuted.muted ? (
          <VolumeOff className="size-6 sm:size-5" />
        ) : (
          <Volume className="size-6 sm:size-5" />
        )}
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-black/25 rounded-2xl transition-all ease-out h-full group-hover:h-28 pointer-events-none"/>
      <div
        className="absolute bottom-full flex rounded-2xl overflow-hidden transition-all ease-out h-0 group-hover:h-20 w-full cursor-pointer"
        onWheel={handleWheel}
      >
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="1"
          value={volume}
          step="0.01"
          onChange={handleChange}
          className="cursor-pointer w-full accent-gray-200 -rotate-90"
        />
      </div>
    </div>
  );
};
