import { MusicNotePlus } from "@/assets/icons/MusicNotePlus";
import { useInputRef } from "@/hooks/useInputRef";
import { useContentStore } from "@/store/content-store";
import { navigateTo } from "@/utils/navigate";
import { useEffect } from "react";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Folder } from "@/assets/icons/Folder";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioStore } from "@/store/audio-store";
import { useAudioContextStore } from "@/store/audio-context-store";
import { Tracks } from "./Tracks";
import { ITrack } from "@/interfaces/Track";

export const Local = () => {
  const files = useContentStore((state) => state.files);
  const removeFile = useContentStore((state) => state.removeFile);
  const clearAllFiles = useContentStore((state) => state.clearFiles);

  const selectedTrack = useAudioStore((state) => state.selectedTrack);
  const setSelectedTrack = useAudioStore((state) => state.setSelectedTrack);
  const { playTrack } = usePlayTrack();
  const { fileInputRef, handleFileChange, onTargetClick } = useInputRef();
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);
  const audioTracks = useAudioStore((state) => state.tracks);
  const setTracks = useAudioStore((state) => state.setTracks);
  const stopCurrentAudio = useAudioContextStore((state) => state.stopCurrentAudio);

  const handleSelect = (item: ITrack) => {
    playTrack(item);
    setIsPlaying(true)
    navigateTo("main");
    setTracks(files);
  }

  const handleDelete = (track: ITrack) => {
    removeFile(track.id);
    URL.revokeObjectURL(track.orig_filename);

    if (track.tags !== "local") return;

    const deletedIndex = audioTracks.findIndex(t => t.id === track.id);
    if (deletedIndex === -1) return;

    const updatedTracks = audioTracks.toSpliced(deletedIndex, 1);
    setTracks(updatedTracks);

    if (selectedTrack?.id === track.id) {
      const nextTrack = updatedTracks[deletedIndex];

      if (nextTrack) {
        playTrack(nextTrack);
        setIsPlaying(true);
      } else {
        stopCurrentAudio();
        setSelectedTrack(null);
        setIsPlaying(false);
      }
    }
  }

  const handleClearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.orig_filename));
    clearAllFiles();

    if (selectedTrack?.tags === "local") {
      stopCurrentAudio();
      setTracks([]);
      setSelectedTrack(null);
      setIsPlaying(false);
    }
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
              navigateTo("library")
            }}
            className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5 max-sm:stroke-3" />
            <span className="font-sans text-sm">Biblioteca</span>
          </button>
          <div className="flex items-center gap-3 relative">
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
            {files.length > 0 && 
              <button
                onClick={handleClearAll}
                className="ml-2 px-2 py-0.5 text-[11px] rounded-full bg-black/75 active:bg-neutral-500/25 transition-colors absolute right-2 bottom-0 cursor-pointer"
              >
                Eliminar todo
              </button>
            }
          </div>
        </nav>
      </header>

      {files.length === 0 && (
        <div className="flex size-full flex-col items-center justify-center">
          <button onClick={onTargetClick} className="cursor-pointer">
            <MusicNotePlus className="text-gray-300" />
          </button>
          <p className="text-sm text-gray-300">
            Haga clic para cargar o arrastre y suelte
          </p>
          <p className="mt-2 text-xs text-gray-400 text-center mx-8 text-pretty">
            Máximo 20 canciones locales. Los archivos se almacenan en tu navegador y no se suben a internet.
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
          <Tracks tracks={files} handleSelect={handleSelect} onDelete={handleDelete} />
        </div>
      )}
    </>
  );
};
