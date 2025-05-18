import { useTracksStore } from "@/store/tracks-store";
import { useTabStore } from "@/store/tab-store";
import { getTracks } from "@/actions/get-tracks";
import { IList } from "@/interfaces/List";

interface Props {
  list: IList[];
  setLoadingTracks: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorTracks: React.Dispatch<React.SetStateAction<string | null>>;
}

export const GridList = ({
  list,
  setLoadingTracks,
  setErrorTracks,
}: Props) => {
  const setTracks = useTracksStore((state) => state.setTracks);
  const setTab = useTabStore((state) => state.setTab);

  const handleTracks = async (id: string) => {
    setLoadingTracks(true);
    getTracks(id)
      .then(({ ok, data, message }) => {
        if (!ok) {
          setErrorTracks(message ?? null);
          return;
        }
        setTracks(data);
        setTab("tracks");
      })
      .finally(() => {
        setLoadingTracks(false);
      });
  };

  return (
    <ul className="grid grid-cols-3 gap-2">
      {list.map((item) => (
        <li key={item.id}>
          <div
            className="hover:bg-gray-800 cursor-pointer p-2 gap-4 flex flex-col items-center rounded-md"
            onClick={() => handleTracks(item.id)}
          >
            <div className="w-full h-28">
              <img
                src={item.artwork["150x150"]}
                alt={item.playlist_name}
                className="aspect-square object-cover"
                title={item.playlist_name}
              />
            </div>
            <div className="flex flex-col text-center gap-1 w-full">
              <h1
                className="text-sm font-bold truncate"
                title={item.playlist_name}
              >
                {item.playlist_name}
              </h1>
              <p className="text-xs truncate">{item.user.name}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
