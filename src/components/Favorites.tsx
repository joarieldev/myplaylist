import { Show, SignInButton, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { GridList } from "./GridList";
import { Reload } from "@/assets/icons/Reload";
import { getFavorite } from "@/actions/get-favorite";
import { navigateTo } from "@/utils/navigate";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Heart } from "@/assets/icons/Heart";
import { Loader2 } from "@/assets/icons/Loader2";

export const Favorites = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const {
    isPending: loading,
    error,
    refetch,
    data: favorites,
  } = useQuery({
    queryKey: ["queryFavorite"],
    queryFn: () => getFavorite(user?.id ?? ""),
    enabled: isLoaded && isSignedIn && !!user?.id,
    retry: false,
  });

  if (!isLoaded) {
    return (
      <>
        <div className="h-full grid place-items-center">
          <Loader2 className="max-sm:size-7 max-sm:stroke-3 animate-spin" />
        </div>
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <Nav />
        <div className="h-full grid place-items-center">
          <p className="text-center flex flex-row gap-1 text-gray-300 text-sm">
            Para ver tus favoritos debes
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="hover:underline cursor-pointer font-bold text-gray-200">
                  Iniciar sesión.
                </button>
              </SignInButton>
            </Show>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      {loading && (
        <div className="size-full grid place-items-center">
          <Loader2 className="max-sm:size-7 max-sm:stroke-3 animate-spin" />
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
        <>
          {favorites && favorites.length === 0 ? (
            <div className="size-full grid place-items-center">
              <p className="text-center text-sm text-gray-300">
                No tienes favoritos
              </p>
            </div>
          ) : (
            <div className="grow">
              <GridList
                list={favorites ?? []}
                nameWindow="favorites"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

const Nav = () => {
  return (
    <header className="px-3 pt-3 sm:px-0 sm:pt-0 pb-2">
      <nav className="space-y-4 sm:space-y-2">
        <button
          onClick={() => {
            navigateTo("library")
          }}
          className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 flex gap-1 items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
        >
          <CornerUpLeft className="size-5 max-sm:stroke-3" />
          <span className="max-sm:font-semibold font-sans text-sm">
            Biblioteca
          </span>
        </button>
        <div className="flex items-center gap-3">
          <span className="p-1.5 rounded-full bg-violet-700 text-black">
            <Heart className="max-sm:size-8 max-sm:stroke-3" liked={true} />
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-2xl sm:text-xl">Favoritos</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
