import { MusicNotePlus } from "@/assets/icons/MusicNotePlus";
import { useInputRef } from "@/hooks/useInputRef";
import { useFilesStore } from "@/store/files-store";
import bgcover from "@/assets/caratula-vacia.webp";
import { usePlayTrackLocal } from "@/hooks/usePlayTrackLocal";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Layout } from "./Layout";
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
    <Layout>
      <div className="flex flex-col overflow-y-auto w-full h-full">
        <nav className="space-y-2 py-2 px-3 sm:px-0 sm:py-0 sm:pb-2">
          <button
            onClick={() => setWindow("library")}
            className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 flex gap-1 items-center hover:bg-neutral-500/25 transition-colors"
          >
            <CornerUpLeft className="size-5" />
            <span className="font-sans text-sm">Biblioteca</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-full bg-blue-700 text-black">
              <Folder />
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-xl">Local</span>
              <span className="text-xs flex gap-1 items-center">
                <BrandNeteaseMusic className="size-3" />
                {files.length} pistas
              </span>
            </div>
          </div>
        </nav>
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
          <ul>
            {files.map((item) => (
              <li key={item.id}>
                <article
                  className={clsx(
                    "flex gap-2  w-full items-center cursor-pointer  p-2 rounded-lg ",
                    selectedTrackLocal?.id === item.id
                      ? "bg-gray-700/75"
                      : "hover:bg-neutral-700/75"
                  )}
                  onClick={() => {
                    playTrack(item, item.index);
                    setWindow("main");
                  }}
                  id={`track-${item.id}`}
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
        )}
      </div>
    </Layout>
  );
};
