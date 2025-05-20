import { InfoCircle } from "@/assets/icons/InfoCircle";
import { useIsMoving } from "@/hooks/useIsMoving";
import { useModalInfoStore } from "@/store/modal-info-store";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { useWindowStore } from "@/store/window-store";
import clsx from "clsx";

export const BtnInfo = () => {
  const window = useWindowStore((state) => state.window);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const { getOpacity, handlers } = useIsMoving();
  const handleModalInfo = useModalInfoStore((state) => state.handleModalInfo);

  return (
    <div
      className={clsx(
        "fixed bottom-0  my-1.5 mx-1 right-0 sm:mx-4 sm:my-2",
        getOpacity(),
        window === "playlist" && "max-sm:hidden",
        visualizer !== "none" && "max-sm:hidden"
      )}
      {...handlers}
    >
      <button className="cursor-pointer" onClick={handleModalInfo}>
        <InfoCircle className="max-sm:size-5" />
      </button>
    </div>
  );
};
