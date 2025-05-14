/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "motion/react";
import { Heart } from "../assets/icons/Heart";

interface Props {
  track: any;
  handleTrack: (data: any) => void;
}

export const Thumbnail = ({ track }: { track: any }) => {
  return (
    <motion.div
      layoutId={`track-thumbnail-${track.id}`}
      className="bg-gray-500 w-32 h-16 rounded-md"
      style={{ backgroundColor: track.image }}
    />
  );
};

export const TrackInfo = ({ track }: { track: any }) => {
  return (
    <motion.div className="w-full" layout="position" layoutId={`track-info-${track.id}`}>
      <h1 className="font-bold">{track.title}</h1>
      <p className="text-sm">{track.description}</p>
    </motion.div>
  );
};

export const Track = ({ track, handleTrack }: Props) => {
  return (
    <article
      className="flex gap-2 items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg"
      onClick={() => handleTrack(track)}
    >
      <Thumbnail track={track} />
      <TrackInfo track={track} />
      <button className="cursor-pointer p-1 hover:bg-gray-700 rounded-full active:scale-105">
        <Heart />
      </button>
    </article>
  );
};
