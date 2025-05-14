import { ChevronLeft } from "@/assets/icons/ChevronLeft";
import { Layout } from "./Layout";
import { Track } from "./Track";

const videos = [
  {
    id: "1",
    title: "First video",
    description: "Video description",
    image: "blue",
  },
  {
    id: "2",
    title: "Second video",
    description: "Video description",
    image: "red",
  },
  {
    id: "3",
    title: "Third video",
    description: "Video description",
    image: "green",
  },
  {
    id: "4",
    title: "Fourth video",
    description: "Video description",
    image: "purple",
  },
  {
    id: "5",
    title: "Fifth video",
    description: "Video description",
    image: "yellow",
  },
  {
    id: "6",
    title: "Sixth video",
    description: "Video description",
    image: "gray",
  },
  {
    id: "7",
    title: "Seventh video",
    description: "Video description",
    image: "orange",
  },
];

interface Props {
  onClick: () => void;
}

export const PlayList = ({ onClick }: Props) => {
  return (
    <Layout
      heading={
        <nav className="flex justify-between">
          <button
            onClick={onClick}
            className="cursor-pointer active:text-gray-300 flex text-sm justify-center items-center"
          >
            <ChevronLeft /> Volver
          </button>
          <ul className="flex gap-2 text-sm">
            <li className="cursor-pointer hover:underline">Local</li>
            <li className="cursor-pointer hover:underline">Trending</li>
            <li className="cursor-pointer hover:underline">Favoritos</li>
          </ul>
        </nav>
      }
    >
      <section className="overflow-auto h-full">
        {videos.map((video) => (
          <Track key={video.id} video={video} />
        ))}
      </section>
    </Layout>
  );
};
