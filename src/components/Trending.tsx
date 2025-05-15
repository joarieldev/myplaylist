import { useState } from "react";
import { GridList } from "./GridList";
import clsx from "clsx";
import { getTrending } from "@/actions/get-trending";
import { X } from "@/assets/icons/X";
import { Reload } from "@/assets/icons/Reload";
import { useQuery } from "@tanstack/react-query";

export const Trending = () => {
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);
  const {
    isPending: loading,
    error,
    refetch,
    data: trending,
  } = useQuery({
    queryKey: ["queryTrending"],
    queryFn: getTrending,
    retry: false,
  });

  if (loading) {
    return (
      <div className="size-full grid place-items-center">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="size-full grid place-items-center">
        <p className="flex justify-center items-center flex-col gap-1">
          {error.message}
          <button
            onClick={() => refetch()}
            className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full "
          >
            <Reload />
          </button>
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "overflow-x-hidden h-full w-full relative",
        loadingTracks || errorTracks ? "overflow-hidden" : "overflow-y-auto"
      )}
    >
      <GridList
        trendign={trending}
        setLoadingTracks={setLoadingTracks}
        setErrorTracks={setErrorTracks}
      />
      {loadingTracks && (
        <div className="absolute inset-0 bg-black/75 grid place-items-center">
          <p className="text-center">Loading...</p>
        </div>
      )}
      {errorTracks && (
        <div className="absolute inset-0 bg-black/75 grid place-items-center">
          <p className="flex justify-center items-center flex-col gap-1">
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
