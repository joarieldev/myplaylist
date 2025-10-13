import { IList } from "@/interfaces/List";
import { BrandNeteaseMusic } from "@/assets/icons/BrandNeteaseMusic";
import { BtnFavorite } from "./btns/BtnFavorite";
import { useWindowStore } from "@/store/window-store";
import { useDetailStore } from "@/store/detail-store";
import { motion } from "motion/react";
import { useEffect } from "react";

interface Props {
  list: IList[];
  nameWindow: string;
  setChange: React.Dispatch<React.SetStateAction<number>>;
}

export const GridList = ({ list, nameWindow, setChange }: Props) => {
  const setWindow = useWindowStore((state) => state.setWindow);
  const setList = useDetailStore((state) => state.setList);
  const setBack = useDetailStore((state) => state.setBack);
  const listDetail = useDetailStore((state) => state.list);

  const handleDetail = (item: IList) => {
    setList(item);
    setBack(nameWindow);
    setWindow("detail");
  };

  useEffect(() => {
    if (!listDetail) return;
    const selectedId = `list-${listDetail.id}`;
    if (selectedId) {
      const el = document.getElementById(`list-${listDetail.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "center" });
      }
    }
  }, [listDetail]);

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3">
      {list.map((item) => (
        <li key={item.id}>
          <div
            className="hover:bg-gray-800/75 cursor-default px-2 py-2.5 gap-2 flex flex-col items-center rounded-2xl transition-colors"
            onClick={() => handleDetail(item)}
            id={`list-${item.id}`}
          >
            <motion.div
              key={`list-thumbnail-${item.id}`}
              layoutId={`bg-thumbnail-${item.id}`}
              className="w-full h-auto sm:h-28 overflow-hidden rounded-xl"
            >
              <img
                src={item.artwork["480x480"]}
                alt={item.playlist_name}
                className="aspect-square object-cover size-full"
                title={item.playlist_name}
              />
            </motion.div>
            <div className="flex flex-col text-center gap-0.5 sm:gap-1 w-full">
              <h1
                className="text-lg sm:text-sm font-bold truncate max-sm:leading-5"
                title={item.playlist_name}
              >
                {item.playlist_name}
              </h1>
              <p className="text-xs max-sm:font-bold truncate">{item.user.name}</p>
              <div className="flex justify-around w-full pt-1 border-t border-t-gray-500/50">
                <p className="text-sm flex items-center gap-0.5">
                  <BrandNeteaseMusic className="size-4 sm:size-3" />
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
