import { useState } from "react";
import { GridList } from "./GridList";
import { Reload } from "@/assets/icons/Reload";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "./SearchForm";
import { getSearch } from "@/actions/get-search";
import { useSearchStore } from "@/store/search-store";
import { IList } from "@/interfaces/List";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Loading } from "./Loading";

export const Search = () => {
  const [change, setChange] = useState<number>(0);
  const searchText = useSearchStore((state) => state.searchText);
  const setWindow = useWindowStore((state) => state.setWindow);

  const {
    error: error,
    isFetching: fetching,
    refetch: refetchSearch,
    data: searches,
  } = useQuery<IList[]>({
    queryKey: ["querySearch"],
    queryFn: () => getSearch(searchText),
    retry: false,
    enabled: false,
  });

  return (
    <>
      <header className="sticky top-0 z-10 px-3 pt-3 sm:px-0 sm:pt-0 sm:pb-2">
        <nav className="space-y-4 sm:space-y-2">
          <button
            onClick={() => {
              setWindow("library")
              window.location.hash = "#library"
            }}
            className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5 max-sm:stroke-3" />
            <span className="max-sm:font-semibold font-sans text-sm">Biblioteca</span>
          </button>
          <SearchForm fetchSearch={refetchSearch} />
        </nav>
      </header>
      {fetching && (
        <div className="size-full grid place-items-center">
          <Loading />
        </div>
      )}
      {error && (
        <div className="size-full grid place-items-center">
          <p className="flex justify-center items-center flex-col gap-1 text-sm text-gray-300">
            {error.message}
            <button
              onClick={() => refetchSearch()}
              className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full transition-colors"
            >
              <Reload />
            </button>
          </p>
        </div>
      )}
      {!fetching && !error && (
        <>
          {!searches ? (
            <div className="size-full grid place-items-center">
              <p className="text-center text-sm text-gray-300">Lista vacía</p>
            </div>
          ) : (
            <div className="grow">
              <label className="sr-only">{change}</label>
              <GridList
                list={searches}
                nameWindow="search"
                setChange={setChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
