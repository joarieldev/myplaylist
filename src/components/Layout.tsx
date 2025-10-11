import clsx from "clsx";
import { useIsMoving } from "@/hooks/useIsMoving";
import { Category } from "@/assets/icons/Category";
import { useWindowStore } from "@/store/window-store";
import { Search } from "@/assets/icons/Search";
import { Heart } from "@/assets/icons/Heart";
import { BtnSesion } from "./btns/BtnSesion";

interface Props {
  children: React.ReactNode;
}
export const Layout = ({ children }: Props) => {
  const { getOpacity, handlers } = useIsMoving();
  const setWindow = useWindowStore((state) => state.setWindow);
  const window = useWindowStore((state) => state.window);

  return (
    <main
      className={clsx(
        "sm:bg-black/50 sm:p-2 rounded-md h-full w-full sm:h-[520px] sm:w-[456px] overflow-hidden",
        getOpacity()
      )}
      {...handlers}
    >
      <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto">
        {children}
        <footer className="sticky bottom-0 p-2 z-10 sm:hidden">
          <nav className="flex bg-neutral-900/95 rounded-full">
            <button
              onClick={() => setWindow("library")}
              className={clsx(
                "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                window === "library" && "text-white"
              )}
            >
              <Category className="size-7 stroke-3"/>
            </button>
            <button
              onClick={() => setWindow("search")}
              className={clsx(
                "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                window === "search" && "text-white"
              )}
            >
              <Search className="size-7 stroke-3"/>
            </button>
            <button
              onClick={() => setWindow("favorites")}
              className={clsx(
                "py-2 w-full rounded-full grid place-content-center transition active:bg-neutral-500/25 text-gray-400",
                window === "favorites" && "text-white"
              )}
            >
              <Heart ClassName="size-7 stroke-3"/>
            </button>
            <span className="py-2 w-full grid place-content-center">
              <BtnSesion />
            </span>
          </nav>
        </footer>
      </div>
    </main>
  );
};
