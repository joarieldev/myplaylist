import { Folder } from "@/assets/icons/Folder";
import { Heart } from "@/assets/icons/Heart";
import { Search } from "@/assets/icons/Search";
import { TrendingUp } from "@/assets/icons/TrendingUp";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { InfoCircle } from "@/assets/icons/InfoCircle";
import { useModalAboutStore } from "@/store/modal-about-store";

export const Library = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const handleModalAbout = useModalAboutStore((state) => state.handleModalAbout);

  return (
    <>
      <header className="px-3 pt-3 sm:px-0 sm:pt-0 pb-2">
        <nav className="space-y-5">
          <button
            onClick={() => {
              setWindow("main")
              window.location.hash = ""
            }}
            className="cursor-pointer py-1.5 px-2.5 sm:py-0.5 sm:px-2 rounded-full border border-neutral-500 block items-center bg-black/75 hover:bg-neutral-900/75 active:bg-neutral-900/75 transition-colors"
          >
            <CornerUpLeft className="size-5 max-sm:stroke-3" />
          </button>
          <span className="font-semibold text-2xl sm:text-xl px-4">Biblioteca</span>
        </nav>
      </header>
      <div className="h-full">
        <ul className="grid grid-cols-2">
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => {
                setWindow("local")
                window.location.hash = "#local"
              }}
            >
              <span className="p-1.5 rounded-full bg-blue-700 text-black">
                <Folder />
              </span>
              <p className="font-semibold text-lg sm:text-base">Local</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => {
                setWindow("trending")
                window.location.hash = "#trending"
              }}
            >
              <span className="p-1.5 rounded-full bg-indigo-700 text-black">
                <TrendingUp />
              </span>
              <p className="font-semibold text-lg sm:text-base">Tendencias</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => {
                setWindow("search")
                window.location.hash = "#search"
              }}
            >
              <span className="p-1.5 rounded-full bg-cyan-700 text-black">
                <Search />
              </span>
              <p className="font-semibold text-lg sm:text-base">Buscar</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => {
                setWindow("favorites")
                window.location.hash = "#favorites"
              }}
            >
              <span className="p-1.5 rounded-full bg-purple-700 text-black">
                <Heart liked={true} />
              </span>
              <p className="font-semibold text-lg sm:text-base">Favoritos</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={handleModalAbout}
            >
              <span className="p-1.5 rounded-full bg-stone-700 text-black">
                <InfoCircle />
              </span>
              <p className="font-semibold text-lg sm:text-base">Acerca de</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
