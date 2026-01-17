import { ChevronDown } from "@/assets/icons/ChevronDown";
import { GraphicEq } from "@/assets/icons/GraphicEq";
import { useEffect, useRef, useState } from "react";
import { X } from "@/assets/icons/X";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import clsx from "clsx";
import { VisualizerMode } from "@/store/bg-visualizer-store";

const VISUALIZER_MODES: VisualizerMode[] = [
  "line-wave",
  "line-wave-chill",
  "spectrum-center",
  "spectrum-plain",
  "spectrum-wide",
  "circle-spectrum",
  "circle-spectrum-spring",
  "vantajs-birds",
  "vantajs-cells",
  "snowflake",
];

export const ToggleVisualizer = () => {
  const [showList, setShowList] = useState(false);
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const handleMode = useBgVisualizerStore((state) => state.handleMode);
  const mode = useBgVisualizerStore((state) => state.mode);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visualizer === "none" || !showList) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showList, visualizer]);

  if (visualizer === "none") return null;

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        className="absolute bg-neutral-900/90 rounded-full flex justify-between items-center transition-color active:bg-neutral-800/75 py-2 px-2.5 sm:py-1 sm:px-2 w-full z-10 layout-scroll"
        onClick={() => setShowList(!showList)}
        aria-expanded={showList}
        aria-haspopup="listbox"
        aria-label="Seleccionar modo de visualizador"
      >
        <div className="flex gap-2 items-center">
          <GraphicEq className="text-gray-400 size-5" />
          <span className="text-sm font-medium truncate">{mode}</span>
        </div>
        {showList ? (
          <X className="size-5" />
        ) : (
          <ChevronDown className="size-5" />
        )}
      </button>
      {showList && (
        <div
          className="top-10 sm:top-8 z-10 bg-neutral-900/90 rounded-2xl w-full text-sm absolute"
          role="listbox"
        >
          <ul className="py-1 max-h-60 overflow-y-auto cursor-default">
            {VISUALIZER_MODES.map((visualizerMode) => (
              <li
                key={visualizerMode}
                onClick={() => handleMode(visualizerMode)}
                className={clsx(
                  "active:bg-neutral-700/30 hover:bg-neutral-700/30 rounded-full py-2 sm:py-1 px-3 flex items-center gap-2",
                  mode === visualizerMode && "bg-neutral-700/30 font-medium"
                )}
                role="option"
                aria-selected={mode === visualizerMode}
              >
                <GraphicEq className={clsx(
                  "text-gray-400 size-5", mode === visualizerMode && "text-white"
                )} 
                />
                <span className="truncate">{visualizerMode}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
