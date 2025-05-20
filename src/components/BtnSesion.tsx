import { useIsMoving } from "@/hooks/useIsMoving";
import { useModalVisualizerStore } from "@/store/modal-visualizer-store";
import { useWindowStore } from "@/store/window-store";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import clsx from "clsx";

export const BtnSesion = () => {
  const window = useWindowStore((state) => state.window);
  const visualizer = useModalVisualizerStore((state) => state.visualizer);
  const { getOpacity, handlers } = useIsMoving();

  return (
    <div
      className={clsx(
        "fixed top-0 max-sm:left-0 my-1.5 mx-1 sm:right-0 sm:mx-4 sm:my-2",
        getOpacity(),
        window === "playlist" && "max-sm:hidden",
        visualizer !== "none" && "max-sm:hidden"
      )}
      {...handlers}
    >
      <SignedOut>
        <SignInButton mode="modal">
          <button className="py-1 px-2 sm:py-2 sm:px-4 rounded-3xl sm:rounded-full bg-neutral-900/75 cursor-pointer active:bg-neutral-800/75 font-bold max-sm:text-sm">
            Iniciar sesión
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
