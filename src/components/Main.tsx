import { useWindowStore } from "@/store/window-store";
import { BtnPlayers } from "./btns/BtnPlayers";
import { Progress } from "./Progress";
import { Thumbnail } from "./Thumbnail";
import { ToggleVisualizer } from "./ToggleVisualizer";
import { BtnVolume } from "./btns/BtnVolume";
import { BtnVisualizer } from "./btns/BtnVisualizer";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ITrack } from "@/interfaces/Track";
import { BtnSesion } from "./btns/BtnSesion";
import { Category } from "@/assets/icons/Category";
import clsx from "clsx";

export const Main = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);

  const [selectedItem, setSelectedItem] = useState<ITrack | null>(
    selectedTrack
  );

  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (!selectedTrack) return;
    setSelectedItem(selectedTrack);
  }, [selectedTrack]);

  return (
    <>
      <nav className="flex gap-4 justify-between py-2 px-3 sm:px-0 sm:py-0">
        <span className="size-6 max-sm:hidden">
          <BtnSesion />
        </span>
        <ToggleVisualizer />
        <button
          onClick={() => {
            setWindow("library")
            window.location.hash = "#library"
          }}
          className="cursor-pointer text-gray-300 hover:text-white transition-colors max-sm:hidden"
          title="biblioteca"
        >
          <Category />
        </button>
      </nav>
      <section className="flex flex-col grow">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <Thumbnail key={selectedTrack?.id} selectedTrack={selectedItem} />
        </AnimatePresence>
        <div className="size-full flex flex-col justify-center items-center gap-4 sm:gap-2">
          <div 
            className={clsx(
              "flex w-full sm:w-80 h-full justify-evenly items-center",
              !selectedTrack && "pointer-events-none opacity-75"
            )}
          >
            <BtnVisualizer />
            <BtnPlayers setDirection={setDirection} />
            <BtnVolume />
          </div>
          <div className="size-full w-full sm:w-80 px-8 sm:px-0">
            <Progress />
          </div>
        </div>
      </section>
    </>
  );
};
