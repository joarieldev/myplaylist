import { useUiStore } from "@/store/ui-store";

export const useIsMoving = () => {
  const visualizer = useUiStore((state) => state.visualizer);
  const isMoving = useUiStore((state) => state.isMoving);
  const setIsMoving = useUiStore((state) => state.setIsMoving);
  const movingTimer = useUiStore((state) => state.movingTimer);
  const setMovingTimer = useUiStore((state) => state.setMovingTimer);

  const getOpacity = () => {
    if (visualizer === "middle" && !isMoving) return "opacity-25";
    if (visualizer === "full" && !isMoving) return "opacity-0";
    return "";
  };

  const handleMove = () => {
    setIsMoving(true);
    if (movingTimer) clearTimeout(movingTimer);
    const auxTimer = setTimeout(() => {
      setIsMoving(false);
    }, 2000);
    setMovingTimer(auxTimer);
  };

  const handlers = visualizer !== "none" && visualizer !== "active" ? { onMouseMove: handleMove } : {};
  return {
    getOpacity,
    handlers,
  }
}