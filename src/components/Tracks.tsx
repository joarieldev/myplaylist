import { motion } from "motion/react";
import { useEffect } from "react";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { ITrack } from "@/interfaces/Track";
import { useTracksStore } from "@/store/tracks-store";
import { useDetailStore } from "@/store/detail-store";

interface Props {
  tracks: ITrack[];
}

export const Tracks = ({ tracks }: Props) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setWindow = useWindowStore((state) => state.setWindow);
  const { playTrack } = usePlayTrack();
  const list = useDetailStore((state) => state.list);

  const setTracks = useTracksStore((state) => state.setTracks);
  const setPlaylist = useTracksStore((state) => state.setPlaylist);

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

  if (tracks.length === 0) {
    return (
      <div className="size-full grid place-items-center">
        <p className="text-center text-sm text-gray-300">
          No se encontraron tracks
        </p>
      </div>
    );
  }

  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={track.id}>
          <article
            className={clsx(
              "flex gap-4 sm:gap-2 w-full items-center cursor-default px-2 py-3 sm:py-2.5 rounded-3xl transition-colors",
              selectedTrack?.id === track.id
                ? "bg-gray-700/75"
                : "hover:bg-neutral-700/50"
            )}
            onClick={() => {
              playTrack(track, index);
              setTracks(tracks);
              setPlaylist(list);
              setWindow("main");
              window.location.hash = ""
            }}
            id={`track-${track.id}`}
          >
            <motion.div
              key={`thumbnail-${track.id}`}
              layoutId={`track-thumbnail-${track.id}`}
              className="bg-gray-500/50 w-28 sm:w-24 h-12 sm:h-11 rounded-3xl sm:rounded-2xl overflow-hidden"
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
              <h1 className="text-lg sm:text-sm font-bold truncate max-sm:leading-5">{track.title}</h1>
              <p className="text-xs max-sm:font-bold truncate">{track.user.name}</p>
            </motion.div>
          </article>
        </li>
      ))}
    </ul>
  );
};
