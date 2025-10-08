"use client";

import { Window } from "@/components/Window";
import { useModalInfoStore } from "@/store/modal-info-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function Page() {
  const checkFirstVisit = useModalInfoStore((state) => state.checkFirstVisit);

  useEffect(() => {
    checkFirstVisit();
  }, [checkFirstVisit]);

  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen font-inter">
      <QueryClientProvider client={queryClient}>
        <Window />
      </QueryClientProvider>
    </div>
  );
}
