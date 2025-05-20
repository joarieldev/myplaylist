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
import { useIsMoving } from "@/hooks/useIsMoving";
import clsx from "clsx";

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const { isSignedIn, user, isLoaded } = useUser();
  const { getOpacity, handlers } = useIsMoving();

  const { refetch } = useQuery({
    queryKey: ["queryFavorite"],
    queryFn: () => getFavorite(user?.id ?? ""),
    enabled: isLoaded && isSignedIn && !!user?.id,
    retry: false,
  });

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 max-sm:left-0 my-1.5 mx-1 sm:right-0 sm:mx-4 sm:my-2",
          getOpacity(),
          window === "playlist" && "max-sm:hidden",
          visualizer !== "none" && "max-sm:hidden"
        )}
        {...handlers}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <button className="py-1 px-2 sm:py-2 sm:px-4 rounded-3xl sm:rounded-full bg-neutral-900/75 cursor-pointer active:bg-neutral-800/75 font-bold max-sm:text-sm">
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
      <Toaster position="bottom-center" />
      <Upload />
    </>
  );
};
