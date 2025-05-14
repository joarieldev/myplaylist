/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Main } from "./Main";
import { PlayList } from "./PlayList";

export const Container = () => {
  const [selected, setSelected] = useState<string>("main");
  const [fullTrack, setFullTrack] = useState<any>(null);

  const handleTrack = (track: any) => {
    setFullTrack(track);
    setSelected("main");
  }
  return (
    <>
      {selected === "main" && <Main onClick={() => setSelected("playlist")} track={fullTrack} />}
      {selected === "playlist" && (
        <PlayList
          onExit={() => setSelected("main")}
          handleTrack={handleTrack}
        />
      )}
    </>
  );
};
