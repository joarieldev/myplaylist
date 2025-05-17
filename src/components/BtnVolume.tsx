import { Volume } from "@/assets/icons/Volume";
import { VolumeOff } from "@/assets/icons/VolumeOff";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { useState } from "react";

export const BtnVolume = () => {
  // const [volume, setVolume] = useState(100);
  const volume =  useAudioContextStore((state) => state.volume);
  const setVolume = useAudioContextStore((state) => state.setVolume);
  const isMuted = useAudioContextStore((state) => state.isMuted);
  const setIsMuted = useAudioContextStore((state) => state.setIsMuted);
  const [volumeShow, setVolumeShow] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  const audioElement = useAudioContextStore((state) => state.audioElement);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);

    if (audioElement) {
      audioElement.volume = value / 100;
      if (isMuted) {
        audioElement.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioElement) {
      const newMuted = !audioElement.muted;
      audioElement.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <div
      className={clsx(
        "relative",
        !selectedTrackLocal &&
          !selectedTrack &&
          "pointer-events-none opacity-50"
      )}
    >
      <button
        className="py-1 px-3 rounded-full bg-black/50 cursor-pointer active:bg-gray-500/50"
        onMouseEnter={() => setVolumeShow(true)}
        onMouseLeave={() => setVolumeShow(false)}
        onClick={() => toggleMute()}
      >
        {volume === 0 || isMuted ? (
          <VolumeOff className="size-5" />
        ) : (
          <Volume className="size-5" />
        )}
      </button>
      <div
        className={clsx(
          "absolute bottom-14 -left-[14px] transition-opacity duration-200 -rotate-90 flex pl-2",
          volumeShow ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onMouseEnter={() => setVolumeShow(true)}
        onMouseLeave={() => setVolumeShow(false)}
      >
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleChange}
          className="cursor-pointer bg-gray-200 w-16 accent-gray-400"
        />
      </div>
    </div>
  );
};
