import { MusicNotePlus } from "@/assets/icons/MusicNotePlus";
import { useInputRef } from "@/hooks/useInputRef";
import { useFilesStore } from "@/store/files-store";
import bgcover from "@/assets/caratula-vacia.webp";
import { usePlayTrackLocal } from "@/hooks/usePlayTrackLocal";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect } from "react";

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
  }, []);

  return (
    <>
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
        <div className="w-full h-full">
          <ul>
            {files.map((item) => (
              <li key={item.id}>
                <article
                  className={clsx(
                    "flex gap-2  w-full items-center cursor-pointer  p-2 rounded-lg ",
                    selectedTrackLocal?.id === item.id
                      ? "bg-gray-800"
                      : "hover:bg-neutral-700/50"
                  )}
                  onClick={() => {
                    playTrack(item, item.index);
                    setWindow("main");
                  }}
                >
                  <motion.div
                    key={`thumbnail-${item.id}`}
                    layoutId={`track-thumbnail-${item.id}`}
                    className="bg-gray-500 w-32 rounded-lg overflow-hidden"
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
                    <h1 className="font-bold truncate">
                      {item.metadata.title}
                    </h1>
                    <h2 className="text-sm truncate">{item.metadata.artist}</h2>
                  </motion.div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
