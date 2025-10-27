import { useEffect, useState } from "react";
import { Tracks } from "./Tracks";
import { getTracks } from "@/actions/get-tracks";
import { useWindowStore, Windows } from "@/store/window-store";
import { useDetailStore } from "@/store/detail-store";
import { usePlaylistStore } from "@/store/playlist-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { IList } from "@/interfaces/List";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { motion } from "motion/react";
import { ITrack } from "@/interfaces/Track";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useTracksPlayingStore } from "@/store/tracks-playing-store";
import { Loader2 } from "@/assets/icons/Loader2";

export const Detail = () => {
  const playlist = usePlaylistStore((state) => state.playlist);
  const list = useDetailStore((state) => state.list);
  const back = useDetailStore((state) => state.back);

  const setWindow = useWindowStore((state) => state.setWindow);
  const { playTrack } = usePlayTrack();
  const setTracks = useTracksPlayingStore((state) => state.setTracks);
  const setPlaylist = useTracksPlayingStore((state) => state.setPlaylist);

  const isplaylist = playlist.find((item) => item.list.id === list.id);

  if (isplaylist) {
    window.location.hash = `#${isplaylist.path}`

    const handleSelect = (track: ITrack) => {
      playTrack(track);
      setWindow("main");
      window.location.hash = ""
      setTracks(isplaylist.tracks);
      setPlaylist(list);
    }

    return (
      <>
        <Nav back={isplaylist.path} list={list} />
        {isplaylist.tracks.length === 0 ? (
          <div className="size-full grid place-items-center">
            <p className="text-center text-sm text-gray-300">
              No se encontraron tracks
            </p>
          </div>
        ):(
          <div className="grow">
            <Tracks tracks={isplaylist.tracks} handleSelect={handleSelect} />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Nav back={back} list={list} />
      <DetailNoStored />
    </>
  );
};

const Nav = ({ back, list }: { back: string; list: IList }) => {
  const setWindow = useWindowStore((state) => state.setWindow);
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
            setWindow(back as Windows)
            window.location.hash = `#${back}`
          }}
          className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
        >
          <CornerUpLeft className="size-5 max-sm:stroke-3" />
          <span className="max-sm:font-semibold font-sans text-sm capitalize">
            {path[back as keyof typeof path]}
          </span>
        </button>
        <div className="flex flex-col gap-0.5">
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
        </div>
      </nav>
    </header>
  );
};

const DetailNoStored = () => {
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);
  const list = useDetailStore((state) => state.list);
  const back = useDetailStore((state) => state.back);
  const setPlaylist = usePlaylistStore((state) => state.setPlaylist);

  useEffect(() => {
    setLoadingTracks(true);
    getTracks(list.id)
      .then(({ ok, data, message }) => {
        if (!ok) {
          setErrorTracks(message ?? null);
          return;
        }
        setPlaylist({ list: list, path: back, tracks: data });
      })
      .finally(() => {
        setLoadingTracks(false);
      });
  }, [list, setPlaylist, back]);

  return (
    <div className="h-full grid place-items-center text-sm text-gray-300">
      {loadingTracks && <Loader2 className="max-sm:size-7 max-sm:stroke-3 animate-spin" />}
      {errorTracks && <p>{errorTracks}</p>}
    </div>
  );
};
