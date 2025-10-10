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
        <p className="text-center text-sm text-gray-300">Cargando...</p>
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
      <div className="flex flex-col overflow-y-auto h-full">
        <Nav />
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
          <>
            {favorites && favorites.length === 0 ? (
              <div className="size-full grid place-items-center">
                <p className="text-center text-sm text-gray-300">
                  No tienes favoritos
                </p>
              </div>
            ) : (
              <>
                <label className="sr-only">{change}</label>
                <GridList
                  list={favorites ?? []}
                  nameWindow="favorites"
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

const Nav = () => {
  const setWindow = useWindowStore((state) => state.setWindow);

  return (
    <nav className="space-y-2 py-2 px-3 sm:px-0 sm:py-0 sm:pb-2">
      <button
        onClick={() => setWindow("library")}
        className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 flex gap-1 items-center hover:bg-neutral-500/25 transition-colors"
      >
        <CornerUpLeft className="size-5" />
        <span className="font-sans text-sm">Biblioteca</span>
      </button>
      <div className="flex items-center gap-3">
        <span className="p-1.5 rounded-full bg-violet-700 text-black">
          <Heart liked={true} />
        </span>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Favoritos</span>
        </div>
      </div>
    </nav>
  );
};
