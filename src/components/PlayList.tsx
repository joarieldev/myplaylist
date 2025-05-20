import { Layout } from "./Layout";
import { LIst } from "@/assets/icons/LIst";
import { Folder } from "@/assets/icons/Folder";
import { TrendingUp } from "@/assets/icons/TrendingUp";
import { Heart } from "@/assets/icons/Heart";
import { clsx } from "clsx";
import { Tracks } from "./Tracks";
import { Local } from "./Local";
import { Favorites } from "./Favorites";
import { Trending } from "./Trending";
import { useTabStore } from "@/store/tab-store";
import { motion, AnimatePresence } from "motion/react";
import { ArrowBackUp } from "@/assets/icons/ArrowBackUp";

interface Props {
  onExit: () => void;
  refetch: () => void;
}

export const PlayList = ({ onExit, refetch }: Props) => {
  const tab = useTabStore((state) => state.tab);
  const setTab = useTabStore((state) => state.setTab);

  return (
    <Layout
      heading={
        <nav className="flex justify-between pb-2 pr-1 font-bold">
          <button
            onClick={onExit}
            className="cursor-pointer active:text-gray-300 flex text-sm justify-center items-center"
            title="atrás"
          >
            <ArrowBackUp />
          </button>
          <h1 className="block sm:hidden uppercase">
            {tab === "tracks" && "Candiones"}
            {tab === "local" && "Local"}
            {tab === "top" && "Top"}
            {tab === "favorites" && "Favoritos"}
          </h1>
          <ul className="flex gap-3 text-sm text-gray-400">
            <li>
              <button
                className={clsx(
                  "cursor-pointer flex items-center gap-1",
                  tab === "tracks" && "text-white"
                )}
                onClick={() => setTab("tracks")}
              >
                <LIst />
                <p className="hidden sm:block">Candiones</p>
              </button>
            </li>
            <li>
              <button
                className={clsx(
                  "cursor-pointer flex items-center gap-1",
                  tab === "local" && "text-white"
                )}
                onClick={() => setTab("local")}
              >
                <Folder />
                <p className="hidden sm:block">Local</p>
              </button>
            </li>
            <li>
              <button
                className={clsx(
                  "cursor-pointer flex items-center gap-1",
                  tab === "top" && "text-white"
                )}
                onClick={() => setTab("top")}
              >
                <TrendingUp />
                <p className="hidden sm:block">Top</p>
              </button>
            </li>
            <li>
              <button
                className={clsx(
                  "cursor-pointer flex items-center gap-1",
                  tab === "favorites" && "text-white"
                )}
                onClick={() => setTab("favorites")}
              >
                <Heart liked={true} />
                <p className="hidden sm:block">Favoritos</p>
              </button>
            </li>
          </ul>
        </nav>
      }
    >
      <AnimatePresence mode="wait">
        <motion.section
          key={tab ? tab : "empty"}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="size-full overflow-y-auto"
        >
          {tab === "tracks" && <Tracks />}
          {tab === "local" && <Local />}
          {tab === "top" && <Trending />}
          {tab === "favorites" && <Favorites refetch={refetch} />}
        </motion.section>
      </AnimatePresence>
    </Layout>
  );
};
