import { ChevronDown } from "@/assets/icons/ChevronDown";
import { GraphicEq } from "@/assets/icons/GraphicEq";
import { useEffect, useRef, useState } from "react";
import { X } from "@/assets/icons/X";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import clsx from "clsx";

export const ToggleVisualizer = () => {
  const [showList, setShowList] = useState(false);
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const handleMode = useBgVisualizerStore((state) => state.handleMode);
  const mode = useBgVisualizerStore((state) => state.mode);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visualizer === "none") return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    if (showList) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showList, visualizer]);

  return (
    <div
      className={clsx("relative w-full", visualizer === "none" && "hidden")}
      ref={containerRef}
    >
      <button
        className="absolute bg-neutral-900/75 rounded-full flex justify-between items-center transition active:bg-neutral-800/75 py-1 px-2 w-full"
        onClick={() => setShowList(!showList)}
      >
        <div className="flex gap-2 items-center">
          <GraphicEq className="size-5" />
          <span className="text-sm">{mode}</span>
        </div>
        {showList ? (
          <X className="size-5" />
        ) : (
          <ChevronDown className="size-5" />
        )}
      </button>
      <div
        className={clsx(
          "top-8 z-10 bg-neutral-900/75 rounded-2xl py-1 w-full text-sm",
          showList ? "absolute" : "hidden"
        )}
      >
        <ul className="cursor-default">
          <li
            onClick={() => handleMode("line-wave")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            line-wave
          </li>
          <li
            onClick={() => handleMode("line-wave-chill")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            line-wave-chill
          </li>
          <li
            onClick={() => handleMode("spectrum-center")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            spectrum-center
          </li>
          <li
            onClick={() => handleMode("spectrum-plain")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            spectrum-plain
          </li>
          <li
            onClick={() => handleMode("spectrum-wide")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            spectrum-wide
          </li>
          <li
            onClick={() => handleMode("circle-spectrum")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            circle-spectrum
          </li>
          <li
            onClick={() => handleMode("circle-spectrum-spring")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            circle-spectrum-spring
          </li>
          <li
            onClick={() => handleMode("vantajs-birds")}
            className="active:bg-neutral-700/30 rounded-full py-1 px-5"
          >
            vantajs-birds
          </li>
        </ul>
      </div>
    </div>
  );
};
