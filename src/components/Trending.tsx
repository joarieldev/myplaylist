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
import { Loading } from "./Loading";

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
      <header className="px-3 pt-3 sm:px-0 sm:pt-0 pb-2">
        <nav className="space-y-4 sm:space-y-2">
          <button
            onClick={() => setWindow("library")}
            className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5 max-sm:stroke-3" />
            <span className="max-sm:font-semibold font-sans text-sm">
              Biblioteca
            </span>
          </button>
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-full bg-indigo-700 text-black">
              <TrendingUp className="max-sm:size-8 max-sm:stroke-3" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-2xl sm:text-xl">Tendencias</span>
            </div>
          </div>
        </nav>
      </header>
      {loading && (
        <div className="size-full grid place-items-center">
          <Loading />
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
