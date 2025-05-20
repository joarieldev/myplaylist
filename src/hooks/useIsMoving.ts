import { useIsMovingStore } from "@/store/Is-moving-store";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";

export const useIsMoving = () => {
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const isMoving = useIsMovingStore((state) => state.isMoving);
  const setIsMoving = useIsMovingStore((state) => state.setIsMoving);
  const timer = useIsMovingStore((state) => state.timer);
  const setTimer = useIsMovingStore((state) => state.setTimer);

  const getOpacity = () => {
    if (visualizer === "middle" && !isMoving) return "opacity-25";
    if (visualizer === "full" && !isMoving) return "opacity-0";
    return "";
  };

  const handleMove = () => {
    setIsMoving(true);
    if (timer) clearTimeout(timer);
    const auxTimer = setTimeout(() => {
      setIsMoving(false);
    }, 2000);
    setTimer(auxTimer);
  };

  const handlers = visualizer !== "none" ? { onMouseMove: handleMove } : {};
  return {
    getOpacity,
    handlers,
  }
}