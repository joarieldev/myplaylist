import { useUiStore, Windows } from "@/store/ui-store";
import { IList } from "@/interfaces/List";

interface NavigateOptions {
  list?: IList;
  back?: string;
}

export const navigateTo = (tab: Windows, options?: NavigateOptions) => {
  const { setWindow, setViewingPlaylist, setBack } = useUiStore.getState();

  if (options?.list) setViewingPlaylist(options.list);
  if (options?.back) setBack(options.back);

  setWindow(tab);

  if (tab === "detail" && options?.back) {
    window.location.hash = `#${options.back}`;
  } else {
    window.location.hash = tab === "main" ? "" : `#${tab}`;
  }
};
