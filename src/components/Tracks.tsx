import { motion } from "motion/react";
import { useEffect } from "react";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { ITrack } from "@/interfaces/Track";
import bgcover from "@/assets/caratula-vacia.webp";

interface Props {
  tracks: ITrack[];
  handleSelect: (track: ITrack) => void
}

export const Tracks = ({ tracks, handleSelect }: Props) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);

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
    <ul>
      {tracks.map((track) => (
        <li key={track.id}>
          <article
            className={clsx(
              "flex gap-4 sm:gap-2 w-full items-center cursor-default px-2 py-3 sm:py-2.5 rounded-3xl transition-colors",
              selectedTrack?.id === track.id
                ? "bg-gray-700/75"
                : "hover:bg-neutral-700/50"
            )}
            onClick={() => handleSelect(track)}
            id={`track-${track.id}`}
          >
            <motion.div
              key={`thumbnail-${track.id}`}
              layoutId={`track-thumbnail-${track.id}`}
              className="bg-gray-500/50 w-28 sm:w-24 h-12 sm:h-11 rounded-3xl sm:rounded-2xl overflow-hidden"
            >
              <img
                src={track.artwork["150x150"] ? track.artwork["150x150"] : bgcover.src}
                alt={track.title}
                className="aspect-video object-cover"
              />
            </motion.div>
            <motion.div
              key={`info-${track.id}`}
              className="flex flex-col overflow-hidden w-full"
              layout="position"
              layoutId={`track-info-${track.id}`}
            >
              <h1 className="text-lg sm:text-sm font-bold truncate max-sm:leading-5">{track.title}</h1>
              <p className="text-xs max-sm:font-bold truncate">{track.user.name}</p>
            </motion.div>
          </article>
        </li>
      ))}
    </ul>
  );
};
