import { useState } from "react";
import { GridList } from "./GridList";
import { Reload } from "@/assets/icons/Reload";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "./SearchForm";
import { getSearch } from "@/actions/get-search";
import { useSearchStore } from "@/store/search-store";
import { IList } from "@/interfaces/List";
import { Layout } from "./Layout";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";

export const Search = () => {
  const [change, setChange] = useState<number>(0);
  const searchText = useSearchStore((state) => state.searchText);
  const setWindow = useWindowStore((state) => state.setWindow);

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

  return (
    <Layout>
      <div className="flex flex-col overflow-y-auto h-full">
        <nav className="space-y-2 sticky top-0 z-10 py-2 px-3 sm:px-0 sm:py-0 sm:pb-2">
          <button
            onClick={() => setWindow("library")}
            className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5" />
            <span className="font-sans text-sm">Biblioteca</span>
          </button>
          <SearchForm fetchSearch={refetchSearch} />
        </nav>
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
              <>
                <label className="sr-only">{change}</label>
                <GridList
                  list={searches}
                  nameWindow="search"
                  setChange={setChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
