"use client";

import { useState } from "react";
import { Main } from "./Main";
import { PlayList } from "./PlayList";

export const Container = () => {
  const [selected, setSelected] = useState<string>("main");
  return (
    <>
      {selected === "main" && <Main onClick={() => setSelected("playlist")} />}
      {selected === "playlist" && (
        <PlayList onClick={() => setSelected("main")} />
      )}
    </>
  );
};
