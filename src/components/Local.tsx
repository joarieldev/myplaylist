import { MusicNotePlus } from "@/assets/icons/MusicNotePlus";
import { useInputRef } from "@/hooks/useInputRef";
import { useFilesStore } from "@/store/files-store";
import { useWindowStore } from "@/store/window-store";
import { useEffect } from "react";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Folder } from "@/assets/icons/Folder";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { Tracks } from "./Tracks";
import { ITrack } from "@/interfaces/Track";
import { useAudioContextStore } from "@/store/audio-context-store";

export const Local = () => {
  const files = useFilesStore((state) => state.files);

  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setWindow = useWindowStore((state) => state.setWindow);
  const { playTrack } = usePlayTrack();
  const { fileInputRef, handleFileChange, onTargetClick } = useInputRef();
  const setIsPaused = useAudioContextStore((state) => state.setIsPaused);

  const setTracks = useTracksPlayingStore((state) => state.setTracks);

  const handleSelect = (item: ITrack) => {
    playTrack(item);
    setIsPaused(false)
    setWindow("main");
    window.location.hash = ""
    setTracks(files);
  }

  useEffect(() => {
    if (!selectedTrack) return;
    const selectedId = `track-${selectedTrack.id}`;
    if (selectedId) {
      const el = document.getElementById(`track-${selectedTrack.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "center" });
      }
    }
  }, [selectedTrack]);

  return (
    <>
      <header className="px-3 pt-3 sm:px-0 sm:pt-0 pb-2">
        <nav className="space-y-4 sm:space-y-2">
          <button
            onClick={() => {
              setWindow("library")
              window.location.hash = "#library"
            }}
            className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5 max-sm:stroke-3" />
            <span className="font-sans text-sm">Biblioteca</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-full bg-blue-700 text-black">
              <Folder className="max-sm:size-8 max-sm:stroke-3" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-2xl sm:text-xl">Local</span>
              <span className="text-sm sm:text-xs flex gap-1 items-center">
                <BrandNeteaseMusic className="size-4 sm:size-3" />
                {files.length} pistas
              </span>
            </div>
          </div>
        </nav>
      </header>

      {files.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center">
          <button onClick={onTargetClick} className="cursor-pointer">
            <MusicNotePlus className="text-gray-400" />
          </button>
          <p className="text-sm text-gray-300">
            Haga clic para cargar o arrastre y suelte
          </p>
          <input
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
            name="file"
            multiple
            accept="audio/*"
          />
        </div>
      )}

      {files.length > 0 && (
        <div className="grow">
          <Tracks tracks={files} handleSelect={handleSelect} />
        </div>
      )}
    </>
  );
};
