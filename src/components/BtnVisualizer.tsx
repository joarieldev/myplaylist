import { GraphicEq } from "@/assets/icons/GraphicEq";
import { GraphicEq2 } from "@/assets/icons/GraphicEq2";
import { GraphicEq3 } from "@/assets/icons/GraphicEq3";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

const ICON_VISUALIZER = {
  none: GraphicEq3,
  middle: GraphicEq2,
  full: GraphicEq,
};

export const BtnVisualizer = () => {
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const handleModal = useModalVisualizerStore((state) => state.handleModal);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );

  const IconVisualizer = ICON_VISUALIZER[visualizer];

  return (
    <button
      onClick={() => {
        handleModal();
      }}
      className={clsx(
        "py-1 px-3 rounded-full bg-black/50 cursor-pointer active:bg-gray-500/50",
        !selectedTrackLocal &&
          !selectedTrack &&
          "pointer-events-none opacity-75"
      )}
    >
      <IconVisualizer className="size-5" />
    </button>
  );
};
