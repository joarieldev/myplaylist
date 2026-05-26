import { useUiStore, Windows } from "@/store/ui-store";

/**
 * Navega a una ventana, sincronizando store + hash URL.
 */
export const navigateTo = (tab: Windows) => {
  useUiStore.getState().setWindow(tab);
  window.location.hash = tab === "main" ? "" : `#${tab}`;
};

/**
 * Usado por Detail para back-navigation.
 */
export const navigateToHash = (path: string) => {
  window.location.hash = `#${path}`;
};
