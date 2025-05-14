/* eslint-disable @typescript-eslint/no-explicit-any */
import caratula from "@/assets/caratula-vacia.webp";
import { Layout } from "./Layout";
import { PlayList } from "@/assets/icons/PlayList";
import { motion } from "motion/react";

interface Props {
  onClick: () => void;
  track?: any;
}

export const Main = ({ onClick, track }: Props) => {
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
      <section className="flex flex-col h-full">
        <div className="flex justify-center py-4">
          {track ? (
            <motion.div
              layoutId={`track-thumbnail-${track.id}`}
              className="size-48 rounded-md cursor-pointer"
              style={{ backgroundColor: track.image }}
              onClick={onClick}
            />
          ) : (
            <img src={caratula.src} alt="caratula" className="size-48" />
          )}
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          {track ? (
            <motion.div
              layout="position"
              layoutId={`track-info-${track.id}`}
              className="text-center cursor-pointer"
              onClick={onClick}
            >
              <h1 className="font-family-montserrat font-bold text-lg">
                {track.title}
              </h1>
              <p className="text-sm font-medium">{track.description}</p>
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
