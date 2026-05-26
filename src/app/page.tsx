"use client";

import { Window } from "@/components/Window";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useBgVisualizerStore } from "@/store/bg-visualizer-store";
import { useUiStore } from "@/store/ui-store";
import { myPlaylistConfigStorage } from "@/utils/localStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 30 * 60 * 1000,
    },
  },
});

export default function Page() {
  const checkFirstVisit = useUiStore((state) => state.checkFirstVisit);
  const setVolume = useAudioContextStore((state) => state.setVolume);
  const setIsMuted = useAudioContextStore((state) => state.setIsMuted);
  const initializeAudio = useAudioContextStore((state) => state.initializeAudio)
  const handleMode = useBgVisualizerStore((state) => state.handleMode);

  useEffect(() => {
    checkFirstVisit();
    
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (isMobile) setVolume(1);
    
    initializeAudio();

    const config = myPlaylistConfigStorage.getConfig();
    
    if (!isMobile) {
      setVolume(config.volume);
      setIsMuted(config.isMuted.muted, config.isMuted.volume);
    }
    
    handleMode(config.visualizer);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sm:grid sm:grid-rows-[1fr] items-center justify-items-center h-dvh font-inter">
      <QueryClientProvider client={queryClient}>
        <Window />
      </QueryClientProvider>
    </div>
  );
}
