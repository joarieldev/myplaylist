import { useUser, SignInButton, SignedOut } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { GridList } from "./GridList";
import { useState } from "react";
import { Reload } from "@/assets/icons/Reload";
import { Layout } from "./Layout";
import { getFavorite } from "@/actions/get-favorite";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { Heart } from "@/assets/icons/Heart";
import { Loading } from "./Loading";

export const Favorites = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  const [change, setChange] = useState<number>(0);

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
      <Layout>
        <div className="h-full grid place-items-center">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (!isSignedIn) {
    return (
      <Layout>
        <Nav />
        <div className="h-full grid place-items-center">
          <p className="text-center flex flex-row gap-1 text-gray-300 text-sm">
            Para ver tus favoritos debes
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hover:underline cursor-pointer font-bold text-gray-200">
                  Iniciar sesión.
                </button>
              </SignInButton>
            </SignedOut>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Nav />
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
        <>
          {favorites && favorites.length === 0 ? (
            <div className="size-full grid place-items-center">
              <p className="text-center text-sm text-gray-300">
                No tienes favoritos
              </p>
            </div>
          ) : (
            <div className="grow">
              <label className="sr-only">{change}</label>
              <GridList
                list={favorites ?? []}
                nameWindow="favorites"
                setChange={setChange}
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

const Nav = () => {
  const setWindow = useWindowStore((state) => state.setWindow);

  return (
    <header className="px-3 pt-3 sm:px-0 sm:pt-0 pb-2">
      <nav className="space-y-4 sm:space-y-2">
        <button
          onClick={() => {
            setWindow("library")
            window.location.hash = "#library"
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
