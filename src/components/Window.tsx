"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./Main";
import { PlayList } from "./PlayList";
import { useWindowStore } from "@/store/window-store";
import { Toaster } from "sonner";
import { Upload } from "./Upload";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { BgVisualizer } from "./BgVisualizer";
import { BgCover } from "./BgCover";

const queryClient = new QueryClient();

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);

  return (
    <>
      {visualizer === "none" ? <BgCover /> : <BgVisualizer />}
      <QueryClientProvider client={queryClient}>
        {window === "main" && <Main />}
        {window === "playlist" && <PlayList onExit={() => setWindow("main")} />}
      </QueryClientProvider>
      <Toaster position="top-right" />
      <Upload />
    </>
  );
};
