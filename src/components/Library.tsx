import { Folder } from "@/assets/icons/Folder";
import { Heart } from "@/assets/icons/Heart";
import { Search } from "@/assets/icons/Search";
import { TrendingUp } from "@/assets/icons/TrendingUp";
import { Layout } from "./Layout";
import { useWindowStore } from "@/store/window-store";
import { CornerUpLeft } from "@/assets/icons/CornerUpLeft";
import { InfoCircle } from "@/assets/icons/InfoCircle";
import { useModalInfoStore } from "@/store/modal-info-store";

export const Library = () => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const handleModalInfo = useModalInfoStore((state) => state.handleModalInfo);

  return (
    <Layout>
      <section className="space-y-4">
        <nav className="space-y-5 py-2 px-3 sm:px-0 sm:py-0">
          <button
            onClick={() => setWindow("main")}
            className="cursor-pointer py-0.5 px-2 rounded-full border border-neutral-500 block items-center hover:bg-neutral-500/25 active:bg-neutral-500/25 transition-colors"
          >
            <CornerUpLeft className="size-5" />
          </button>
          <span className="font-semibold text-xl px-4">Biblioteca</span>
        </nav>
        <ul className="grid grid-cols-2">
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => setWindow("local")}
            >
              <span className="p-1.5 rounded-full bg-blue-700 text-black">
                <Folder />
              </span>
              <p className="font-semibold">Local</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => setWindow("trending")}
            >
              <span className="p-1.5 rounded-full bg-indigo-700 text-black">
                <TrendingUp />
              </span>
              <p className="font-semibold">Tendencias</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => setWindow("search")}
            >
              <span className="p-1.5 rounded-full bg-cyan-700 text-black">
                <Search />
              </span>
              <p className="font-semibold">Buscar</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={() => setWindow("favorites")}
            >
              <span className="p-1.5 rounded-full bg-purple-700 text-black">
                <Heart liked={true} />
              </span>
              <p className="font-semibold">Favoritos</p>
            </button>
          </li>
          <li>
            <button
              className="cursor-pointer flex items-center gap-3 px-2 py-3 hover:bg-neutral-500/25 active:bg-neutral-500/25 rounded-3xl w-full transition-colors"
              onClick={handleModalInfo}
            >
              <span className="p-1.5 rounded-full bg-stone-700 text-black">
                <InfoCircle />
              </span>
              <p className="font-semibold">Acerca de</p>
            </button>
          </li>
        </ul>
      </section>
    </Layout>
  );
};
