import clsx from "clsx";
import { useIsMovingStore } from "@/store/Is-moving-store";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";

interface Props {
  heading: React.ReactNode;
  children: React.ReactNode;
}
export const Layout = ({ heading, children }: Props) => {
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const isMoving = useIsMovingStore((state) => state.isMoving);
  const setIsMoving = useIsMovingStore((state) => state.setIsMoving);
  const timer = useIsMovingStore((state) => state.timer);
  const setTimer = useIsMovingStore((state) => state.setTimer);

  const handleMove = () => {
    setIsMoving(true);
    if (timer) clearTimeout(timer);
    const auxTimer = setTimeout(() => {
      setIsMoving(false);
    }, 2000);
    setTimer(auxTimer);
  };

  return (
    <main
      className={clsx(
        "flex flex-col bg-black/50 p-2 rounded-md md:h-[520px] md:w-[456px]",
        visualizer === "middle" && !isMoving && "opacity-25",
        visualizer === "full" && !isMoving && "opacity-0"
      )}
      {...(visualizer !== "none" && { onMouseMove: handleMove })}
    >
      <header>{heading}</header>
      {children}
    </main>
  );
};
