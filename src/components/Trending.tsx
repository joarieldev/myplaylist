import { useState } from "react";
import { GridList } from "./GridList";
import { getTrending } from "@/actions/get-trending";
import { X } from "@/assets/icons/X";
import { Reload } from "@/assets/icons/Reload";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "./SearchForm";
import { getSearch } from "@/actions/get-search";
import { useSearchStore } from "@/store/search-store";
import { IList } from "@/interfaces/List";

export const Trending = () => {
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);
  const [change, setChange] = useState<number>(0);

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

  const searchText = useSearchStore((state) => state.searchText);

  const {
    error: errorSearch,
    isFetching: isFetchingSearch,
    refetch: refetchSearch,
    data: searches,
  } = useQuery<IList[]>({
    queryKey: ["querySearch"],
    queryFn: () => getSearch(searchText),
    retry: false,
    enabled: false,
  });

  const handleTrending = () => {
    return (
      <>
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
          <div className="overflow-y-auto h-[calc(100%-40px)]">
            <label className="sr-only">{change}</label>
            <GridList
              list={trending}
              setLoadingTracks={setLoadingTracks}
              setErrorTracks={setErrorTracks}
              setChange={setChange}
            />
          </div>
        )}
      </>
    );
  };
  const handleSearch = () => {
    return (
      <>
        {isFetchingSearch && (
          <div className="size-full grid place-items-center">
            <p className="text-center text-sm text-gray-300">Cargando...</p>
          </div>
        )}
        {errorSearch && (
          <div className="size-full grid place-items-center">
            <p className="flex justify-center items-center flex-col gap-1 text-sm text-gray-300">
              {errorSearch.message}
              <button
                onClick={() => refetchSearch()}
                className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full "
              >
                <Reload />
              </button>
            </p>
          </div>
        )}
        {!isFetchingSearch && !errorSearch && (
          <>
            {!searches ? (
              <div className="size-full grid place-items-center">
                <p className="text-center text-sm text-gray-300">Lista vacía</p>
              </div>
            ) : (
              <div className="overflow-y-auto h-[calc(100%-40px)]">
                <label className="sr-only">{change}</label>
                <GridList
                  list={searches}
                  setLoadingTracks={setLoadingTracks}
                  setErrorTracks={setErrorTracks}
                  setChange={setChange}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className="relative size-full overflow-hidden">
      <SearchForm fetchSearch={refetchSearch} />
      {!searchText ? handleTrending() : handleSearch()}
      {loadingTracks && (
        <div className="absolute inset-0 bg-black/75 grid place-items-center z-[1]">
          <p className="text-center text-sm text-gray-300">Cargando...</p>
        </div>
      )}
      {errorTracks && (
        <div className="absolute inset-0 bg-black/75 grid place-items-center z-[1]">
          <p className="flex justify-center items-center flex-col gap-1 text-sm text-gray-300">
            {errorTracks}
            <button
              onClick={() => setErrorTracks(null)}
              className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full"
            >
              <X />
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
