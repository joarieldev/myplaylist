/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart } from "../assets/icons/Heart";

export const Thumbnail = ({ video }: { video: any }) => {
  return (
    <div
      className="bg-gray-500 w-32 h-16 rounded-md"
      style={{ backgroundColor: video.image }}
    ></div>
  );
};

export const Track = ({ video }: { video: any }) => {
  return (
    <article className="flex gap-2 items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg">
      <Thumbnail video={video} />
      <div className="w-full">
        <h1 className="font-bold">{video.title}</h1>
        <p className="text-sm">{video.description}</p>
      </div>
      <button className="cursor-pointer p-1 hover:bg-gray-700 rounded-full active:scale-105">
        <Heart />
      </button>
    </article>
  );
};
