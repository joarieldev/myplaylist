import { GitHub } from "@/assets/icons/GitHub";
import { X } from "@/assets/icons/X";
import { useModalInfoStore } from "@/store/modal-info-store";
import { motion } from "motion/react";

export const ModalInfo = () => {
  const { dismissModal } = useModalInfoStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={dismissModal}
        className="fixed top-0 left-0 w-full min-h-screen backdrop-blur-sm z-20 bg-black/25"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full min-h-screen z-20 grid place-items-center pointer-events-none"
      >
        <div className="flex flex-col items-center py-2 px-4 max-w-80 sm:max-w-96 rounded-lg space-y-1 bg-neutral-900 text-gray-300 z-20 pointer-events-auto border border-gray-600/50 gap-3 relative">
          <button
            className="absolute top-0 right-0 cursor-pointer"
            onClick={dismissModal}
          >
            <X className="size-4" />
          </button>
          <h1 className="font-bold ">🎶 My Playlist 🎶</h1>
          <p className="text-sm text-center">
            Escucha las mejores playlist sin interrupciones, descubre y guarda
            tus favoritas.
          </p>
          <div className="flex w-full justify-between items-center">
            <p className="text-sm">
              Creado por{" "}
              <a
                href="https://joariel.dev"
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-white text-xs"
              >
                joariel
              </a>
            </p>
            <a
              href="https://github.com/joarieldev/myplaylist"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
              title="My Playlist en GitHub"
            >
              <GitHub className="size-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};
