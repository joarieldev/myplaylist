/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft } from "@/assets/icons/ChevronLeft";
import { Layout } from "./Layout";
import { LIst } from "@/assets/icons/LIst";
import { Folder } from "@/assets/icons/Folder";
import { TrendingUp } from "@/assets/icons/TrendingUp";
import { Heart } from "@/assets/icons/Heart";
import { useState } from "react";
import { clsx } from "clsx";
import { List } from "./List";
import { Local } from "./Local";
import { Favorites } from "./Favorites";
import { Trending } from "./Trending";

interface Props {
  onExit: () => void;
  handleTrack: (data:any) => void;
}

type Tabs = "list" | "local" | "trending" | "favorites";

export const PlayList = ({ onExit, handleTrack }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("list");

  return (
    <Layout
      heading={
        <nav className="flex justify-between pb-2 pr-1 font-bold">
          <button
            onClick={onExit}
            className="cursor-pointer active:text-gray-300 flex text-sm justify-center items-center"
          >
            <ChevronLeft /> Volver
          </button>
          <ul className="flex gap-3 text-sm text-gray-400">
            <li>
              <button className={clsx("cursor-pointer flex items-center gap-1", selectedTab === "list" && "text-white")} onClick={() => setSelectedTab("list")}>
                <LIst />Lista
              </button>
            </li>
            <li> 
              <button className={clsx("cursor-pointer flex items-center gap-1", selectedTab === "local" && "text-white")} onClick={() => setSelectedTab("local")}>
                <Folder />Local
              </button>
            </li>
            <li>
              <button className={clsx("cursor-pointer flex items-center gap-1", selectedTab === "trending" && "text-white")} onClick={() => setSelectedTab("trending")}>
                <TrendingUp />Trending
              </button>
            </li>
            <li>
              <button className={clsx("cursor-pointer flex items-center gap-1", selectedTab === "favorites" && "text-white")} onClick={() => setSelectedTab("favorites")}>
                <Heart liked={true} />Favoritos
              </button>
            </li>
          </ul>
        </nav>
      }
    >
      <section className="overflow-y-auto overflow-x-hidden h-full">
        {selectedTab === "list" && <List handleTrack={handleTrack} />}
        {selectedTab === "local" && <Local />}
        {selectedTab === "trending" && <Trending />}
        {selectedTab === "favorites" && <Favorites />}
      </section>
    </Layout>
  );
};
