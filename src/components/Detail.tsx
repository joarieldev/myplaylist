import { Tracks } from "./Tracks";
import { getTracks } from "@/actions/get-tracks";
import { useQuery } from "@tanstack/react-query";
import { navigateTo } from "@/utils/navigate";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { IList } from "@/interfaces/List";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { motion } from "motion/react";
import { ITrack } from "@/interfaces/Track";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useAudioStore } from "@/store/audio-store";
import { Loader2 } from "@/assets/icons/Loader2";
import { PlayerPlay } from "@/assets/icons/PlayerPlay";
import { Reload } from "@/assets/icons/Reload";
import { useUiStore, Windows } from "@/store/ui-store";

export const Detail = () => {
  const viewingPlaylist = useUiStore((state) => state.viewingPlaylist);
  const back = useUiStore((state) => state.back);

  const { data: tracks, isLoading, error, refetch } = useQuery({
    queryKey: ["tracks", viewingPlaylist.id],
    queryFn: () => getTracks(viewingPlaylist.id),
    enabled: !!viewingPlaylist.id,
    staleTime: 5 * 60 * 1000,
  });

  const { playTrack } = usePlayTrack();
  const setTracks = useAudioStore((state) => state.setTracks);
  const setPlaylist = useAudioStore((state) => state.setPlaylist);
  const setPlaybackOrigin = useAudioStore((state) => state.setPlaybackOrigin);
  const setIsPlaying = useAudioStore((state) => state.setIsPlaying);

  const handleSelect = (track: ITrack) => {
    if (!tracks) return;
    playTrack(track);
    setIsPlaying(true);
    setTracks(tracks);
    setPlaylist(viewingPlaylist);
    setPlaybackOrigin(back);
    navigateTo("main");
  };

  const handlePlay = () => {
    if (!tracks || tracks.length === 0) return;
    playTrack(tracks[0]);
    setIsPlaying(true);
    setTracks(tracks);
    setPlaylist(viewingPlaylist);
    setPlaybackOrigin(back);
  };

  return (
    <>
      <Nav back={back} list={viewingPlaylist} onPlay={handlePlay} />
      {isLoading && (
        <div className="size-full grid place-items-center">
          <Loader2 className="max-sm:size-7 max-sm:stroke-3 animate-spin" />
        </div>
      )}
      {error && (
        <div className="size-full grid place-items-center">
          <p className="flex justify-center items-center flex-col gap-1 text-sm text-gray-300">
            {error.message}
            <button
              onClick={() => refetch()}
              className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full"
            >
              <Reload />
            </button>
          </p>
        </div>
      )}
      {tracks && tracks.length === 0 && (
        <div className="size-full grid place-items-center">
          <p className="text-center text-sm text-gray-300">
            No se encontraron tracks
          </p>
        </div>
      )}
      {tracks && tracks.length > 0 && (
        <div className="grow">
          <Tracks tracks={tracks} handleSelect={handleSelect} />
        </div>
      )}
    </>
  );
};

const Nav = ({ back, list, onPlay }: { back: string; list: IList; onPlay: () => void }) => {
  const path = {
    search: "Buscar",
    trending: "Tendencias",
    favorites: "Favoritos",
  };
  const bgStyle = {
    backgroundImage: `url(${list.artwork["480x480"]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.75,
    inset: 0,
  };

  return (
    <header className="relative px-3 pt-3 sm:px-1 sm:pt-1 pb-2 mb-2">
      <motion.div
        key={`list-thumbnail-${list.id}`}
        layoutId={`bg-thumbnail-${list.id}`}
        style={bgStyle}
        className="absolute pointer-events-none z-0 rounded-xl"
      />
      <nav className="space-y-8 sm:space-y-3 relative">
        <button
          onClick={() => {
            navigateTo(back as Windows)
          }}
          className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
        >
          <CornerUpLeft className="size-5 max-sm:stroke-3" />
          <span className="max-sm:font-semibold font-sans text-sm capitalize">
            {path[back as keyof typeof path]}
          </span>
        </button>
        <div className="flex flex-col gap-0.5 relative">
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold text-lg sm:text-base">
            {list.playlist_name}
          </p>
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold text-sm sm:text-xs">
            {list.user.name}
          </p>
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold text-sm sm:text-xs flex gap-1 items-center">
            <BrandNeteaseMusic className="size-4 sm:size-3" />
            <span>{list.track_count} pistas</span>
          </p>
          <button
              onClick={onPlay}
              className="p-2 rounded-full cursor-pointer bg-black/75 active:bg-neutral-500/25 absolute right-2 bottom-0"
            >
              <PlayerPlay className="size-6 sm:size-5" />
            </button>
        </div>
      </nav>
    </header>
  );
};

