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

export const List = () => {
  return (
    <div>
      {videos.map((video) => (
        <Track key={video.id} video={video} />
      ))}
    </div>
  );
};
