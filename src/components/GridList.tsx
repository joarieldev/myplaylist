import { IList } from "@/interfaces/List";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { BtnFavorite } from "./btns/BtnFavorite";
import { useWindowStore } from "@/store/window-store";
import { useDetailStore } from "@/store/detail-store";
import { motion } from "motion/react";

interface Props {
  // header: React.ReactNode;
  list: IList[];
  nameWindow: string;
  setChange: React.Dispatch<React.SetStateAction<number>>;
}

export const GridList = ({ list, nameWindow, setChange }: Props) => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const setList = useDetailStore((state) => state.setList);
  const setBack = useDetailStore((state) => state.setBack);

  const handleDetail = (item: IList) => {
    setList(item);
    setBack(nameWindow);
    setWindow("detail");
  };

  return (
    <ul className="grid grid-cols-3">
      {list.map((item) => (
        <li key={item.id}>
          <div
            className="hover:bg-gray-800/75 cursor-pointer p-2 gap-2 flex flex-col items-center rounded-xl transition-colors"
            onClick={() => handleDetail(item)}
          >
            <motion.div
              key={`list-thumbnail-${item.id}`}
              layoutId={`bg-thumbnail-${item.id}`}
              className="w-full h-28 overflow-hidden rounded-lg"
            >
              <img
                src={item.artwork["150x150"]}
                alt={item.playlist_name}
                className="aspect-square object-cover size-full"
                title={item.playlist_name}
              />
            </motion.div>
            <div className="flex flex-col text-center gap-1 w-full">
              <h1
                className="text-sm font-bold truncate"
                title={item.playlist_name}
              >
                {item.playlist_name}
              </h1>
              <p className="text-xs truncate">{item.user.name}</p>
              <div className="flex justify-around w-full pt-1 border-t border-t-gray-500/50">
                <p className="text-sm flex items-center gap-0.5">
                  <BrandNeteaseMusic className="size-4" />
                  {item.track_count}
                </p>
                <BtnFavorite item={item} setChange={setChange} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
