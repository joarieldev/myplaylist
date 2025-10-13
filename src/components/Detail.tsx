import { useEffect, useState } from "react";
import { Tracks } from "./Tracks";
import { getTracks } from "@/actions/get-tracks";
import { Layout } from "./Layout";
import { useWindowStore, Windows } from "@/store/window-store";
import { useDetailStore } from "@/store/detail-store";
import { usePlaylistStore } from "@/store/playlist-store copy";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { IList } from "@/interfaces/List";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { motion } from "motion/react";
import { Loading } from "./Loading";

export const Detail = () => {
  const playlist = usePlaylistStore((state) => state.playlist);
  const list = useDetailStore((state) => state.list);
  const back = useDetailStore((state) => state.back);

  const isplaylist = playlist.find((item) => item.list.id === list.id);

  if (isplaylist) {
    return (
      <Layout>
        <Nav back={isplaylist.path} list={list} />
        <div className="grow">
          <Tracks tracks={isplaylist.tracks} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Nav back={back} list={list} />
      <DetailNoStored />
    </Layout>
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
    <nav className="relative z-10 py-2 px-3 sm:px-1 sm:py-1 sm:pb-2">
      <motion.div
        key={`list-thumbnail-${list.id}`}
        layoutId={`bg-thumbnail-${list.id}`}
        style={bgStyle}
        className="absolute pointer-events-none z-0 rounded-xl"
      />
      <div className="relative space-y-3">
        <button
          onClick={() => setWindow(back as Windows)}
          className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
        >
          <CornerUpLeft className="size-5" />
          <span className="font-sans text-sm capitalize">
            {path[back as keyof typeof path]}
          </span>
        </button>
        <div className="flex flex-col gap-0.5">
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold">
            {list.playlist_name}
          </p>
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold text-xs">
            {list.user.name}
          </p>
          <p className="w-max py-0.5 px-2 rounded-full bg-black/75 font-semibold text-xs flex gap-1 items-center">
            <BrandNeteaseMusic className="size-3" />
            <span>{list.track_count} pistas</span>
          </p>
        </div>
      </div>
    </nav>
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
      {loadingTracks && <Loading />}
      {errorTracks && <p>{errorTracks}</p>}
    </div>
  );
};
