import { useUser, SignInButton, SignedOut } from "@clerk/clerk-react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { GridList } from "./GridList";
import { useState } from "react";
import { X } from "@/assets/icons/X";
import { Reload } from "@/assets/icons/Reload";
import { IList } from "@/interfaces/List";

interface Props {
  refetch: () => void;
}

export const Favorites = ({ refetch }: Props) => {
  const { isSignedIn, isLoaded } = useUser();
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);

  const [change, setChange] = useState<number>(0);

  const queryClient = useQueryClient();
  const favorites = queryClient.getQueryData<IList[]>(["queryFavorite"]);
  const isFetching = useIsFetching({ queryKey: ["queryFavorite"] }) > 0;

  const queryState = queryClient.getQueryState(["queryFavorite"]);
  const error = queryState?.error as Error | undefined;

  if (!isLoaded) {
    return (
      <div className="size-full grid place-items-center">
        <p className="text-center text-sm text-gray-300">Cargando...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="size-full grid place-items-center text-sm text-gray-300">
        <p className="text-center flex flex-row gap-1">
          Para ver tus favoritos debes
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hover:text-gray-200 cursor-pointer underline">
                Iniciar sesión.
              </button>
            </SignInButton>
          </SignedOut>
        </p>
      </div>
    );
  }

  return (
    <div className="relative size-full overflow-hidden">
      {isFetching && (
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
      {!isFetching && !error && (
        <div className="overflow-y-auto h-full">
          {favorites && favorites.length === 0 ? (
            <div className="size-full grid place-items-center">
              <p className="text-center text-sm text-gray-300">No tienes favoritos</p>
            </div>
          ) : (
            <>
              <label className="sr-only">{change}</label>
              <GridList
                list={favorites ?? []}
                setLoadingTracks={setLoadingTracks}
                setErrorTracks={setErrorTracks}
                setChange={setChange}
              />
            </>
          )}
        </div>
      )}
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
