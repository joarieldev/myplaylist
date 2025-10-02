"use client";

import { Main } from "./Main";
import { PlayList } from "./PlayList";
import { useWindowStore } from "@/store/window-store";
import { Toaster } from "sonner";
import { Upload } from "./Upload";
import { useVisualizerStore } from "@/store/visualizer-store";
import { BgVisualizer } from "./BgVisualizer";
import { BgCover } from "./BgCover";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getFavorite } from "@/actions/get-favorite";
import { ModalInfo } from "./ModalInfo";
import { useModalInfoStore } from "@/store/modal-info-store";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const { isSignedIn, user, isLoaded } = useUser();

  const showInfo = useModalInfoStore((state) => state.showInfo);
  const checkFirstVisit = useModalInfoStore((state) => state.checkFirstVisit);

  const { refetch } = useQuery({
    queryKey: ["queryFavorite"],
    queryFn: () => getFavorite(user?.id ?? ""),
    enabled: isLoaded && isSignedIn && !!user?.id,
    retry: false,
  });

  useEffect(() => {
    checkFirstVisit();
  }, [checkFirstVisit]);

  return (
    <>
      {visualizer === "none" ? <BgCover /> : <BgVisualizer />}
      {window === "main" && <Main />}
      {window === "playlist" && (
        <PlayList onExit={() => setWindow("main")} refetch={refetch} />
      )}
      <Toaster position="bottom-center" />
      <Upload />
      <AnimatePresence>{showInfo && <ModalInfo />}</AnimatePresence>
    </>
  );
};
