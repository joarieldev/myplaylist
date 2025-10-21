"use client";

import { Window } from "@/components/Window";
import { useAudioContextStore } from "@/store/audio-context-store";
import { useModalAboutStore } from "@/store/modal-about-store";
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
  const checkFirstVisit = useModalAboutStore((state) => state.checkFirstVisit);
  const setVolume = useAudioContextStore((state) => state.setVolume);

  useEffect(() => {
    checkFirstVisit();
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    if (isMobile) setVolume(1);
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
