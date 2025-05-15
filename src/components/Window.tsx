"use client";

import { Main } from "./Main";
import { PlayList } from "./PlayList";
import { useWindowStore } from "@/store/window-store";

export const Window = () => {
  const window = useWindowStore((state) => state.window);
  const setWindow = useWindowStore((state) => state.setWindow);

  return (
    <>
      {window === "main" && <Main onClick={() => setWindow("playlist")} />}
      {window === "playlist" && <PlayList onExit={() => setWindow("main")} />}
    </>
  );
};
