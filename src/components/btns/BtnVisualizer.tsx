import { GraphicEq } from "@/assets/icons/GraphicEq";
import { GraphicEq2 } from "@/assets/icons/GraphicEq2";
import { GraphicEq3 } from "@/assets/icons/GraphicEq3";
import { GraphicEq4 } from "@/assets/icons/GraphicEq4";
import { useVisualizer } from "@/hooks/useVisualizer";
import { useVisualizerStore } from "@/store/visualizer-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";
import { toast } from "sonner";

const ICON_VISUALIZER = {
  none: GraphicEq,
  active: GraphicEq2,
  middle: GraphicEq3,
  full: GraphicEq4,
};

export const BtnVisualizer = () => {
  const visualizer = useVisualizerStore((state) => state.visualizer);
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const selectedTrackLocal = useWindowStore(
    (state) => state.selectedTrackLocal
  );
  const handleVisualizer = useVisualizerStore(
    (state) => state.handleVisualizer
  );
  const { sendAnalyser, removeAnalyser } = useVisualizer();

  const IconVisualizer = ICON_VISUALIZER[visualizer];

  const onClickVisualizer = () => {
    if (visualizer === "none") {
      handleVisualizer("active");
      sendAnalyser();
      toast.success("Visualización - Activo");
    }
    if (visualizer === "active") {
      handleVisualizer("middle");
      sendAnalyser();
      toast.success("Visualización - Difuminar controles");
    }
    if (visualizer === "middle") {
      handleVisualizer("full");
      sendAnalyser();
      toast.success("Visualización - Pantalla completa");
    }
    if (visualizer === "full") {
      handleVisualizer("none");
      removeAnalyser();
      toast.success("Visualización - Desactivada");
    }
  };

  return (
    <button
      onClick={onClickVisualizer}
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
