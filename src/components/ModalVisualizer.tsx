import { Check } from "@/assets/icons/Check";
import { GraphicEq } from "@/assets/icons/GraphicEq";
import { GraphicEq2 } from "@/assets/icons/GraphicEq2";
import { GraphicEq3 } from "@/assets/icons/GraphicEq3";
import { useVisualizer } from "@/hooks/useVisualizer";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";

export const ModalVisualizer = () => {
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const handleVisualizer = useModalVisualizerStore(
    (state) => state.handleVisualizer
  );
  const { sendAnalyser, removeAnalyser } = useVisualizer();
  const handleModal = useModalVisualizerStore((state) => state.handleModal);

  return (
    <>
      <div
        onClick={handleModal}
        className="fixed top-0 left-0 w-full min-h-screen bg-black/50 z-20 "
      ></div>
      <div className="fixed top-0 left-0 w-full min-h-screen z-20 grid place-items-center pointer-events-none">
        <div className="flex flex-col items-center py-4 px-3 max-w-80 rounded-3xl space-y-1 bg-neutral-900 text-white z-20 pointer-events-auto">
          <ul className="w-[273px]">
            <li>
              <button
                className="flex gap-4 p-2 w-full active:bg-neutral-800 rounded-full"
                onClick={() => {
                  handleVisualizer("none");
                  removeAnalyser();
                }}
              >
                <GraphicEq3 />
                <p className="flex justify-between w-full">
                  Deshabilitar visualización
                  {visualizer === "none" && <Check />}
                </p>
              </button>
            </li>
            <li>
              <button
                className="flex gap-4 p-2 w-full active:bg-neutral-800 rounded-full"
                onClick={() => {
                  handleVisualizer("middle");
                  sendAnalyser();
                }}
              >
                <GraphicEq2 />
                <p className="flex justify-between w-full">
                  Difuminar controles
                  {visualizer === "middle" && <Check />}
                </p>
              </button>
            </li>
            <li>
              <button
                className="flex gap-4 p-2 w-full active:bg-neutral-800 rounded-full"
                onClick={() => {
                  handleVisualizer("full");
                  sendAnalyser();
                }}
              >
                <GraphicEq />
                <p className="flex justify-between w-full">
                  Pantalla completa
                  {visualizer === "full" && <Check />}
                </p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
