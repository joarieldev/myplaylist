"use client";

import { Window } from "@/components/Window";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen font-inter">
      <QueryClientProvider client={queryClient}>
        <Window />
      </QueryClientProvider>
    </div>
  );
}
