import { motion } from "motion/react";
import { useTracksStore } from "@/store/tracks-store";
import { useEffect } from "react";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { usePlayTrack } from "@/hooks/usePlayTrack";

export const Tracks = () => {
  const tracks = useTracksStore((state) => state.tracks);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setWindow = useWindowStore((state) => state.setWindow);
  const { playTrack } = usePlayTrack();

  useEffect(() => {
    if (!selectedTrack) return;
    const selectedId = `track-${selectedTrack.id}`;
    if (selectedId) {
      const el = document.getElementById(`track-${selectedTrack.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "center" });
      }
    }
  }, []);

  if (tracks.length === 0) {
    return <p>No hay música disponible</p>;
  }

  return (
    <ul className="flex flex-col">
      {tracks.map((track, index) => (
        <li key={track.id}>
          <article
            className={clsx(
              "flex gap-2  w-full items-center cursor-pointer  p-2 rounded-lg",
              selectedTrack?.id === track.id
                ? "bg-gray-800"
                : "hover:bg-gray-800/50"
            )}
            onClick={() => {
              playTrack(track, index);
              setWindow("main");
            }}
            id={`track-${track.id}`}
          >
            <motion.div
              key={`thumbnail-${track.id}`}
              layoutId={`track-thumbnail-${track.id}`}
              className="bg-gray-500 w-32 rounded-lg overflow-hidden"
            >
              <img
                src={track.artwork["150x150"]}
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
              <h1 className="font-bold truncate">{track.title}</h1>
              <p className="text-sm truncate">{track.user.name}</p>
            </motion.div>
          </article>
        </li>
      ))}
    </ul>
  );
};
