import caratula from "@/assets/caratula-vacia.webp";
import { Layout } from "./Layout";
import { PlayList } from "@/assets/icons/PlayList";
import { motion } from "motion/react";
import { useWindowStore } from "@/store/window-store";
import { useTabStore } from "@/store/tab-store";

interface Props {
  onClick: () => void;
}

export const Main = ({ onClick }: Props) => {
  const selectedTrack = useWindowStore((state) => state.selectedTrack);
  const setTab = useTabStore((state) => state.setTab);

  const handleTabWindow = () => {
    setTab("tracks");
    onClick();
  };

  return (
    <Layout
      heading={
        <nav className="flex justify-end">
          <button
            onClick={onClick}
            className="cursor-pointer active:text-gray-300"
          >
            <PlayList />
          </button>
        </nav>
      }
    >
      <section className="flex flex-col h-full overflow-hidden">
        <div className="flex justify-center py-4">
          {selectedTrack ? (
            <motion.div
              layoutId={`track-thumbnail-${selectedTrack.id}`}
              className="size-48 rounded-md cursor-pointer overflow-hidden"
              onClick={handleTabWindow}
            >
              <img
                src={selectedTrack.artwork["150x150"]}
                alt={selectedTrack.title}
                className="size-full object-cover"
              />
            </motion.div>
          ) : (
            <img src={caratula.src} alt="caratula" className="size-48" />
          )}
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          {selectedTrack ? (
            <motion.div
              layout="position"
              layoutId={`track-info-${selectedTrack.id}`}
              className="flex flex-col items-center cursor-pointer"
              onClick={handleTabWindow}
            >
              <h1 className="font-family-montserrat w-80 font-bold text-lg truncate text-center">
                {selectedTrack.title}
              </h1>
              <p className="text-sm font-medium w-48 truncate text-center">
                {selectedTrack.user.name}
              </p>
            </motion.div>
          ) : (
            <div className="text-center">
              <h1 className="font-family-montserrat font-bold text-lg">
                Lorem ipsum dolor sit amet
              </h1>
              <p className="text-sm font-medium">Porro quisquam est</p>
            </div>
          )}
        </div>
        <div className="h-full flex justify-center items-end">
          <p className="text-sm"> 00:12 - 03:38</p>
        </div>
      </section>
    </Layout>
  );
};
