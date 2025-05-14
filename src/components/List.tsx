/* eslint-disable @typescript-eslint/no-explicit-any */
import { Track } from "./Track";

const tracks = [
  {
    id: "1",
    title: "First Track",
    description: "Track description",
    image: "blue",
  },
  {
    id: "2",
    title: "Second Track",
    description: "Track description",
    image: "red",
  },
  {
    id: "3",
    title: "Third Track",
    description: "Track description",
    image: "green",
  },
  {
    id: "4",
    title: "Fourth Track",
    description: "Track description",
    image: "purple",
  },
  {
    id: "5",
    title: "Fifth Track",
    description: "Track description",
    image: "yellow",
  },
  {
    id: "6",
    title: "Sixth Track",
    description: "Track description",
    image: "gray",
  },
  {
    id: "7",
    title: "Seventh Track",
    description: "Track description",
    image: "orange",
  },
];

interface Props {
  handleTrack: (data: any) => void;
}

export const List = ({ handleTrack }: Props) => {
  return (
    <div>
      {tracks.map((track) => (
        <Track key={track.id} track={track} handleTrack={handleTrack} />
      ))}
    </div>
  );
};
