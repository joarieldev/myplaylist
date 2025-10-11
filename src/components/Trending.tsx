import { useState } from "react";
import { GridList } from "./GridList";
import { getTrending } from "@/actions/get-trending";
import { Reload } from "@/assets/icons/Reload";
import { useQuery } from "@tanstack/react-query";
import { IList } from "@/interfaces/List";
import { Layout } from "./Layout";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { TrendingUp } from "@/assets/icons/TrendingUp";

export const Trending = () => {
  const [change, setChange] = useState<number>(0);
  const setWindow = useWindowStore((state) => state.setWindow);

  const {
    isPending: loading,
    error,
    refetch,
    data: trending,
  } = useQuery<IList[]>({
    queryKey: ["queryTrending"],
    queryFn: getTrending,
    retry: false,
  });

  return (
    <Layout>
      <nav className="space-y-2 py-2 px-3 sm:px-0 sm:py-0 sm:pb-2">
        <button
          onClick={() => setWindow("library")}
          className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 flex gap-1 items-center hover:bg-neutral-500/25 active:bg-neutral-500/25 transition-colors"
        >
          <CornerUpLeft className="size-5" />
          <span className="font-sans text-sm">Biblioteca</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="p-1.5 rounded-full bg-indigo-700 text-black">
            <TrendingUp />
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-xl">Tendencias</span>
          </div>
        </div>
      </nav>
      {loading && (
        <div className="size-full grid place-items-center">
          <p className="text-center text-sm text-gray-300">Cargando...</p>
        </div>
      )}
      {error && (
        <div className="size-full grid place-items-center">
          <p className="flex justify-center items-center flex-col gap-1 text-sm text-gray-300">
            {error.message}
            <button
              onClick={() => refetch()}
              className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full "
            >
              <Reload />
            </button>
          </p>
        </div>
      )}
      {!loading && !error && (
        <div className="grow">
          <label className="sr-only">{change}</label>
          <GridList
            list={trending}
            nameWindow="trending"
            setChange={setChange}
          />
        </div>
      )}
    </Layout>
  );
};
