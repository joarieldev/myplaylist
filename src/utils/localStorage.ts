import { VisualizerMode } from "@/store/bg-visualizer-store";

export interface MyPlaylistConfig {
  visualizer: VisualizerMode;
}

const STORAGE_KEY = 'myPlaylistConfig';

const defaultConfig: MyPlaylistConfig = {
  visualizer: 'line-wave',
};

export const myPlaylistConfigStorage = {
  getConfig: (): MyPlaylistConfig => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaultConfig;
      
      return { ...defaultConfig, ...JSON.parse(saved) };
    } catch (error) {
      console.error('Error al leer configuración:', error);
      return defaultConfig;
    }
  },

  setConfig: (config: Partial<MyPlaylistConfig>): void => {
    try {
      const current = myPlaylistConfigStorage.getConfig();
      const newConfig = { ...current, ...config };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  },
};