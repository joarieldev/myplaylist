"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./Main";
import { PlayList } from "./PlayList";
import { useWindowStore } from "@/store/window-store";

const queryClient = new QueryClient();

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {window === "main" && <Main onClick={() => setWindow("playlist")} />}
        {window === "playlist" && <PlayList onExit={() => setWindow("main")} />}
      </QueryClientProvider>
    </>
  );
};
