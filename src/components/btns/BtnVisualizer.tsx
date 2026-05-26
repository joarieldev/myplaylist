import { GraphicEq } from "@/assets/icons/GraphicEq";
import { GraphicEq2 } from "@/assets/icons/GraphicEq2";
import { GraphicEq3 } from "@/assets/icons/GraphicEq3";
import { GraphicEq4 } from "@/assets/icons/GraphicEq4";
import { useVisualizer } from "@/hooks/useVisualizer";
import { useUiStore } from "@/store/ui-store";
import clsx from "clsx";
import { toast } from "sonner";

const ICON_VISUALIZER = {
  none:({ className }: { className?: string }) => 
    <GraphicEq className={clsx("text-gray-400", className)} />,
  active: GraphicEq2,
  middle: GraphicEq3,
  full: GraphicEq4,
};

export const BtnVisualizer = () => {
  const visualizer = useUiStore((state) => state.visualizer);
  const handleVisualizer = useUiStore(
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
// 9ca3af
  return (
    <button
      onClick={onClickVisualizer}
      className="py-1 px-3 rounded-full bg-black/25 cursor-pointer active:bg-gray-500/50"
    >
      <IconVisualizer className="size-6 sm:size-5" />
    </button>
  );
};
