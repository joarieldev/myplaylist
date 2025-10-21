import { MusicNotePlus } from "@/assets/icons/MusicNotePlus";
import { useInputRef } from "@/hooks/useInputRef";
import { useFilesStore } from "@/store/files-store";
import bgcover from "@/assets/caratula-vacia.webp";
import { usePlayTrackLocal } from "@/hooks/usePlayTrackLocal";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect } from "react";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Folder } from "@/assets/icons/Folder";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";

export const Local = () => {
  const files = useFilesStore((state) => state.files);
  const { fileInputRef, handleFileChange, onTargetClick } = useInputRef();
  const { playTrack } = usePlayTrackLocal();
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );
  const setWindow = useWindowStore((state) => state.setWindow);

  useEffect(() => {
    if (!selectedTrackLocal) return;
    const selectedId = `track-${selectedTrackLocal.id}`;
    if (selectedId) {
      const el = document.getElementById(`track-${selectedTrackLocal.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "center" });
      }
    }
  }, [selectedTrackLocal]);

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
        <ul className="grow">
          {files.map((item) => (
            <li key={item.id}>
              <article
                className={clsx(
                  "flex gap-4 sm:gap-2 w-full items-center cursor-default px-2 py-3 sm:py-2.5 rounded-3xl transition-colors",
                  selectedTrackLocal?.id === item.id
                    ? "bg-gray-700/75"
                    : "hover:bg-neutral-700/75"
                )}
                onClick={() => {
                  playTrack(item, item.index);
                  setWindow("main");
                  window.location.hash = ""
                }}
                id={`track-${item.id}`}
              >
                <motion.div
                  key={`thumbnail-${item.id}`}
                  layoutId={`track-thumbnail-${item.id}`}
                  className="bg-gray-500/50 w-28 sm:w-24 h-12 sm:h-11 rounded-3xl sm:rounded-2xl overflow-hidden"
                >
                  <img
                    src={
                      item.metadata.cover ? item.metadata.cover : bgcover.src
                    }
                    alt="cover"
                    className="aspect-video object-cover"
                  />
                </motion.div>
                <motion.div
                  key={`info-${item.id}`}
                  className="flex flex-col overflow-hidden w-full"
                  layout="position"
                  layoutId={`track-info-${item.id}`}
                >
                  <h1 className="ext-lg sm:text-sm font-bold truncate max-sm:leading-5">{item.metadata.title}</h1>
                  <h2 className="text-xs max-sm:font-bold truncate">{item.metadata.artist}</h2>
                </motion.div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
