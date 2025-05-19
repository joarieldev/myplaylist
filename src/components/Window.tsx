"use client";

import { Main } from "./Main";
import { PlayList } from "./PlayList";
import { useWindowStore } from "@/store/window-store";
import { Toaster } from "sonner";
import { Upload } from "./Upload";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { BgVisualizer } from "./BgVisualizer";
import { BgCover } from "./BgCover";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getFavorite } from "@/actions/get-favorite";

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const { isSignedIn, user, isLoaded } = useUser();

  const { refetch } = useQuery({
    queryKey: ["queryFavorite"],
    queryFn: () => getFavorite(user?.id ?? ""),
    enabled: isLoaded && isSignedIn && !!user?.id,
    retry: false,
  });

  return (
    <>
      <div className="fixed top-0 right-0 mx-4 my-2 ">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="py-2 px-4 rounded-full bg-neutral-900/75 cursor-pointer active:bg-neutral-800/75 font-bold">
              Iniciar sesión
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      {visualizer === "none" ? <BgCover /> : <BgVisualizer />}
      {window === "main" && <Main />}
      {window === "playlist" && (
        <PlayList onExit={() => setWindow("main")} refetch={refetch} />
      )}
      <Toaster position="top-right" />
      <Upload />
    </>
  );
};
