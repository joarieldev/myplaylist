import { useIsMovingStore } from "@/store/Is-moving-store";
import { useVisualizerStore } from "@/store/visualizer-store";

export const useIsMoving = () => {
  const visualizer = useVisualizerStore((state) => state.visualizer);
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

  const handlers = visualizer !== "none" && visualizer !== "active" ? { onMouseMove: handleMove } : {};
  return {
    getOpacity,
    handlers,
  }
}