"use client";
import { useEffect, useState } from "react";
import { GridList } from "./GridList";
import { ITrending } from "@/interfaces/Trending";
import clsx from "clsx";
import { getTrending } from "@/actions/get-trending";
import { X } from "@/assets/icons/X";

export const Trending = () => {
  const [trending, setTrending] = useState<ITrending[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getTrending()
      .then(({ ok, data, message }) => {
        if (!ok) {
          setError(message ?? null);
          return;
        }
        setTrending(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        <p className="text-center">{error}</p>
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
          <p className="text-center flex flex-col gap-1">
            {errorTracks}{" "}
            <button
              onClick={() => setErrorTracks(null)}
              className="cursor-pointer p-1 hover:bg-gray-500/40 rounded-full flex justify-center items-center"
            >
              <X />
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
