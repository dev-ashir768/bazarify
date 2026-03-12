"use client";

import { getQueryClient } from "@/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface TanstackClientProviderProps {
  children: React.ReactNode;
}

export const TanstackClientProvider: React.FC<TanstackClientProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => getQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
};

export default TanstackClientProvider;
